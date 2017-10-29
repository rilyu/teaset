// Wheel.js

'use strict';

import React, {Component} from "react";
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, Animated, PanResponder, ViewPropTypes} from 'react-native';

import Theme from 'teaset/themes/Theme';
import WheelItem from './WheelItem';

export default class Wheel extends Component {

  static propTypes = {
    ...ViewPropTypes,
    items: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number])).isRequired,
    itemStyle: Text.propTypes.style,
    holeStyle: ViewPropTypes.style, //height is required
    maskStyle: ViewPropTypes.style,
    holeLine: PropTypes.oneOfType([PropTypes.element, PropTypes.number]),
    index: PropTypes.number,
    defaultIndex: PropTypes.number,
    onChange: PropTypes.func, //(index)
  };

  static defaultProps = {
    ...View.defaultProps,
    pointerEvents: 'box-only',
    defaultIndex: 0,
  };

  static Item = WheelItem;
  static preRenderCount = 10;

  constructor(props) {
    super(props);
    this.createPanResponder();
    this.prevTouches = [];
    this.index = props.index || props.index === 0 ? props.index : props.defaultIndex;
    this.lastRenderIndex = this.index;
    this.height = 0;
    this.holeHeight = 0;
    this.hiddenOffset = 0;
    this.currentPosition = new Animated.Value(0);
    this.targetPositionValue = null;
  }

  componentWillMount() {
    if (!this.positionListenerId) {
      this.positionListenerId = this.currentPosition.addListener(e => this.handlePositionChange(e.value));
    }
  }

  componentWillUnmount() {
    if (this.positionListenerId) {
      this.currentPosition.removeListener(this.positionListenerId);
      this.positionListenerId = null;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.index || nextProps.index === 0) {
      this.index = nextProps.index;
      this.currentPosition.setValue(nextProps.index * this.holeHeight);
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
    this.currentPosition.stopAnimation();
    this.prevTouches = e.nativeEvent.touches;
    this.speed = 0;
  }

  onPanResponderMove(e, gestureState) {
    let {touches} = e.nativeEvent;
    let prevTouches = this.prevTouches;
    this.prevTouches = touches;

    if (touches.length != 1 || touches[0].identifier != prevTouches[0].identifier) {
      return;
    }

    let dy = touches[0].pageY - prevTouches[0].pageY;
    let pos = this.currentPosition._value - dy;
    this.currentPosition.setValue(pos);

    let t = touches[0].timestamp - prevTouches[0].timestamp;
    if (t) this.speed = dy / t;
  }

  onPanResponderRelease(e, gestureState) {
    this.prevTouches = [];
    if (Math.abs(this.speed) > 0.1) this.handleSwipeScroll();
    else this.handleStopScroll();
  }

  handlePositionChange(value) {
    let newIndex = Math.round(value / this.holeHeight);
    if (newIndex != this.index && newIndex >= 0 && newIndex < this.props.items.length) {
      let moveCount = Math.abs(newIndex - this.lastRenderIndex);
      this.index = newIndex;
      if (moveCount > this.constructor.preRenderCount) {
        this.forceUpdate();
      }
    }

    // let the animation stop faster
    if (this.targetPositionValue != null && Math.abs(this.targetPositionValue - value) <= 2) {
      this.targetPositionValue = null;
      this.currentPosition.stopAnimation();
    }
  }

  handleSwipeScroll() {
    let {items} = this.props;

    let inertiaPos = this.currentPosition._value - this.speed * 300;
    let newIndex = Math.round(inertiaPos / this.holeHeight);
    if (newIndex < 0) newIndex = 0;
    else if (newIndex > items.length - 1) newIndex = items.length - 1;

    let toValue = newIndex * this.holeHeight;
    this.targetPositionValue = toValue;
    Animated.spring(this.currentPosition, {
      toValue: toValue,
      friction: 9,
    }).start(() => {
      this.currentPosition.setValue(toValue);
      this.props.onChange && this.props.onChange(newIndex);
    });
  }

  handleStopScroll() {
    let toValue = this.index * this.holeHeight;
    this.targetPositionValue = toValue;
    Animated.spring(this.currentPosition, {
      toValue: toValue,
      friction: 9,
    }).start(() => {
      this.currentPosition.setValue(toValue);
      this.props.onChange && this.props.onChange(this.index);
    });
  }

  handleLayout(height, holeHeight) {
    this.height = height;
    this.holeHeight = holeHeight;
    if (holeHeight) {
      let maskHeight = (height - holeHeight) / 2;
      this.hiddenOffset = Math.ceil(maskHeight / holeHeight) + this.constructor.preRenderCount;
    }
    this.forceUpdate(() => this.currentPosition.setValue(this.index * holeHeight));
  }

  onLayout(e) {
    this.handleLayout(e.nativeEvent.layout.height, this.holeHeight);
    this.props.onLayout && this.props.onLayout(e);
  }

  onHoleLayout(e) {
    this.handleLayout(this.height, e.nativeEvent.layout.height);
  }

  buildProps() {
    let {style, items, itemStyle, holeStyle, maskStyle, holeLine, ...others} = this.props;

    style = [{
      backgroundColor: Theme.wheelColor,
      overflow: 'hidden',
    }].concat(style);
    itemStyle = [{
      backgroundColor: 'rgba(0, 0, 0, 0)',
      fontSize: Theme.wheelFontSize,
      color: Theme.wheelTextColor,
    }].concat(itemStyle);
    holeStyle = [{
      backgroundColor: 'rgba(0, 0, 0, 0)',
      height: Theme.wheelHoleHeight,
      zIndex: 1,
    }].concat(holeStyle);
    maskStyle = [{
      backgroundColor: Theme.wheelMaskColor,
      opacity: Theme.wheelMaskOpacity,
      flex: 1,
      zIndex: 100,
    }].concat(maskStyle);
    if (holeLine === undefined) {
      holeLine = <View style={{height: Theme.wheelHoleLineWidth, backgroundColor: Theme.wheelHoleLineColor}} />;
    } else if (typeof holeLine === 'number') {
      holeLine = <View style={{height: holeLine, backgroundColor: Theme.wheelHoleLineColor}} />;
    }

    this.props = {style, items, itemStyle, holeStyle, maskStyle, holeLine, ...others};
  }

  renderItem(item, itemIndex) {
    let {itemStyle} = this.props;

    if (Math.abs(this.index - itemIndex) > this.hiddenOffset) return null;

    if (typeof item === 'string' || typeof item === 'number') {
      item = <Text style={itemStyle}>{item}</Text>;
    }
    
    return (
      <this.constructor.Item
        itemHeight={this.holeHeight}
        wheelHeight={this.height}
        index={itemIndex}
        currentPosition={this.currentPosition}
        key={itemIndex}
      >
        {item}
      </this.constructor.Item>
    );
  }

  render() {
    this.buildProps();
    this.lastRenderIndex = this.index;

    let {items, itemStyle, holeStyle, maskStyle, holeLine, defaultIndex, onChange, onLayout, ...others} = this.props;

    return (
      <View
        {...others}
        onLayout={e => this.onLayout(e)}
        {...this.panResponder.panHandlers}
      >
        {items.map((item, index) => this.renderItem(item, index))}
        <View style={maskStyle} />
        {holeLine}
        <View style={holeStyle} onLayout={e => this.onHoleLayout(e)} />
        {holeLine}
        <View style={maskStyle} />
      </View>
    )
  }

}

