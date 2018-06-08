// TransformView.js

'use strict';

import React, {Component} from "react";
import PropTypes from 'prop-types';
import {StyleSheet, View, Animated, Easing, PanResponder, ViewPropTypes} from 'react-native';

import Theme from 'teaset/themes/Theme';

export default class TransformView extends Component {

  static propTypes = {
    ...ViewPropTypes,
    containerStyle: ViewPropTypes.style,
    maxScale: PropTypes.number,
    minScale: PropTypes.number,
    inertial: PropTypes.bool,
    magnetic: PropTypes.bool,
    tension: PropTypes.bool,
    onWillTransform: PropTypes.func, //(translateX, translateY, scale)
    onTransforming: PropTypes.func, //(translateX, translateY, scale)
    onDidTransform: PropTypes.func, //(translateX, translateY, scale)
    onWillInertialMove: PropTypes.func, //(translateX, translateY, newX, newY), return ture or false
    onDidInertialMove: PropTypes.func, //(translateX, translateY, newX, newY)
    onWillMagnetic: PropTypes.func, //(translateX, translateY, scale, newX, newY, newScale), return ture or false
    onDidMagnetic: PropTypes.func, //(translateX, translateY, scale)
    onPress: PropTypes.func, //(event)
    onLongPress: PropTypes.func, //(event)
  };

  static defaultProps = {
    ...View.defaultProps,
    inertial: true,
    magnetic: true,
    tension: true,
  };

  constructor(props) {
    super(props);
    this.createPanResponder();
    this.prevTouches = [];
    this.viewLayout = {x: 0, y: 0, width: 0, height: 0};
    this.initContentLayout = {x: 0, y: 0, width: 0, height: 0};
    this.state = {
      translateX: new Animated.Value(0),
      translateY: new Animated.Value(0),
      scale: new Animated.Value(1),
    };
  }

  get contentLayout() {
    let {translateX, translateY, scale} = this.state;
    let originX = this.initContentLayout.x + this.initContentLayout.width / 2;
    let originY = this.initContentLayout.y + this.initContentLayout.height / 2;
    let scaleOriginX = originX + translateX._value;
    let scaleOriginY = originY + translateY._value;
    let scaleWidth = this.initContentLayout.width * scale._value;
    let scaleHeight = this.initContentLayout.height * scale._value;
    let scaleX = scaleOriginX - scaleWidth / 2;
    let scaleY = scaleOriginY - scaleHeight / 2;
    let contentLayout = {x: scaleX, y: scaleY, width: scaleWidth, height: scaleHeight};
    return contentLayout;
  }

  setupLongPressTimer(e) {
    let {onLongPress} = this.props;
    if (!onLongPress) return;
    this.removeLongPressTimer();
    this.longPressTimer = setTimeout(() => {
      this.longPressTimer = null;
      onLongPress && onLongPress(e);
    }, 500);
  }

