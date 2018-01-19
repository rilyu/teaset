// Button.js

'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import Theme from 'teaset/themes/Theme';

export default class Button extends TouchableOpacity {
  
  static propTypes = {
    ...TouchableOpacity.propTypes,
    type: PropTypes.oneOf(['default', 'primary', 'secondary', 'danger', 'link']),
    size: PropTypes.oneOf(['xl', 'lg', 'md', 'sm', 'xs']),
    title: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    titleStyle: Text.propTypes.style,
  };

  static defaultProps = {
    ...TouchableOpacity.defaultProps,
    type: 'default',
    size: 'md',
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.disabled != this.props.disabled) {
      let opacity = Theme.btnDisabledOpacity;
      if (!nextProps.disabled) {
        let fs = StyleSheet.flatten(nextProps.style);
        opacity = fs && (fs.opacity || fs.opacity === 0) ? fs.opacity : 1;
      }
      this.state.anim.setValue(opacity);
    }
  }

  buildProps() {
    let {style, type, size, title, titleStyle, activeOpacity, disabled, children, ...others} = this.props;

    let backgroundColor, borderColor, borderWidth, borderRadius, paddingVertical, paddingHorizontal;
    let textColor, textFontSize;
    switch (type) {
      case 'primary':
        backgroundColor = Theme.btnPrimaryColor;
        borderColor = Theme.btnPrimaryBorderColor;
        textColor = Theme.btnPrimaryTitleColor;
        break;
      case 'secondary':
        backgroundColor = Theme.btnSecondaryColor;
        borderColor = Theme.btnSecondaryBorderColor;
        textColor = Theme.btnSecondaryTitleColor;
        break;
      case 'danger':
        backgroundColor = Theme.btnDangerColor;
        borderColor = Theme.btnDangerBorderColor;
        textColor = Theme.btnDangerTitleColor;
        break;
      case 'link':
        backgroundColor = Theme.btnLinkColor;
        borderColor = Theme.btnLinkBorderColor;
        textColor = Theme.btnLinkTitleColor;
        break;
      default:
        backgroundColor = Theme.btnColor;
        borderColor = Theme.btnBorderColor;
        textColor = Theme.btnTitleColor;
    }
    switch (size) {
      case 'xl':
        borderRadius = Theme.btnBorderRadiusXL;
        paddingVertical = Theme.btnPaddingVerticalXL;
        paddingHorizontal = Theme.btnPaddingHorizontalXL;
        textFontSize = Theme.btnFontSizeXL;
        break;
      case 'lg':
        borderRadius = Theme.btnBorderRadiusLG;
        paddingVertical = Theme.btnPaddingVerticalLG;
        paddingHorizontal = Theme.btnPaddingHorizontalLG;
        textFontSize = Theme.btnFontSizeLG;
        break;
      case 'sm':
        borderRadius = Theme.btnBorderRadiusSM;
        paddingVertical = Theme.btnPaddingVerticalSM;
        paddingHorizontal = Theme.btnPaddingHorizontalSM;
        textFontSize = Theme.btnFontSizeSM;
        break;
      case 'xs':
        borderRadius = Theme.btnBorderRadiusXS;
        paddingVertical = Theme.btnPaddingVerticalXS;
        paddingHorizontal = Theme.btnPaddingHorizontalXS;
        textFontSize = Theme.btnFontSizeXS;
        break;
      default:
        borderRadius = Theme.btnBorderRadiusMD;
        paddingVertical = Theme.btnPaddingVerticalMD;
        paddingHorizontal = Theme.btnPaddingHorizontalMD;
        textFontSize = Theme.btnFontSizeMD;
    }
    borderWidth = Theme.btnBorderWidth;

    style = [{
      backgroundColor,
      borderColor,
      borderWidth,
      borderRadius,
      paddingVertical: paddingVertical,
      paddingHorizontal: paddingHorizontal,
      overflow: 'hidden',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    }].concat(style);
    style = StyleSheet.flatten(style);
    if (disabled) {
      style.opacity = Theme.btnDisabledOpacity;
    }
    this.state.anim._value = style.opacity === undefined ? 1 : style.opacity;

    if (!React.isValidElement(title) && (title || title === '' || title === 0)) {
      titleStyle = [{
        color: textColor,
        fontSize: textFontSize,
        overflow: 'hidden',
      }].concat(titleStyle);
      title = <Text style={titleStyle} numberOfLines={1}>{title}</Text>;
    }
    if (title) children = title;

    this.props = {style, type, size, title, titleStyle, activeOpacity, disabled, children, ...others};
  }

  render() {
    this.buildProps();
    return super.render();
  }
}
