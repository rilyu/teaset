// OverlayPopoverView.js

'use strict';

import React, {Component} from "react";
import PropTypes from 'prop-types';
import {View, Dimensions, Platform, StatusBar} from 'react-native';

import OverlayView from './OverlayView';
import Popover from '../Popover/Popover';

export default class OverlayPopoverView extends OverlayView {

  static propTypes = {
    ...OverlayView.propTypes,
    popoverStyle: Popover.propTypes.style,
    fromBounds: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      width: PropTypes.number,
      height: PropTypes.number,
    }).isRequired,
    direction: PropTypes.oneOf(['down', 'up', 'right', 'left']),
    autoDirection: PropTypes.bool, //down -> up, or right -> left
    directionInsets: PropTypes.number,
    align: PropTypes.oneOf(['start', 'center', 'end']),
    alignInsets: PropTypes.number,
    showArrow: PropTypes.bool,
    paddingCorner: Popover.propTypes.paddingCorner,
  };

  static defaultProps = {
    ...OverlayView.defaultProps,
    overlayOpacity: 0,
    direction: 'down',
    autoDirection: true,
    align: 'end',
    showArrow: true,
  };

  constructor(props) {
    super(props);
    Object.assign(this.state, {
      fromBounds: props.fromBounds,
      popoverWidth: null,
      popoverHeight: null,
    });
  }

  componentWillReceiveProps(nextProps) {
    super.componentWillReceiveProps && super.componentWillReceiveProps(nextProps);
    if (JSON.stringify(nextProps.fromBounds) != JSON.stringify(this.state.fromBounds)) {
      this.setState({fromBounds: nextProps.fromBounds});
    }
  }

  updateFromBounds(bounds) {
    this.setState({fromBounds: bounds});
  }

  buildProps() {
    super.buildProps();

    let {fromBounds, popoverWidth, popoverHeight} = this.state;
    if (popoverWidth === null || popoverHeight === null) {
      let {popoverStyle, direction, showArrow, arrow, ...others} = this.props;
      if (!showArrow) arrow = 'none';
      else {
        switch (direction) {
          case 'right': arrow = 'left'; break;
          case 'left': arrow = 'right'; break;
          case 'up': arrow = 'bottom'; break;
          default: arrow = 'top'; break;
        }
      }
      popoverStyle = [].concat(popoverStyle).concat({position: 'absolute', left: 0, top: 0});
      this.props = {popoverStyle, direction, showArrow, arrow, ...others};
      return;
    }

    let {popoverStyle, direction, autoDirection, directionInsets, align, alignInsets, showArrow, arrow, ...others} = this.props;
    let screenWidth = Dimensions.get('window').width;
    let screenHeight = Dimensions.get('window').height;
    let {x, y, width, height} = fromBounds ? fromBounds : {};

    if (!x && x !== 0) x = screenWidth / 2;
    if (!y && y !== 0) y = screenHeight / 2;
    if (!width) width = 0;
    if (!height) height = 0;
    if (!directionInsets) directionInsets = 0;
    if (!alignInsets) alignInsets = 0;

    //auto direction
    let ph = popoverHeight + directionInsets;
    let pw = popoverWidth + directionInsets;
    switch (direction) {
      case 'right':
        if (autoDirection && x + width + pw > screenWidth && x >= pw) direction = 'left';
        break;
      case 'left':
        if (autoDirection && x + width + pw <= screenWidth && x < pw) direction = 'right';
        break;
      case 'up':
        if (autoDirection && y + height + ph <= screenHeight && y < ph) direction = 'down';
        break;
      default:
        if (autoDirection && y + height + ph > screenHeight && y >= ph) direction = 'up';
        break;
    }

    //calculate popover top-left position and arrow type
    let px, py;
    switch (direction) {
      case 'right':
        px = x + width + directionInsets;
        arrow = 'left';
        break;
      case 'left':
        px = x - popoverWidth - directionInsets;
        arrow = 'right';
        break;
      case 'up':
        py = y - popoverHeight - directionInsets;
        arrow = 'bottom';
        break;
      default:
        py = y + height + directionInsets;
        arrow = 'top';
        break;
    }
    if (direction == 'down' || direction == 'up') {
      switch (align) {
        case 'start':
          px = x - alignInsets;
          arrow += 'Left';
          break;
        case 'center':
          px = x + width / 2 - popoverWidth / 2;
          break;
        default:
          px = x + width - popoverWidth + alignInsets;
          arrow += 'Right';
          break;
      }
    }
    else if (direction == 'right' || direction == 'left') {
      switch (align) {
        case 'end':
          py = y + height - popoverHeight + alignInsets;
          arrow += 'Bottom';
          break;
        case 'center':
          py = y + height / 2 - popoverHeight / 2;
          break;
        default:
          py = y - alignInsets;
          arrow += 'Top';
          break;
      }
    }

    popoverStyle = [].concat(popoverStyle).concat({
      position: 'absolute',
      left: px,
      top: py,
    });
    if (!showArrow) arrow = 'none';

    this.props = {popoverStyle, direction, autoDirection, directionInsets, align, alignInsets, showArrow, arrow, ...others};
  }

  onPopoverLayout(e) {
    if (Platform.OS === 'android' && (this.state.popoverWidth !== null || this.state.popoverHeight != null)) {
      //android calls many times...
      return;
    }
    let {width, height} = e.nativeEvent.layout;
    if (width !== this.state.popoverWidth || height !== this.state.popoverHeight) {
      this.setState({popoverWidth: width, popoverHeight: height});
    }
  }

  renderContent() {
    let {popoverStyle, arrow, paddingCorner, children} = this.props;

    //in react native 0.49, this.props will not reset at rerender, then move opacity=0 to here
    let {popoverWidth, popoverHeight} = this.state;
    if (popoverWidth === null || popoverHeight === null) {
      popoverStyle = popoverStyle.concat({opacity: 0});
    }

    return (
      <Popover
        style={popoverStyle}
        arrow={arrow}
        paddingCorner={paddingCorner}
        onLayout={(e) => this.onPopoverLayout(e)}
      >
        {children}
      </Popover>
    );
  }

}
