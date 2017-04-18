// ListRow.js

'use strict';

import React, {Component, PropTypes} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

import Theme from 'teaset/themes/Theme';
import Label from '../Label/Label';

export default class ListRow extends Component {

  static propTypes = {
    ...TouchableOpacity.propTypes,
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
  };

  static defaultProps = {
    ...TouchableOpacity.defaultProps,
    activeOpacity: null,
    accessory: 'auto',
    topSeparator: 'none',
    bottomSeparator: 'indent',
    titlePlace: 'left',
  };

  measureInWindow(callback) {
    this.refs.containerView && this.refs.containerView.measureInWindow(callback);
  }

  buildProps() {
    let {style, activeOpacity, onPress, title, detail, titleStyle, detailStyle, detailMultiLine, icon, accessory, topSeparator, bottomSeparator, titlePlace, ...others} = this.props;

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
    let contentStyle = {
      flex: 1,
      overflow: 'hidden',
      flexDirection: titlePlace === 'top' ? 'column' : 'row',
      alignItems: titlePlace === 'top' ? 'stretch' : 'center',
      justifyContent: 'space-between',
    }

    //title
    if (titlePlace === 'none') {
      title = null;
    } if (typeof title === 'string' || typeof title === 'number') {
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

  render() {
    this.buildProps();

    let {title, detail, icon, accessory, topSeparator, bottomSeparator, contentStyle, children, ...others} = this.props;
    return (
      <View>
        {topSeparator}
        <TouchableOpacity {...others} ref='containerView'>
          {icon}
          <View style={contentStyle}>
            {title}
            {detail}
          </View>
          {accessory}
        </TouchableOpacity>
        {bottomSeparator}
        {children}
      </View>
    );
  }

}
