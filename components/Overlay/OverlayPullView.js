// OverlayPullView.js

'use strict';

import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Animated, View, ViewPropTypes} from 'react-native';

import Theme from '../../themes/Theme';
import TopView from './TopView';
import OverlayView from './OverlayView';

export default class OverlayPullView extends OverlayView {

  static propTypes = {
    ...OverlayView.propTypes,
    side: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    containerStyle: ViewPropTypes.style,
    rootTransform: PropTypes.oneOfType([
      PropTypes.oneOf(['none', 'translate', 'scale']),
      PropTypes.arrayOf(PropTypes.shape({
        translateX: PropTypes.number,
        translateY: PropTypes.number,
        scaleX: PropTypes.number,
        scaleY: PropTypes.number,
      })),
    ]),
  };

  static defaultProps = {
    ...OverlayView.defaultProps,
    side: 'bottom',
    animated: true,
    rootTransform: 'none',
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

  get rootTransformValue() {
    let {side, rootTransform} = this.props;
    if (!rootTransform || rootTransform === 'none') {
      return [];
    }
    let transform;
    switch (rootTransform) {
      case 'translate':
        switch (side) {
          case 'top': return [{translateY: this.viewLayout.height}];
          case 'left': return [{translateX: this.viewLayout.width}];
          case 'right': return [{translateX: -this.viewLayout.width}];
          default: return [{translateY: -this.viewLayout.height}];
        }
        break;
      case 'scale':
        return [{scaleX: Theme.overlayRootScale}, {scaleY: Theme.overlayRootScale}];
      default:
        return rootTransform;
    }
  }

  appear(animated = this.props.animated) {
    if (animated) {
      this.state.marginValue.setValue(this.marginSize);
    }
    super.appear(animated);

    let {rootTransform} = this.props;
    if (rootTransform && rootTransform !== 'none') {
      TopView.transform(this.rootTransformValue, animated);
    }
  }

  disappear(animated = this.props.animated) {
    let {rootTransform} = this.props;
    if (rootTransform && rootTransform !== 'none') {
      TopView.restore(animated);
    }

    super.disappear(animated);
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
      backgroundColor: Theme.defaultColor,//rgba(0, 0, 0, 0)',
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
