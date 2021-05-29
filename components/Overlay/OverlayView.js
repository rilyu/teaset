// OverlayView.js

'use strict';

import React, {Component} from "react";
import PropTypes from 'prop-types';
import ReactNative, {StyleSheet, Animated, View, PanResponder, Platform, ViewPropTypes} from 'react-native';

import Theme from 'teaset/themes/Theme';
import KeyboardSpace from '../KeyboardSpace/KeyboardSpace';

export default class OverlayView extends Component {

  static propTypes = {
    style: ViewPropTypes.style,
    modal: PropTypes.bool,
    blockTouch: PropTypes.bool,
    animated: PropTypes.bool,
    overlayOpacity: PropTypes.number,
    overlayPointerEvents: ViewPropTypes.pointerEvents,
    autoKeyboardInsets: PropTypes.bool,
    closeOnHardwareBackPress: PropTypes.bool, //android only
    onAppearCompleted: PropTypes.func,
    onDisappearCompleted: PropTypes.func,
    onCloseRequest: PropTypes.func, //(overlayView)
  };

  static defaultProps = {
    modal: false,
    blockTouch: true,
    animated: false,
    overlayPointerEvents: 'box-none',
    autoKeyboardInsets: false,
    closeOnHardwareBackPress: true,
  };

  constructor(props) {
    super(props);
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => true,
      onPanResponderGrant: (e, gestureState) => this.touchStateID = gestureState.stateID,
      onPanResponderRelease: (e, gestureState) => this.touchStateID == gestureState.stateID ? this.closeRequest() : null,
    });
    this.state = {
      overlayOpacity: new Animated.Value(0),
    }
  }

  componentDidMount() {
    this.appearAfterMount && this.appear();
    if (Platform.OS === 'android') {
      let BackHandler = ReactNative.BackHandler ? ReactNative.BackHandler : ReactNative.BackAndroid;
      this.backListener = BackHandler.addEventListener('hardwareBackPress', () => {
        if (this.props.closeOnHardwareBackPress) {
          this.closeRequest();
          return true;          
        } else {
          return false;
        }
      });
    }
  }

  componentWillUnmount() {
    this.removeBackListener();
  }

  removeBackListener() {
    if (this.backListener) {
      this.backListener.remove();
      this.backListener = null;
    }
  }

  get overlayOpacity() {
    let {overlayOpacity} = this.props;
    return (overlayOpacity || overlayOpacity === 0) ? overlayOpacity : Theme.overlayOpacity;
  }

  get appearAnimates() {
    let duration = 200;
    let animates = [
      Animated.timing(this.state.overlayOpacity, {
        toValue: this.overlayOpacity,
        duration,
        useNativeDriver: false,
      })
    ];
    return animates;
  }
  
  get disappearAnimates() {
    let duration = 200;
    let animates = [
      Animated.timing(this.state.overlayOpacity, {
        toValue: 0,
        duration,
        useNativeDriver: false,
      })
    ];
    return animates;
  }

  get appearAfterMount() {
    return true;
  }

  get overlayPointerEvents() { //override in Toast
    return this.props.overlayPointerEvents;
  }

  appear(animated = this.props.animated, additionAnimates = null) {
    if (animated) {
      this.state.overlayOpacity.setValue(0);
      Animated.parallel(this.appearAnimates.concat(additionAnimates)).start(e => this.appearCompleted());
    } else {
      this.state.overlayOpacity.setValue(this.overlayOpacity);
      this.appearCompleted();
    }
  }

  disappear(animated = this.props.animated, additionAnimates = null) {
    if (animated) {
      Animated.parallel(this.disappearAnimates.concat(additionAnimates)).start(e => this.disappearCompleted());
      this.state.overlayOpacity.addListener(e => {
        if (e.value < 0.01) {
          this.state.overlayOpacity.stopAnimation();
          this.state.overlayOpacity.removeAllListeners();
        }
      });
    } else {
      this.disappearCompleted();
    }
  }

  appearCompleted() {
    let {onAppearCompleted} = this.props;
    onAppearCompleted && onAppearCompleted();
  }

  disappearCompleted() {
    let {onDisappearCompleted} = this.props;    
    onDisappearCompleted && onDisappearCompleted();
  }

  close(animated = this.props.animated) {
    if (this.closed) return true;
    this.closed = true;
    this.removeBackListener();
    this.disappear(animated);
    return true;
  }

  closeRequest() {
    let {modal, onCloseRequest} = this.props;
    if (onCloseRequest) onCloseRequest(this);
    else if (!modal) this.close();
  }

  buildStyle() {
    let {style} = this.props;
    style = [{backgroundColor: 'rgba(0, 0, 0, 0)', flex: 1}].concat(style);
    return style;
  }

  renderContent() {
    return this.props.children;
  }

  render() {
    let {autoKeyboardInsets} = this.props;
    return (
      <View style={styles.screen} pointerEvents={this.overlayPointerEvents}>
        <Animated.View
          style={[styles.screen, {backgroundColor: '#000', opacity: this.state.overlayOpacity}]}
          {...this.panResponder.panHandlers}
          pointerEvents={this.props.blockTouch ? 'auto' : 'none'}
          />
        <View style={this.buildStyle()} pointerEvents='box-none'>
          {this.renderContent()}
        </View>
        {autoKeyboardInsets ? <KeyboardSpace /> : null}
      </View>
    );
  }

}

var styles = StyleSheet.create({
  screen: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