  removeLongPressTimer() {
    if (this.longPressTimer) {
      clearTimeout(this.longPressTimer);
      this.longPressTimer = null;
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
    this.setupLongPressTimer(e);
    this.touchMoved = false;
    this.lockDirection = 'none';
    this.dxSum = 0;
    this.dySum = 0;
    this.speedX = 0;
    this.speedY = 0;
    this.touchTime = new Date();
    this.prevTouches = e.nativeEvent.touches;
    let {onWillTransform} = this.props;
    let {translateX, translateY, scale} = this.state;
    onWillTransform && onWillTransform(translateX._value, translateY._value, scale._value);
  }

  onPanResponderMove(e, gestureState) {
    this.handleTouches(e.nativeEvent.touches, (dx, dy, speedX, speedY, scaleRate) => {
      let {tension, onTransforming} = this.props;
      let {translateX, translateY, scale} = this.state;

      let {x, y, width, height} = this.contentLayout;
      if (tension) {
        if (x > this.initContentLayout.x) dx /= 3;
        else if ((x + width) < (this.initContentLayout.x + this.initContentLayout.width)) dx /= 3;
        if (y > this.initContentLayout.y) dy /= 3;
        else if ((y + height) < (this.initContentLayout.y + this.initContentLayout.height)) dy /= 3;
      }
      this.dxSum += dx;
      this.dySum += dy;
      this.speedX = speedX;
      this.speedY = speedY;
      let adx = Math.abs(this.dxSum), ady = Math.abs(this.dySum), asr = Math.abs(scaleRate - 1);
      if (!this.touchMoved && adx < 6 && ady < 6 && asr < 0.01) {
        return;
      }
      if (e.nativeEvent.touches.length == 1 && this.lockDirection === 'none') {
        if (adx > ady && height <= this.viewLayout.height) {
          this.lockDirection = 'y';
        } else if (adx < ady && width <= this.viewLayout.width) {
          this.lockDirection = 'x';
        }
      }

      switch(this.lockDirection) {
        case 'x':
          translateX.setValue(0);
          translateY.setValue(translateY._value + dy);
          break;
        case 'y':
          translateX.setValue(translateX._value + dx);
          translateY.setValue(0);
          break;
        default:
          translateX.setValue(translateX._value + dx);
          translateY.setValue(translateY._value + dy);
          scale.setValue(scale._value * scaleRate);
      }

      this.removeLongPressTimer();
      this.touchMoved = true;
      onTransforming && onTransforming(translateX._value, translateY._value, scale._value);
    });
  }

  onPanResponderRelease(e, gestureState) {
    this.removeLongPressTimer();
    this.prevTouches = [];
    this.handleRelease();
    let {onDidTransform, onPress} = this.props;
    let {translateX, translateY, scale} = this.state;
    onDidTransform && onDidTransform(translateX._value, translateY._value, scale._value);
    let now = new Date();
    if (!this.touchTime) this.touchTime = now;
    if (!this.touchMoved) {
      let duration = now.getTime() - this.touchTime.getTime();
      if (duration < 500) onPress && onPress(e);
    }
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

    let t = touches[0].timestamp - prevTouches[0].timestamp;
    let speedX = t ? (dx / t) : 0;
    let speedY = t ? (dy / t) : 0;

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

      // unused code
      // let {x, y, width, height} = this.contentLayout;
      // let scalePointX = (prevTouches[1].locationX + prevTouches[0].locationX) / 2 - x;
      // let scalePointY = (prevTouches[1].locationY + prevTouches[0].locationY) / 2 - y;
      // //view center point position
      // let centerX = width / 2;
      // let centerY = height / 2;
      // //the scale point with the center of the view as the origin
      // let spBeforScaleX = scalePointX - centerX;
      // let spBeforScaleY = scalePointY - centerY;
      // let spAfterScaleX = spBeforScaleX * scaleRate;
      // let spAfterScaleY = spBeforScaleY * scaleRate;
      // //So that the scale point does not seem to move
      // dx += spBeforScaleX - spAfterScaleX;
      // dy += spBeforScaleY - spAfterScaleY;

      onHandleCompleted(dx, dy, speedX, speedY, scaleRate);
    } else {
      onHandleCompleted(dx, dy, speedX, speedY, 1);
    }
  }

  handleRelease() {
    let {inertial, onWillInertialMove, onDidInertialMove} = this.props;
    let {translateX, translateY} = this.state;
    let inertiaX = this.speedX * 60;
    let inertiaY = this.speedY * 60;
    if (this.lockDirection === 'x' || Math.abs(inertiaX) < 10) inertiaX = 0;
    if (this.lockDirection === 'y' || Math.abs(inertiaY) < 10) inertiaY = 0;
    if (inertial && inertiaX || inertiaY) {
      let newX = translateX._value + inertiaX;
      let newY = translateY._value + inertiaY;
      let animates = [];
      inertiaX && animates.push(
        Animated.timing(translateX, {
          toValue: newX,
          easing: Easing.elastic(0),
          duration: 100,
        })
      );
      inertiaY && animates.push(
        Animated.timing(translateY, {
          toValue: newY,
          easing: Easing.elastic(0),
          duration: 100,
        })
      );
      let canInertialMove = !onWillInertialMove || onWillInertialMove(translateX._value, translateY._value, newX, newY);
      canInertialMove && Animated.parallel(animates).start(e => {
        translateX.setValue(newX);
        translateY.setValue(newY);
        onDidInertialMove && onDidInertialMove(translateX._value, translateY._value, newX, newY);
        this.handleMagnetic();
      });
    } else {
      this.handleMagnetic();
    }
  }

