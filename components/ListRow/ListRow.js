// ListRow.js

'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, Image} from 'react-native';

import Theme from 'teaset/themes/Theme';
import Label from '../Label/Label';
import SwipeTouchableOpacity from './SwipeTouchableOpacity';
import SwipeActionButton from './SwipeActionButton';

export default class ListRow extends Component {

  static propTypes = {
    ...SwipeTouchableOpacity.propTypes,
    title: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    detail: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    titleStyle: Text.propTypes.style,
    detailStyle: Text.propTypes.style,
    detailMultiLine: PropTypes.bool, //是否支持多行内容
    icon: PropTypes.oneOfType([PropTypes.element, PropTypes.shape({uri: PropTypes.string}), PropTypes.number]),
    accessory: PropTypes.oneOfType([PropTypes.element, PropTypes.shape({uri: PropTypes.string}), PropTypes.number, PropTypes.oneOf(['none', 'auto', 'empty', 'check', 'indicator'])]),
    topSeparator: PropTypes.oneOfType([PropTypes.element, PropTypes.oneOf(['none', 'full', 'indent'])]),
    bottomSeparator: PropTypes.oneOfType([PropTypes.element, PropTypes.oneOf(['none', 'full', 'indent'])]),
    titlePlace: PropTypes.oneOf(['none', 'left', 'top']),
    swipeActions: PropTypes.arrayOf(PropTypes.element),
  };

  static defaultProps = {
    ...SwipeTouchableOpacity.defaultProps,
    activeOpacity: null,
    accessory: 'auto',
    topSeparator: 'none',
    bottomSeparator: 'indent',
    titlePlace: 'left',
  };

  static SwipeActionButton = SwipeActionButton;

  constructor(props) {
    super(props);
    this.state = {
      swipeSts: 'none',
      swipeWidth: 0,
    }
  }

  measureInWindow(callback) {
    this.refs.containerView && this.refs.containerView.measureInWindow(callback);
  }

  measure(callback) {
    this.refs.containerView && this.refs.containerView.measure(callback);
  }

  closeSwipeActions() {
    this.refs.containerView && this.refs.containerView.timingClose();
  }

