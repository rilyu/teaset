// Checkbox.js

'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, TouchableOpacity} from 'react-native';

import Theme from 'teaset/themes/Theme';

export default class Checkbox extends TouchableOpacity {
  
  static propTypes = {
    ...TouchableOpacity.propTypes,
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
    ...TouchableOpacity.defaultProps,
    defaultChecked: false,
    size: 'md',
    checkedIcon: require('../../icons/checked.png'),
    uncheckedIcon: require('../../icons/unchecked.png'),
    hitSlop: {top: 8, bottom: 8, left: 8, right: 8},
  };

  constructor(props) {
    super(props);
    this.state = Object.assign(this.state, {
      checked: props.checked === true || props.checked === false ? props.checked : props.defaultChecked,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.checked === true || nextProps.checked === false) {
      if (nextProps.checked != this.state.checked) {
        this.setState({checked: nextProps.checked});
      }
    }
  }

  buildProps() {
    let {style, size, title, checkedIcon, uncheckedIcon, titleStyle, checkedIconStyle, uncheckedIconStyle, children, onPress, onChange, ...others} = this.props;
    let {checked} = this.state;

    let iconSize, textFontSize, textPaddingLeft;
    switch (size) {
      case 'lg':
        iconSize = Theme.cbIconSizeLG;
        textFontSize = Theme.cbFontSizeLG;
        textPaddingLeft = Theme.cbTitlePaddingLeftLG;
        break;
      case 'sm':
        iconSize = Theme.cbIconSizeSM;
        textFontSize = Theme.cbFontSizeSM;
        textPaddingLeft = Theme.cbTitlePaddingLeftSM;
        break;
      default:
        iconSize = Theme.cbIconSizeMD;
        textFontSize = Theme.cbFontSizeMD;
        textPaddingLeft = Theme.cbTitlePaddingLeftMD;
    }

    style = [{
      backgroundColor: 'rgba(0, 0, 0, 0)',
      overflow: 'hidden',
      flexDirection: 'row',
      alignItems: 'center',
    }].concat(style);
    let iconStyle = [{
      tintColor: checked ? Theme.cbCheckedTintColor : Theme.cbUncheckedTintColor,
      width: iconSize,
      height: iconSize,
    }].concat(checked ? checkedIconStyle : uncheckedIconStyle);
    let textStyle = [{
      color: Theme.cbTitleColor,
      fontSize: textFontSize,
      overflow: 'hidden',
      paddingLeft: textPaddingLeft,
    }].concat(titleStyle);

    if (React.isValidElement(checkedIcon)) {
      checkedIcon = React.cloneElement(checkedIcon, {key: 'icon'});
    } else if (checkedIcon || checkedIcon === 0) {
      checkedIcon = <Image key='icon' style={iconStyle} source={checkedIcon} />;
    }
    if (React.isValidElement(uncheckedIcon)) {
      uncheckedIcon = React.cloneElement(uncheckedIcon, {key: 'icon'});
    } else if (uncheckedIcon || uncheckedIcon === 0) {
      uncheckedIcon = <Image key='icon' style={iconStyle} source={uncheckedIcon} />;
    }
    if (React.isValidElement(title)) {
      title = React.cloneElement(title, {key: 'title'});
    } else if ((title || title === '' || title === 0)) {
      title = (
        <Text key='title' style={textStyle} numberOfLines={1}>
          {title}
        </Text>
      );
    }

    children = [
      checked ? checkedIcon : uncheckedIcon,
      title ? title : null,
    ];

    onPress = () => {
      this.setState({checked: !checked});
      onChange && onChange(!checked);
    };

    this.props = {style, size, title, checkedIcon, uncheckedIcon, titleStyle, checkedIconStyle, uncheckedIconStyle, children, onPress, onChange, ...others};
  }

  render() {
    this.buildProps();

    if (this.props.disabled) {
      return (
        <View style={{opacity: Theme.cbDisabledOpacity}}>
          {super.render()}
        </View>
      );
    } else {
      return super.render();
    }
  }
}