  handleMagnetic() {
    let {magnetic, maxScale, minScale, onDidTransform, onWillMagnetic, onDidMagnetic} = this.props;
    let {translateX, translateY, scale} = this.state;
    let newX = null, newY = null, newScale = null;
    if (magnetic) {
      let {x, y, width, height} = this.contentLayout;
      if (width < this.initContentLayout.width || height < this.initContentLayout.height) {
        newX = 0;
        newY = 0;
        newScale = 1;
      } else {
        if (width < this.viewLayout.width) {
          newX = 0;
        } else if (x > 0) {
          newX = translateX._value - x;
        } else if ((x + width) < this.viewLayout.width) {
          newX = translateX._value + (this.viewLayout.width - (x + width));
        }
        if (height < this.viewLayout.height) {
          newY = 0;
        } else if (y > 0) {
          newY = translateY._value - y;
        } else if ((y + height) <  this.viewLayout.height) {
          newY = translateY._value + (this.viewLayout.height - (y + height));
        }
      }

    }
    if (newScale === null) {
      if (scale._value > maxScale) newScale = maxScale;
      else if (scale._value < minScale) newScale = minScale;
    }

    let animates = [];
    newX !== null && animates.push(
      Animated.timing(translateX, {
        toValue: newX,
        easing: Easing.elastic(0),
        duration: 200,
      })
    );
    newY !== null && animates.push(
      Animated.timing(translateY, {
        toValue: newY,
        easing: Easing.elastic(0),
        duration: 200,
      })
    );
    newScale !== null && animates.push(
      Animated.timing(scale, {
        toValue: newScale,
        easing: Easing.elastic(0),
        duration: 200,
      })
    );
    if (animates.length > 0) {
      if (newX === null) newX = translateX._value;
      if (newY === null) newY = translateY._value;
      if (newScale === null) newScale = scale._value;
      let canDoMagnetic = !onWillMagnetic || onWillMagnetic(
        translateX._value,
        translateY._value,
        scale._value,
        newX,
        newY,
        newScale,
      );
      canDoMagnetic && Animated.parallel(animates).start(e => {
        translateX.setValue(newX);
        translateY.setValue(newY);
        scale.setValue(newScale);
        onDidTransform && onDidTransform(newX, newY, newScale);
        onDidMagnetic && onDidMagnetic(newX, newY, newScale);
      });
    }
  }

  buildProps() {
    let {style, containerStyle, ...others} = this.props;
    let {translateX, translateY, scale} = this.state;

    style = StyleSheet.flatten([{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }].concat(style));
    containerStyle = [].concat(containerStyle).concat({
      transform: [{translateX: translateX}, {translateY: translateY}, {scale: scale}],
    });

    this.props = {style, containerStyle, ...others};
  }

  render() {
    this.buildProps();

    let {containerStyle, children, onLayout, ...others} = this.props;
    return (
      <View
        {...others}
        onLayout={e => {
          this.viewLayout = e.nativeEvent.layout;
          onLayout && onLayout(e);
        }}
        ref='view'
        {...this.panResponder.panHandlers}
      >
        <Animated.View
          style={containerStyle}
          ref='containerView'
          onLayout={e => {
            this.initContentLayout = e.nativeEvent.layout;
          }}
        >
          {children}
        </Animated.View>
      </View>
    );
  }

}
