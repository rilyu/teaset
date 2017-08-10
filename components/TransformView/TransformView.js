// TransformView.js

'use strict';

import React, {Component} from "react";
import PropTypes from 'prop-types';
import {StyleSheet, View, Animated, PanResponder} from 'react-native';

import Theme from 'teaset/themes/Theme';

export default class TransformView extends Component {

  static propTypes = {
    ...View.propTypes,
    containerStyle: View.propTypes.style,
    maxScale: PropTypes.number,
    minScale: PropTypes.number,
    magnetic: PropTypes.bool,
    onWillTransform: PropTypes.func, //(translateX, translateY, scale)
    onTransforming: PropTypes.func, //(translateX, translateY, scale)
    onDidTransform: PropTypes.func, //(translateX, translateY, scale)
    onPress: PropTypes.func, //(event)
  };

  static defaultProps = {
    ...View.defaultProps,
    magnetic: true,
  };

  constructor(props) {
    super(props);
    this.createPanResponder();
    this.prevTouches = [];
    this.initLayout = {x: 0, y: 0, width: 0, height: 0};
    this.state = {
      translateX: new Animated.Value(0),
      translateY: new Animated.Value(0),
      scale: new Animated.Value(1),
    };
  }

  get layout() {
    let {translateX, translateY, scale} = this.state;
    let originX = this.initLayout.x + this.initLayout.width / 2;
    let originY = this.initLayout.y + this.initLayout.height / 2;
    let scaleOriginX = originX + translateX._value;
    let scaleOriginY = originY + translateY._value;
    let scaleWidth = this.initLayout.width * scale._value;
    let scaleHeight = this.initLayout.height * scale._value;
    let scaleX = scaleOriginX - scaleWidth / 2;
    let scaleY = scaleOriginY - scaleHeight / 2;
    let layout = {x: scaleX, y: scaleY, width: scaleWidth, height: scaleHeight};
    return layout;
  }

  restoreLayout(animated) {
    let {translateX, translateY, scale} = this.state;
    if (animated) {
      Animated.parallel([
        Animated.spring(translateX, {
          toValue: 0,
          friction: 7,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          friction: 7,
        }),
        Animated.spring(scale, {
          toValue: 1,
          friction: 7,
        }),
      ]).start();
    } else {
      translateX.setValue(0);
      translateY.setValue(0);
      scale.setValue(1);
    }
  }

