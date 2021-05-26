// Input.js

'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, TextInput} from 'react-native';

import Theme from 'teaset/themes/Theme';

export default class Input extends Component {

  static propTypes = {
    size: PropTypes.oneOf(['lg', 'md', 'sm']),
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    size: 'md',
    disabled: false,
    underlineColorAndroid: 'rgba(0, 0, 0, 0)',
  };

  buildStyle() {
    let {style, size} = this.props;

    let borderRadius, fontSize, paddingVertical, paddingHorizontal, height;
    switch (size) {
      case 'lg':
        borderRadius = Theme.inputBorderRadiusLG;
        fontSize = Theme.inputFontSizeLG;
        paddingVertical = Theme.inputPaddingVerticalLG;
        paddingHorizontal = Theme.inputPaddingHorizontalLG;
        height = Theme.inputHeightLG;
        break;
      case 'sm':
        borderRadius = Theme.inputBorderRadiusSM;
        fontSize = Theme.inputFontSizeSM;
        paddingVertical = Theme.inputPaddingVerticalSM;
        paddingHorizontal = Theme.inputPaddingHorizontalSM;
        height = Theme.inputHeightSM;
        break;
      default:
        borderRadius = Theme.inputBorderRadiusMD;
        fontSize = Theme.inputFontSizeMD;
        paddingVertical = Theme.inputPaddingVerticalMD;
        paddingHorizontal = Theme.inputPaddingHorizontalMD;
        height = Theme.inputHeightMD;
    }
    style = [{
      backgroundColor: Theme.inputColor,
      color: Theme.inputTextColor,
      borderColor: Theme.inputBorderColor,
      borderWidth: Theme.inputBorderWidth,
      borderRadius: borderRadius,
      fontSize: fontSize,
      paddingVertical: paddingVertical,
      paddingHorizontal: paddingHorizontal,
      height: height,
    }].concat(style);

    return style;
  }

  render() {
    let {style, size, disabled, placeholderTextColor, pointerEvents, opacity, ...others} = this.props;
    return (
      <TextInput
        style={this.buildStyle()}
        placeholderTextColor={placeholderTextColor ? placeholderTextColor : Theme.inputPlaceholderTextColor}
        pointerEvents={disabled ? 'none' : pointerEvents}
        opacity={disabled ? Theme.inputDisabledOpacity : opacity}
        {...others}
        />
    );
  }

}
