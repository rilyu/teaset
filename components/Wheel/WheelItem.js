// WheelItem.js

'use strict';

import React, {Component} from "react";
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, Animated, ViewPropTypes} from 'react-native';

import Theme from 'teaset/themes/Theme';

export default class WheelItem extends Component {

  static propTypes = {
    ...ViewPropTypes,
    index: PropTypes.number.isRequired,
    itemHeight: PropTypes.number.isRequired,
    wheelHeight: PropTypes.number.isRequired,
    currentPosition: PropTypes.any, //instanceOf(Animated)
  };

  static defaultProps = {
    ...Animated.View.defaultProps,
  };

  constructor(props) {
    super(props);
    this.lastPosition = null;
    this.state = {
      translateY: new Animated.Value(100000),
      scaleX: new Animated.Value(1),
      scaleY: new Animated.Value(1),
    };
  }

  componentWillMount() {
    if (!this.positionListenerId) {
      this.positionListenerId = this.props.currentPosition.addListener(e => {
        this.handlePositionChange(e.value);
      });
      this.handlePositionChange(this.props.currentPosition._value);
    }
  }

  componentWillUnmount() {
    if (this.positionListenerId) {
      this.props.currentPosition.removeListener(this.positionListenerId);
      this.positionListenerId = null;
    }
  }

  componentWillReceiveProps(nextProps) {
    let {itemHeight, wheelHeight, index} = this.props;
    if (nextProps.index != index
      || nextProps.itemHeight != itemHeight
      || nextProps.wheelHeight != wheelHeight) {
      this.handlePositionChange(nextProps.currentPosition._value, nextProps);
    }
  }

  calcProjection(diameter, point, width) {
    if (diameter == 0) return false;
    let radius = diameter / 2;
    let circumference = Math.PI * diameter;
    let quarter = circumference / 4;
    if (Math.abs(point) > quarter) return false;
    let alpha = point / circumference * Math.PI * 2;

    let pointProjection = radius * Math.sin(alpha);
    let distance = radius - radius * Math.sin(Math.PI / 2 - alpha);
    let eyesDistance = 1000;
    let widthProjection = width * eyesDistance / (distance + eyesDistance);

    return {point: pointProjection, width: widthProjection};
  }

  handlePositionChange(value, props = null) {
    let {itemHeight, wheelHeight, index} = props ? props : this.props;

    if (!itemHeight || !wheelHeight) return;
    if (this.lastPosition !== null && Math.abs(this.lastPosition - value) < 1) return;

    let itemPosition = itemHeight * index;
    let halfItemHeight = itemHeight / 2;
    let top = itemPosition - value - halfItemHeight;
    let bottom = top + itemHeight;
    let refWidth = 100;
    let p1 = this.calcProjection(wheelHeight, top, refWidth);
    let p2 = this.calcProjection(wheelHeight, bottom, refWidth);

    let ty = 10000, sx = 1, sy = 1;
    if (p1 && p2) {
      let y1 = p1.point;
      let y2 = p2.point;
      ty = (y1 + y2) / 2;
      sy = (y2 - y1) / itemHeight;
      sx = (p1.width + p2.width) / 2 / refWidth;
    }

    let {translateY, scaleX, scaleY} = this.state;
    translateY.setValue(ty);
    scaleX.setValue(sx);
    scaleY.setValue(sy);
    this.lastPosition = value;
  }

  render() {
    let {style, itemHeight, wheelHeight, index, currentPosition, children, ...others} = this.props;
    let {translateY, scaleX, scaleY} = this.state;
    style = [{
      backgroundColor: 'rgba(0, 0, 0, 0)',
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      justifyContent: 'center',
      transform: [{scaleX}, {translateY}, {scaleY}],
    }].concat(style);
    return (
      <Animated.View style={style} {...others}>
        {children}
      </Animated.View>
    );
  }

}
