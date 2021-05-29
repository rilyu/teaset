// TouchableOpacity.js

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Platform, TouchableWithoutFeedback, Animated, ViewPropTypes} from 'react-native';
import Easing from 'react-native/Libraries/Animated/Easing';
import flattenStyle from 'react-native/Libraries/StyleSheet/flattenStyle';

if (Platform.constants.reactNativeVersion.major === 0 && Platform.constants.reactNativeVersion.minor < 62) {
  console.error('this teaset edition need react native 0.62.0 or above, please use teaset@0.7.1 in earlier version of react native');
}

export default class TouchableOpacity extends Component {

  static propTypes = {
    ...TouchableWithoutFeedback.propTypes,
    activeOpacity: PropTypes.number,
    style: ViewPropTypes.style,
  };

  static defaultProps = {
    activeOpacity: 0.2,
  };

  constructor(props) {
    super(props);
    this.state = {
      anim: new Animated.Value(this._getChildStyleOpacityWithDefault()),
      pressability: null,
    };
  }

  componentDidMount() {
    import('react-native/Libraries/Pressability/Pressability.js')
      .then(Pressability => this.initPressability(Pressability.default))
      .catch(error => console.error(error));
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.disabled !== prevProps.disabled) {
      this._opacityInactive(250);
    }
  }

  componentWillUnmount(): void {
    this.state.pressability && this.state.pressability.reset();
  }

  initPressability(Pressability) {
    let pressability = new Pressability({
      getHitSlop: () => this.props.hitSlop,
      getLongPressDelayMS: () => {
        if (this.props.delayLongPress != null) {
          const maybeNumber = this.props.delayLongPress;
          if (typeof maybeNumber === 'number') {
            return maybeNumber;
          }
        }
        return 500;
      },
      getPressDelayMS: () => this.props.delayPressIn,
      getPressOutDelayMS: () => this.props.delayPressOut,
      getPressRectOffset: () => this.props.pressRetentionOffset,
      onBlur: event => {
        if (this.props.onBlur != null) {
          this.props.onBlur(event);
        }
      },
      onFocus: event => {
        if (this.props.onFocus != null) {
          this.props.onFocus(event);
        }
      },
      onLongPress: event => this.touchableHandleLongPress(event),
      onPress: event => this.touchableHandlePress(event),
      onPressIn: event => {
        this._opacityActive(
          event.dispatchConfig.registrationName === 'onResponderGrant'
            ? 0
            : 150,
        );
        if (this.props.onPressIn != null) {
          this.props.onPressIn(event);
        }
      },
      onPressOut: event => this.touchableHandleActivePressOut(event),
      onPressMove: event => this.touchableHandleResponderMove(event),
      onResponderTerminationRequest: () =>
        !this.props.rejectResponderTermination,
      onStartShouldSetResponder: () => !this.props.disabled,
    });
    this.setState({pressability});
  }

  measureInWindow(callback) {
    this.refs.animatedView && this.refs.animatedView.measureInWindow(callback);
  }

  measure(callback) {
    this.refs.animatedView && this.refs.animatedView.measure(callback);
  }

  touchableHandleResponderMove(event) {
  }

  touchableHandleActivePressOut(event) {
    this._opacityInactive(250);
    if (this.props.onPressOut != null) {
      this.props.onPressOut(event);
    }
  }

  touchableHandlePress(event) {
    if (this.props.onPress != null) {
      this.props.onPress(event);
    }
  }

  touchableHandleLongPress(event) {
    if (this.props.onLongPress != null) {
      this.props.onLongPress(event);
    }
  }

  /**
   * Animate the touchable to a new opacity.
   */
  _setOpacityTo(toValue, duration) {
    Animated.timing(this.state.anim, {
      toValue,
      duration,
      easing: Easing.inOut(Easing.quad),
      useNativeDriver: true,
    }).start();
  }

  _opacityActive(duration) {
    this._setOpacityTo(this.props.activeOpacity ?? 0.2, duration);
  }

  _opacityInactive(duration) {
    this._setOpacityTo(this._getChildStyleOpacityWithDefault(), duration);
  }

  _getChildStyleOpacityWithDefault() {
    const opacity = flattenStyle(this.props.style)?.opacity;
    return typeof opacity === 'number' ? opacity : 1;
  }

  render() {
    const {onBlur, onFocus, ...eventHandlersWithoutBlurAndFocus} = this.state.pressability ? this.state.pressability.getEventHandlers() : {};
    return (
      <Animated.View
        accessible={this.props.accessible !== false}
        accessibilityLabel={this.props.accessibilityLabel}
        accessibilityHint={this.props.accessibilityHint}
        accessibilityRole={this.props.accessibilityRole}
        accessibilityState={this.props.accessibilityState}
        accessibilityActions={this.props.accessibilityActions}
        onAccessibilityAction={this.props.onAccessibilityAction}
        accessibilityValue={this.props.accessibilityValue}
        importantForAccessibility={this.props.importantForAccessibility}
        accessibilityLiveRegion={this.props.accessibilityLiveRegion}
        accessibilityViewIsModal={this.props.accessibilityViewIsModal}
        accessibilityElementsHidden={this.props.accessibilityElementsHidden}
        style={[this.props.style, {opacity: this.state.anim}]}
        nativeID={this.props.nativeID}
        testID={this.props.testID}
        onLayout={this.props.onLayout}
        nextFocusDown={this.props.nextFocusDown}
        nextFocusForward={this.props.nextFocusForward}
        nextFocusLeft={this.props.nextFocusLeft}
        nextFocusRight={this.props.nextFocusRight}
        nextFocusUp={this.props.nextFocusUp}
        hasTVPreferredFocus={this.props.hasTVPreferredFocus}
        hitSlop={this.props.hitSlop}
        focusable={
          this.props.focusable !== false && this.props.onPress !== undefined
        }
        ref='animatedView'
        {...eventHandlersWithoutBlurAndFocus}>
        {this.props.children}
      </Animated.View>
    );
  }

}