  buildProps() {
    let {style, activeOpacity, onPress, title, detail, titleStyle, detailStyle, detailMultiLine, icon, accessory, topSeparator, bottomSeparator, titlePlace, contentStyle, ...others} = this.props;

    //style
    style = [{
      backgroundColor: Theme.rowColor,
      paddingLeft: Theme.rowPaddingLeft,
      paddingRight: Theme.rowPaddingRight,
      paddingTop: Theme.rowPaddingTop,
      paddingBottom: Theme.rowPaddingBottom,
      minHeight: Theme.rowMinHeight,
      overflow: 'hidden',
      flexDirection: 'row',
      alignItems: 'center',
    }].concat(style);

    //activeOpacity
    if (!activeOpacity && activeOpacity !== 0) activeOpacity = onPress ? 0.2 : 1;

    //contentStyle
    contentStyle = {
      flex: 1,
      overflow: 'hidden',
      flexDirection: titlePlace === 'top' ? 'column' : 'row',
      alignItems: titlePlace === 'top' ? 'stretch' : 'center',
      justifyContent: 'space-between',
    }

    //title
    if (titlePlace === 'none') {
      title = null;
    }
    if (typeof title === 'string' || typeof title === 'number') {
      let textStyle = (!detail && titlePlace === 'left') ? {flexGrow: 1, flexShrink: 1} : null;
      title = <Label style={[textStyle, titleStyle]} type='title' text={title} />
    }

    //detail
    if (typeof detail === 'string' || typeof detail === 'number') {
      let textStyle = titlePlace === 'top' ? {lineHeight: Theme.rowDetailLineHeight, color: Theme.labelTextColor} : {flexGrow: 1, flexShrink: 1, textAlign: 'right'};
      if (title) {
        if (titlePlace === 'left') textStyle.paddingLeft = Theme.rowPaddingTitleDetail;
        else textStyle.paddingTop = Theme.rowPaddingTitleDetail;
      }
      if (!detailMultiLine && detailMultiLine !== false) {
        detailMultiLine = titlePlace === 'top';
      }
      detail = <Label style={[textStyle, detailStyle]} type='detail' text={detail} numberOfLines={detailMultiLine ? 0 : 1} />
    }

    //icon
    if ((icon || icon === 0) && !React.isValidElement(icon)) {
      icon = (
        <View style={{paddingRight: Theme.rowIconPaddingRight}}>
          <Image style={{width: Theme.rowIconWidth, height: Theme.rowIconHeight}} source={icon} />
        </View>
      );
    }

    //accessory
    if (accessory === 'none') accessory = null;
    else if (accessory === 'auto') accessory = onPress ? 'indicator' : null;
    if (accessory && !React.isValidElement(accessory)) {
      let imageSource, tintColor;
      switch (accessory) {
        case 'empty':
          imageSource = null;
          break;
        case 'check':
          imageSource = require('teaset/icons/check.png');
          tintColor = Theme.rowAccessoryCheckColor;
          break;
        case 'indicator':
          imageSource = require('teaset/icons/indicator.png');
          tintColor = Theme.rowAccessoryIndicatorColor;
          break;
        default: imageSource = accessory;
      }
      let imageStyle = {
        width: Theme.rowAccessoryWidth,
        height: Theme.rowAccessoryHeight,
        tintColor: tintColor,
      };
      accessory = (
        <View style={{paddingLeft: Theme.rowAccessoryPaddingLeft}}>
          <Image style={imageStyle} source={imageSource} />
        </View>
      );
    }

    //topSeparator and bottomSeparator
    let separatorStyle = {
      backgroundColor: Theme.rowSeparatorColor,
      height: Theme.rowSeparatorLineWidth,
    };
    let indentViewStyle = {
      backgroundColor: StyleSheet.flatten(style).backgroundColor,
      paddingLeft: Theme.rowPaddingLeft,
    }
    switch (topSeparator) {
      case 'none':
        topSeparator = null;
        break;
      case 'full':
        topSeparator = <View style={separatorStyle} />;
        break;
      case 'indent':
        topSeparator = (
          <View style={indentViewStyle}>
            <View style={separatorStyle} />
          </View>
        );
        break;
    }
    switch (bottomSeparator) {
      case 'none':
        bottomSeparator = null;
        break;
      case 'full':
        bottomSeparator = <View style={separatorStyle} />;
        break;
      case 'indent':
        bottomSeparator = (
          <View style={indentViewStyle}>
            <View style={separatorStyle} />
          </View>
        );
        break;        
    }

    this.props = {style, activeOpacity, onPress, title, detail, titleStyle, detailStyle, detailMultiLine, icon, accessory, topSeparator, bottomSeparator, titlePlace, contentStyle, ...others};
  }

  renderSwipeActionView() {
    let {swipeActions} = this.props;
    if (!(swipeActions instanceof Array) || swipeActions.length == 0) return null;

    let {swipeSts} = this.state;
    let swipeActionViewStyle = {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      opacity: swipeSts === 'none' ? 0 : 1,
      flexDirection: 'row',
      alignItems: 'stretch',
      justifyContent: 'flex-end',
    }
    return (
      <View
        style={swipeActionViewStyle}
        onLayout={e => this.setState({swipeWidth: e.nativeEvent.layout.width})}
      >
        {swipeActions.map((item, index) => React.cloneElement(item, {
          key: item.key ? item.key : 'action' + index,
          onPress: () => {
            this.refs.containerView && this.refs.containerView.timingClose();
            item.props.onPress && item.props.onPress();
          }
        }))}
      </View>
    );
  }

  render() {
    this.buildProps();

    let {title, detail, icon, accessory, topSeparator, bottomSeparator, swipeActions, contentStyle, onLayout, children, ...others} = this.props;
    let {swipeSts} = this.state;
    return (
      <View onLayout={onLayout}>
        {topSeparator}
        {this.renderSwipeActionView()}
        <SwipeTouchableOpacity
          {...others}
          swipeable={swipeActions instanceof Array && swipeActions.length > 0}
          swipeWidth={this.state.swipeWidth}
          onSwipeStsChange={swipeSts => this.setState({swipeSts})}
          ref='containerView'
        >
          {icon}
          {!title && !detail ? null :
            <View style={contentStyle}>
              {title}
              {detail}
            </View>
          }
          {!title && !detail ? children : null}
          {accessory}
        </SwipeTouchableOpacity>
        {bottomSeparator}
      </View>
    );
  }

}
