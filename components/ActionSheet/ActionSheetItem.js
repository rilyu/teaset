// ActionSheetItem.js

'use strict';

import React, {Component} from "react";
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import Theme from 'teaset/themes/Theme';

export default class ActionSheetItem extends Component {

  static propTypes = {
    ...TouchableOpacity.propTypes,
    type: PropTypes.oneOf(['default', 'cancel']),
    title: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    topSeparator: PropTypes.oneOfType([PropTypes.element, PropTypes.oneOf(['none', 'full', 'indent'])]),
    bottomSeparator: PropTypes.oneOfType([PropTypes.element, PropTypes.oneOf(['none', 'full', 'indent'])]),
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    ...TouchableOpacity.defaultProps,
    type: 'default',
    topSeparator: 'none',
    bottomSeparator: 'none',
    disabled: false,
  };

  buildStyle() {
    let {style, type} = this.props;
    style = [{
      backgroundColor: type === 'cancel' ? Theme.asCancelItemColor : Theme.asItemColor,
      paddingLeft: Theme.asItemPaddingLeft,
      paddingRight: Theme.asItemPaddingRight,
      paddingTop: Theme.asItemPaddingTop,
      paddingBottom: Theme.asItemPaddingBottom,
      minHeight: Theme.asItemMinHeight,
      overflow: 'hidden',
      justifyContent: 'center',
    }].concat(style);
    return style;
  }

  renderSeparator(separator) {
    let {type} = this.props;

    let indentViewStyle = {
      backgroundColor: 'rgba(0,0,0,0)',
      paddingLeft: Theme.asItemPaddingLeft,
    }
    let separatorStyle;
    if (type === 'cancel') {
      separatorStyle = {
        backgroundColor: Theme.asCancelItemSeparatorColor,
        height: Theme.asCancelItemSeparatorLineWidth,
      }
    } else {
      separatorStyle = {
        backgroundColor: Theme.asItemSeparatorColor,
        height:Theme.asItemSeparatorLineWidth,
      }
    }
    switch (separator) {
      case 'full': return <View style={separatorStyle} />;
      case 'indent': return <View style={indentViewStyle}><View style={separatorStyle} /></View>;
      default: return null;
    }
  }

  renderTitle() {
    let {type, title, disabled} = this.props;
    if (title === null || title === undefined || React.isValidElement(title)) return title;

    let textStyle;
    if (type === 'cancel') {
      textStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        color: Theme.asCancelItemTitleColor,
        fontSize: Theme.asCancelItemFontSize,
        textAlign: Theme.asCancelItemTitleAlign,
        opacity: disabled ? Theme.asItemDisabledOpacity : 1,
        overflow: 'hidden',
      };
    } else {
      textStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        color: Theme.asItemTitleColor,
        fontSize: Theme.asItemFontSize,
        textAlign: Theme.asItemTitleAlign,
        opacity: disabled ? Theme.asItemDisabledOpacity : 1,
        overflow: 'hidden',
      };
    }
    return <Text style={textStyle} numberOfLines={1}>{title}</Text>;
  }

  render() {
    let {style, children, type, title, topSeparator, bottomSeparator, disabled, activeOpacity, ...others} = this.props;
    return (
      <View style={{backgroundColor: 'rgba(0, 0, 0, 0)'}} >
        {this.renderSeparator(topSeparator)}
        <TouchableOpacity style={this.buildStyle()} activeOpacity={disabled ? 1 : activeOpacity} {...others}>
          {this.renderTitle()}
        </TouchableOpacity>
        {this.renderSeparator(bottomSeparator)}
      </View>
    );
  }

}

