// Checkbox.js

'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, Image, TouchableOpacity} from 'react-native';

import Theme from 'teaset/themes/Theme';

export default class Checkbox extends Component {
  
  static propTypes = {
    checked: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    size: PropTypes.oneOf(['lg', 'md', 'sm']),
    title: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    titleStyle: Text.propTypes.style,
    checkedIcon: PropTypes.oneOfType([PropTypes.element, PropTypes.shape({uri: PropTypes.string}), PropTypes.number]),
    checkedIconStyle: Image.propTypes.style,
    uncheckedIcon: PropTypes.oneOfType([PropTypes.element, PropTypes.shape({uri: PropTypes.string}), PropTypes.number]),
    uncheckedIconStyle: Image.propTypes.style,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    defaultChecked: false,
    size: 'md',
    checkedIcon: require('../../icons/checked.png'),
    uncheckedIcon: require('../../icons/unchecked.png'),
    hitSlop: {top: 8, bottom: 8, left: 8, right: 8},
  };

  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      checked: props.checked === true || props.checked === false ? props.checked : props.defaultChecked,
    };
  }

  componentDidUpdate(prevProps) {
    let {checked, disabled} = this.props;
    if (checked === true || checked === false) {
      if (checked !== this.state.checked) {
        this.setState({checked});
      }
    }
  }

  buildStyle() {
    let {style, disabled} = this.props;

    style = [{
      backgroundColor: 'rgba(0, 0, 0, 0)',
      overflow: 'hidden',
      flexDirection: 'row',
      alignItems: 'center',
    }].concat(style);
    style = StyleSheet.flatten(style);
    if (disabled) {
      style.opacity = Theme.cbDisabledOpacity;
    }

    return style;
  }

  renderIcon() {
    let {size, checkedIcon, uncheckedIcon, checkedIconStyle, uncheckedIconStyle} = this.props;
    let {checked} = this.state;

    let iconSize;
    switch (size) {
      case 'lg': iconSize = Theme.cbIconSizeLG; break;
      case 'sm': iconSize = Theme.cbIconSizeSM; break;
      default: iconSize = Theme.cbIconSizeMD;
    }

    let iconStyle = [{
      tintColor: checked ? Theme.cbCheckedTintColor : Theme.cbUncheckedTintColor,
      width: iconSize,
      height: iconSize,
    }].concat(checked ? checkedIconStyle : uncheckedIconStyle);

    if (!React.isValidElement(checkedIcon) && (checkedIcon || checkedIcon === 0)) {
      checkedIcon = <Image key='icon' style={iconStyle} source={checkedIcon} />;
    }
    if (!React.isValidElement(uncheckedIcon) && (uncheckedIcon || uncheckedIcon === 0)) {
      uncheckedIcon = <Image key='icon' style={iconStyle} source={uncheckedIcon} />;
    }

    return checked ? checkedIcon : uncheckedIcon;
  }

  renderTitle() {
    let {size, title, titleStyle} = this.props;

    if (!React.isValidElement(title) && (title || title === '' || title === 0)) {
      let textFontSize, textPaddingLeft;
      switch (size) {
        case 'lg':
          textFontSize = Theme.cbFontSizeLG;
          textPaddingLeft = Theme.cbTitlePaddingLeftLG;
          break;
        case 'sm':
          textFontSize = Theme.cbFontSizeSM;
          textPaddingLeft = Theme.cbTitlePaddingLeftSM;
          break;
        default:
          textFontSize = Theme.cbFontSizeMD;
          textPaddingLeft = Theme.cbTitlePaddingLeftMD;
      }

      let textStyle = [{
        color: Theme.cbTitleColor,
        fontSize: textFontSize,
        overflow: 'hidden',
        paddingLeft: textPaddingLeft,
      }].concat(titleStyle);

      title = (
        <Text key='title' style={textStyle} numberOfLines={1}>
          {title}
        </Text>
      );
    }

    return title;
  }

  render() {
    let {style, children, checked, defaultChecked, size, title, titleStyle, checkedIcon, checkedIconStyle, uncheckedIcon, uncheckedIconStyle, disabled, activeOpacity, onChange, onPress, ...others} = this.props;
    style = this.buildStyle();
    if (disabled) activeOpacity = style.opacity;
    return (
      <TouchableOpacity
        style={style}
        disabled={disabled}
        activeOpacity={activeOpacity}
        onPress={e => {
          this.setState({checked: !checked});
          onChange && onChange(!checked);
          onPress && onPress(e);
        }}
        {...others}
      >
        {this.renderIcon()}
        {this.renderTitle()}
      </TouchableOpacity>
    );
  }
}