  createPanResponder() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => true,
      onStartShouldSetPanResponderCapture: (e, gestureState) => false,
      onMoveShouldSetPanResponder: (e, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (e, gestureState) => false,
      onPanResponderGrant: (e, gestureState) => this.onPanResponderGrant(e, gestureState),
      onPanResponderMove: (e, gestureState) => this.onPanResponderMove(e, gestureState),
      onPanResponderTerminationRequest: (e, gestureState) => true,
      onPanResponderRelease: (e, gestureState) => this.onPanResponderRelease(e, gestureState),
      onPanResponderTerminate: (e, gestureState) => null,
      onShouldBlockNativeResponder: (e, gestureState) => true,
    });
  }

  onPanResponderGrant(e, gestureState) {
    //let initLayout relative to screen
    this.refs.view && this.refs.view.measureInWindow((x, y, width, height) => {
      Object.assign(this.initLayout, {x, y, width, height});
    });

    this.touchMoved = false;
    this.touchTime = new Date();
    this.prevTouches = e.nativeEvent.touches;
    let {onWillTransform} = this.props;
    let {translateX, translateY, scale} = this.state;
    onWillTransform && onWillTransform(translateX._value, translateY._value, scale._value);
  }

  onPanResponderMove(e, gestureState) {
    this.touchMoved = true;
    this.handleTouches(e.nativeEvent.touches, (dx, dy, scaleRate) => {
      let {magnetic, onTransforming} = this.props;
      let {translateX, translateY, scale} = this.state;

      let {x, y, width, height} = this.layout;
      if (x > this.initLayout.x) dx /= 3;
      else if ((x + width) < (this.initLayout.x + this.initLayout.width)) dx /= 3;
      if (y > this.initLayout.y) dy /= 3;
      else if ((y + height) < (this.initLayout.y + this.initLayout.height)) dy /= 3;

      translateX.setValue(translateX._value + dx);
      translateY.setValue(translateY._value + dy);
      scale.setValue(scale._value * scaleRate);
      onTransforming && onTransforming(translateX._value, translateY._value, scale._value);
    });
  }

  onPanResponderRelease(e, gestureState) {
    this.prevTouches = [];
    this.handleRelease();
    let {onDidTransform, onPress} = this.props;
    let {translateX, translateY, scale} = this.state;
    onDidTransform && onDidTransform(translateX._value, translateY._value, scale._value);
    let now = new Date();
    if (!this.touchTime) this.touchTime = now;
    !this.touchMoved && now.getTime() - this.touchTime.getTime() < 500 && onPress && onPress(e);
  }

  handleTouches(touches, onHandleCompleted) {
    let prevTouches = this.prevTouches;
    this.prevTouches = touches;

    if (touches.length == 0 || touches.length != prevTouches.length) {
      return;
    }
    for (let i = 0; i < touches.length; ++i) {
      if (touches[i].identifier != prevTouches[i].identifier) {
        return;
      }
    }

    //translate
    let t0, t1;
    if (touches.length == 1) {
      t0 = {x: prevTouches[0].pageX, y: prevTouches[0].pageY};
      t1 = {x: touches[0].pageX, y: touches[0].pageY};
    } else {
      t0 = {x: (prevTouches[0].pageX + prevTouches[1].pageX) / 2, y: (prevTouches[0].pageY + prevTouches[1].pageY) / 2};
      t1 = {x: (touches[0].pageX + touches[1].pageX) / 2, y: (touches[0].pageY + touches[1].pageY) /2};
    }
    let dx = t1.x - t0.x;
    let dy = t1.y - t0.y;

    //scale
    let distance0 = 0, distance1 = 0;
    if (touches.length >= 2) {
      let dx0 = prevTouches[1].pageX - prevTouches[0].pageX;
      let dy0 = prevTouches[1].pageY - prevTouches[0].pageY;
      let dx1 = touches[1].pageX - touches[0].pageX;
      let dy1 = touches[1].pageY - touches[0].pageY;
      distance0 = Math.sqrt(dx0 * dx0 + dy0 * dy0);
      distance1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
    }

    if (distance0 && distance1) {
      let scaleRate = distance1 / distance0;

      let {maxScale} = this.props;
      let {scale} = this.state;
      if (scale._value * scaleRate > maxScale) {
        scaleRate = maxScale / scale._value;
      }

      let scalePointX = (prevTouches[1].pageX + prevTouches[0].pageX) / 2;
      let scalePointY = (prevTouches[1].pageY + prevTouches[0].pageY) / 2;
      let {x, y, width, height} = this.layout;
      //view center point position
      let viewCenterX = x + width / 2;
      let viewCenterY = y + height / 2;
      //the scale point with the center of the view as the origin
      let spBeforScaleX = scalePointX - viewCenterX;
      let spBeforScaleY = scalePointY - viewCenterY;
      let spAfterScaleX = spBeforScaleX * scaleRate;
      let spAfterScaleY = spBeforScaleY * scaleRate;
      //So that the scale point does not seem to move
      dx += spBeforScaleX - spAfterScaleX;
      dy += spBeforScaleY - spAfterScaleY;
      onHandleCompleted(dx, dy, scaleRate);
    } else {
      onHandleCompleted(dx, dy, 1);
    }
  }

  handleRelease() {
    let {magnetic, maxScale, minScale} = this.props;
    let {translateX, translateY, scale} = this.state;
    let newX = null, newY = null, newScale = null;
    if (magnetic) {
      let {x, y, width, height} = this.layout;
      if (width < this.initLayout.width || height < this.initLayout.height) {
        newX = 0;
        newY = 0;
        newScale = 1;
      } else {
        if (x > this.initLayout.x) {
          newX = translateX._value - (x - this.initLayout.x);
        } else if ((x + width) < (this.initLayout.x + this.initLayout.width)) {
          newX = translateX._value + ((this.initLayout.x + this.initLayout.width) - (x + width));
        }
        if (y > this.initLayout.y) {
          newY = translateY._value - (y - this.initLayout.y);
        } else if ((y + height) < (this.initLayout.y + this.initLayout.height)) {
          newY = translateY._value + ((this.initLayout.y + this.initLayout.height) - (y + height));
        }
      }
    }
    if (newScale === null) {
      if (scale._value > maxScale) newScale = maxScale;
      else if (scale._value < minScale) newScale = minScale;
    }

    let animates = [];
    newX !== null && animates.push(
      Animated.spring(translateX, {
        toValue: newX,
        friction: 7,
      })
    );
    newY !== null && animates.push(
      Animated.spring(translateY, {
        toValue: newY,
        friction: 7,
      })
    );
    newScale !== null && animates.push(
      Animated.spring(scale, {
        toValue: newScale,
        friction: 7,
      })
    );
    animates.length > 0 && Animated.parallel(animates).start();
  }

  buildProps() {
    let {style, containerStyle, ...others} = this.props;
    let {translateX, translateY, scale} = this.state;

    style = StyleSheet.flatten([{overflow: 'hidden'}].concat(style));
    let {flexDirection, alignItems, justifyContent, ...styleOthers} = style;
    style = {...styleOthers};
    containerStyle = [{
      flexDirection,
      alignItems,
      justifyContent,      
    }].concat(containerStyle).concat({
      flexGrow: 1,
      transform: [{translateX: translateX}, {translateY: translateY}, {scale: scale}],
    });

    this.props = {style, containerStyle, ...others};
  }

  render() {
    this.buildProps();

    let {containerStyle, children,...others} = this.props;
    return (
      <View {...others} ref='view'>
        <Animated.View
          style={containerStyle}
          ref='containerView'
          onLayout={e => {
            this.initLayout = e.nativeEvent.layout;
            this.restoreLayout(false);
          }}
          {...this.panResponder.panHandlers}
        >
          {children}
        </Animated.View>
      </View>
    );
  }

}
