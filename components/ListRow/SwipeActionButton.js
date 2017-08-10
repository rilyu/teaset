// SwipeActionButton.js

'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, TouchableOpacity} from 'react-native';

import Theme from 'teaset/themes/Theme';

export default class SwipeActionButton extends TouchableOpacity {
  
  static propTypes = {
    ...TouchableOpacity.propTypes,
    type: PropTypes.oneOf(['default', 'danger']),
    title: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    titleStyle: Text.propTypes.style,
  };

  static defaultProps = {
    ...TouchableOpacity.defaultProps,
    type: 'default',
  };

  buildProps() {
    let {style, type, title, titleStyle, children, ...others} = this.props;

    let backgroundColor, paddingHorizontal, textColor;
    switch (type) {
      case 'danger':
        backgroundColor = Theme.rowActionButtonDangerColor;
        textColor = Theme.rowActionButtonDangerTitleColor;
        break;
      default:
        backgroundColor = Theme.rowActionButtonColor;
        textColor = Theme.rowActionButtonTitleColor;
    }

    style = [{
      backgroundColor,
      paddingHorizontal: Theme.rowActionButtonPaddingHorizontal,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
    }].concat(style);

    if (!React.isValidElement(title) && (title || title === '' || title === 0)) {
      titleStyle = [{
        color: textColor,
        fontSize: Theme.rowActionButtonTitleFontSize,
        overflow: 'hidden',
      }].concat(titleStyle);
      title = <Text style={titleStyle} numberOfLines={1}>{title}</Text>;
    }
    if (title) children = title;

    this.props = {style, type, title, titleStyle, children, ...others};
  }

  render() {
    this.buildProps();
    return super.render();
  }
}
