// SwipeTouchableOpacity.js

'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, Animated} from 'react-native';

import Theme from 'teaset/themes/Theme';

import TouchableOpacity from './TouchableOpacity';

export default class SwipeTouchableOpacity extends TouchableOpacity {
  
  static propTypes = {
    swipeable: PropTypes.bool,
    swipeWidth: PropTypes.number,
    onSwipeStsChange: PropTypes.func, //(swipeSts), - none, - moving, - closing, - opening, - opened
  };

  static defaultProps = {
    swipeable: true,
    swipeWidth: 100,
  };

  constructor(props) {
    super(props);
    this._swipeSts = 'none';
    this.translateX = 0;
    this.prevTouches = [];
    this.replaceSuperFunction();
    this.state = {
      ...this.state,
      translateX: new Animated.Value(0),
    };
  }

  get swipeSts() {
    return this._swipeSts;
  }

  set swipeSts(value) {
    this._swipeSts = value;
    this.props.onSwipeStsChange && this.props.onSwipeStsChange(this._swipeSts);
  }

  replaceSuperFunction() {
    let touchableHandleResponderMove = this.touchableHandleResponderMove;
    this.touchableHandleResponderMove = (e) => {
      touchableHandleResponderMove.call(this, e);
      this.swiping(e);
    }

    let touchableHandleActivePressOut = this.touchableHandleActivePressOut;
    this.touchableHandleActivePressOut = (e) => {
      this.swipeOver();
      touchableHandleActivePressOut.call(this, e);
    }

    let touchableHandlePress = this.touchableHandlePress;
    this.touchableHandlePress = (e) => {
      if (!this.checkPress()) touchableHandlePress.call(this, e);
    }

    let touchableHandleLongPress = this.touchableHandleLongPress;
    this.touchableHandleLongPress = (e) => {
      if (!this.checkPress()) touchableHandleLongPress.call(this, e);
    }

  }

  swiping(e) {
    if (!this.props.swipeable || this.swipeSts === 'opened') {
      return;
    }

    let {touches} = e.nativeEvent;
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

    let dx = touches[0].pageX - prevTouches[0].pageX;
    if (Math.abs(this.translateX) > this.props.swipeWidth){
      this.translateX += dx / 3;
    } else {
      this.translateX += dx;
    }
    if (this.translateX > 16) {
      this.translateX = 16;
    }

    if (this.swipeSts === 'moving') {
      this.state.translateX.setValue(this.translateX);
    } else if (Math.abs(this.translateX) > 5) {
      let childStyle = StyleSheet.flatten(this.props.style) || {};
      this.state.anim.setValue(childStyle.opacity === undefined ? 1 : childStyle.opacity); //TouchableOpacity
      this.state.translateX.setValue(this.translateX);
      this.swipeSts = 'moving';
    }
  }

  swipeOver() {
    this.prevTouches = [];
    if (this.swipeSts === 'moving') {
      if (this.translateX > 0) {
        this.springClose();
      } else if (-this.translateX > 40 || -this.translateX > this.props.swipeWidth / 2) {
        this.timingOpen();
      } else {
        this.timingClose();
      }
    }    
  }

  checkPress() {
    if (this.swipeSts === 'opened') {
      this.timingClose();
    }
    return this.swipeSts !== 'none';
  }

  springClose() {
    this.swipeSts = 'closing';
    this.translateX = 0;
    Animated.spring(this.state.translateX, {
      toValue: this.translateX,
      friction: 5,
      useNativeDriver: true,
    }).start(() => {
      this.swipeSts = 'none';
    });
  }

  timingClose() {
    this.swipeSts = 'closing';
    this.translateX = 0;
    Animated.timing(this.state.translateX, {
      toValue: this.translateX,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      this.swipeSts = 'none';
    });
  }

  timingOpen() {
    this.swipeSts = 'opening';
    this.translateX = -this.props.swipeWidth;
    Animated.timing(this.state.translateX, {
      toValue: this.translateX,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      this.swipeSts = 'opened';
    });
  }

  render() {
    let view = super.render();
    return React.cloneElement(view, {style: view.props.style.concat({transform: [{translateX: this.state.translateX}]})});
  }
}
