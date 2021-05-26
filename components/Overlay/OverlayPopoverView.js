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
    this.defaultDirectionInsets = 0;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    super.componentDidUpdate && super.componentDidUpdate(prevProps, prevState, snapshot);
    if (JSON.stringify(this.props.fromBounds) !== JSON.stringify(this.state.fromBounds)) {
      this.setState({fromBounds: this.props.fromBounds});
    }
  }

  updateFromBounds(bounds) {
    this.setState({fromBounds: bounds});
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

  buildPopoverStyle() {
    let {fromBounds, popoverWidth, popoverHeight} = this.state;
    let {popoverStyle, direction, autoDirection, directionInsets, align, alignInsets, showArrow, arrow} = this.props;
    if (popoverWidth === null || popoverHeight === null) {
      popoverStyle = [].concat(popoverStyle).concat({position: 'absolute', left: 0, top: 0, opacity: 0});
      if (!showArrow) arrow = 'none';
      else {
        switch (direction) {
          case 'right': arrow = 'left'; break;
          case 'left': arrow = 'right'; break;
          case 'up': arrow = 'bottom'; break;
          default: arrow = 'top'; break;
        }
      }
      return {popoverStyle, arrow};
    }

    let screenWidth = Dimensions.get('window').width;
    let screenHeight = Dimensions.get('window').height;
    let {x, y, width, height} = fromBounds ? fromBounds : {};

    if (!x && x !== 0) x = screenWidth / 2;
    if (!y && y !== 0) y = screenHeight / 2;
    if (!width) width = 0;
    if (!height) height = 0;
    if (!directionInsets && directionInsets !== 0) directionInsets = this.defaultDirectionInsets;
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

    return {popoverStyle, arrow};
  }

  renderContent(content = null) {
    let {paddingCorner, children} = this.props;
    let {popoverStyle, arrow} = this.buildPopoverStyle();
    return (
      <Popover style={popoverStyle} arrow={arrow} paddingCorner={paddingCorner} onLayout={(e) => this.onPopoverLayout(e)}>
        {content ? content : children}
      </Popover>
    );
  }

}
