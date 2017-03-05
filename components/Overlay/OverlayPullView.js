// OverlayPullView.js

'use strict';

import React, {Component, PropTypes} from "react";
import {Animated, View} from 'react-native';

import OverlayView from './OverlayView';

export default class OverlayPullView extends OverlayView {

  static propTypes = {
    ...OverlayView.propTypes,
    side: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    containerStyle: View.propTypes.style,
  };

  static defaultProps = {
    ...OverlayView.defaultProps,
    side: 'bottom',
    animated: true,
  };

  constructor(props) {
    super(props);
    this.viewLayout = {x: 0, y: 0, width: 0, height: 0};
    Object.assign(this.state, {
      marginValue: new Animated.Value(0),
      showed: false,
    });
  }

  get appearAnimates() {
    let animates = super.appearAnimates;
    animates.push(
      Animated.spring(this.state.marginValue, {
        toValue: 0,
        friction: 9,
      })
    );
    return animates;
  }
  
  get disappearAnimates() {
    let animates = super.disappearAnimates;
    animates.push(
      Animated.spring(this.state.marginValue, {
        toValue: this.marginSize,
        friction: 9,
      })
    );
    return animates;
  }

  get appearAfterMount() {
    return false;
  }

  get marginSize() {
    let {side} = this.props;
    if (side === 'left' || side === 'right') return -this.viewLayout.width;
    else return -this.viewLayout.height;
  }

  appear(animated = this.props.animated) {
    if (animated) {
      this.state.marginValue.setValue(this.marginSize);
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

  buildProps() {
    super.buildProps();

    let {side, style, containerStyle, ...others} = this.props;

    let sideStyle, contentStyle;
    //Set flexDirection so that the content view will fill the side
    switch (side) {
      case 'top':
        sideStyle = {flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch'};
        contentStyle = {marginTop: this.state.marginValue};
        break;
      case 'left':
        sideStyle = {flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'stretch'};
        contentStyle = {marginLeft: this.state.marginValue};
        break;
      case 'right':
        sideStyle = {flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'stretch'};
        contentStyle = {marginRight: this.state.marginValue};
        break;
      default:
        sideStyle = {flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'stretch'};
        contentStyle = {marginBottom: this.state.marginValue};
    }
    style = [].concat(style).concat(sideStyle);
    contentStyle.opacity = this.state.showed ? 1 : 0;
    containerStyle = [{
      backgroundColor: '#fff',//rgba(0, 0, 0, 0)',
    }].concat(containerStyle).concat(contentStyle);

    this.props = {side, style, containerStyle, ...others};
  }

  renderContent() {
    let {containerStyle, children} = this.props;
    return (
      <Animated.View style={containerStyle} onLayout={(e) => this.onLayout(e)}>
        {children}
      </Animated.View>
    );
  }

}
