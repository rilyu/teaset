// OverlayPopView.js

'use strict';

import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Animated, View, ViewPropTypes} from 'react-native';

import OverlayView from './OverlayView';

export default class OverlayPopView extends OverlayView {

  static propTypes = {
    ...OverlayView.propTypes,
    type: PropTypes.oneOf(['zoomOut', 'zoomIn', 'custom']),
    containerStyle: ViewPropTypes.style,
    customBounds: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }),
  };

  static defaultProps = {
    ...OverlayView.defaultProps,
    type: 'zoomOut',
    animated: true,
  };

  constructor(props) {
    super(props);
    this.viewLayout = {x: 0, y: 0, width: 0, height: 0};
    Object.assign(this.state, {
      opacity: new Animated.Value(1), 
      translateX: new Animated.Value(0),
      translateY: new Animated.Value(0),
      scaleX: new Animated.Value(1),
      scaleY: new Animated.Value(1),
      showed: false,
    });
  }

  get appearAnimates() {
    let animates = super.appearAnimates;
    let duration = 200;
    animates = animates.concat([
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration,
        useNativeDriver: false,
      }),
      Animated.timing(this.state.translateX, {
        toValue: 0,
        duration,
        useNativeDriver: false,
      }),
      Animated.timing(this.state.translateY, {
        toValue: 0,
        duration,
        useNativeDriver: false,
      }),
      Animated.timing(this.state.scaleX, {
        toValue: 1,
        duration,
        useNativeDriver: false,
      }),
      Animated.timing(this.state.scaleY, {
        toValue: 1,
        duration,
        useNativeDriver: false,
      }),
    ]);
    return animates;
  }
  
  get disappearAnimates() {
    let animates = super.disappearAnimates;
    let duration = 200;
    let ft = this.fromTransform;
    animates = animates.concat([
      Animated.timing(this.state.opacity, {
        toValue: 0,
        duration,
        useNativeDriver: false,
      }),
      Animated.timing(this.state.translateX, {
        toValue: ft.translateX,
        duration,
        useNativeDriver: false,
      }),
      Animated.timing(this.state.translateY, {
        toValue: ft.translateY,
        duration,
        useNativeDriver: false,
      }),
      Animated.timing(this.state.scaleX, {
        toValue: ft.scaleX,
        duration,
        useNativeDriver: false,
      }),
      Animated.timing(this.state.scaleY, {
        toValue: ft.scaleY,
        duration,
        useNativeDriver: false,
      }),
    ]);
    return animates;
  }

  get appearAfterMount() {
    return false;
  }

  get fromBounds() {
    let {type, customBounds} = this.props;
    let bounds;
    if (type === 'custom' && !customBounds) {
      console.error('OverlayPopView: customBounds can not be null when type is "custom"');
    }
    if (type === 'custom' && customBounds) {
      bounds = customBounds;
    } else {
      let zoomRate = type === 'zoomIn' ? 0.3 : 1.2;
      let {x, y, width, height} = this.viewLayout;
      bounds = {
        x: x - (width * zoomRate - width) / 2,
        y: y - (height * zoomRate - height) / 2,
        width: width * zoomRate,
        height: height * zoomRate,
      };
    }
    return bounds;
  }

  get fromTransform() {
    let fb = this.fromBounds;
    let tb = this.viewLayout;
    let transform = {
      translateX: (fb.x + fb.width / 2) - (tb.x + tb.width / 2),
      translateY: (fb.y + fb.height / 2) - (tb.y + tb.height / 2),
      scaleX: fb.width / tb.width,
      scaleY: fb.height / tb.height,
    };
    return transform;
  }

  appear(animated = this.props.animated) {
    if (animated) {
      let {opacity, translateX, translateY, scaleX, scaleY} = this.state;
      let ft = this.fromTransform;
      opacity.setValue(0);
      translateX.setValue(ft.translateX);
      translateY.setValue(ft.translateY);
      scaleX.setValue(ft.scaleX);
      scaleY.setValue(ft.scaleY);
    }
    super.appear(animated);
  }

  onLayout(e) {
    this.viewLayout = e.nativeEvent.layout;
    if (!this.state.showed) {
      this.setState({showed: true});
      this.appear();
    }
  }

  renderContent(content = null) {
    let {containerStyle, children} = this.props;
    let {opacity, translateX, translateY, scaleX, scaleY} = this.state;

    containerStyle = [{
      backgroundColor: 'rgba(0, 0, 0, 0)',
      minWidth: 1,
      minHeight: 1,
    }].concat(containerStyle).concat({
      opacity: this.state.showed ? opacity : 0,
      transform: [{translateX}, {translateY}, {scaleX}, {scaleY}],
    });

    return (
      <Animated.View style={containerStyle} pointerEvents='box-none' onLayout={(e) => this.onLayout(e)}>
        {content ? content : children}
      </Animated.View>
    );
  }

}
