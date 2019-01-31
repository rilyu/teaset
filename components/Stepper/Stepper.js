// Stepper.js

'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableOpacity, ViewPropTypes} from 'react-native';

import Theme from 'teaset/themes/Theme';

export default class Stepper extends Component {

  static propTypes = {
    ...ViewPropTypes,
    defaultValue: PropTypes.number,
    value: PropTypes.number,
    step: PropTypes.number,
    max: PropTypes.number,
    min: PropTypes.number,
    valueStyle: Text.propTypes.style,
    valueFormat: PropTypes.func, //(value)
    subButton: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    addButton: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    showSeparator: PropTypes.bool,
    disabled: PropTypes.bool,
    editable: PropTypes.bool,
    onChange: PropTypes.func, //(value)
  };

  static defaultProps = {
    ...View.defaultProps,
    defaultValue: 0,
    step: 1,
    subButton: '－',
    addButton: '＋',
    showSeparator: true,
    disabled: false,
    editable: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value ? props.value : (props.defaultValue ? props.defaultValue : 0),
      height: null,
    };
  }

  get value() {
    return (this.props.value === undefined ? this.state.value : this.props.value);
  }

  onLayout(e) {
    if (this.state.height === null) {
      this.setState({
        height: e.nativeEvent.layout.height,
      });
    }
    this.props.onLayout && this.props.onLayout(e);
  }

  onSubButtonPress() {
    let {step, min, onChange} = this.props;
    let value = this.value;
    value -= step;
    if (value < min) value = min;
    this.setState({value});
    onChange && onChange(value);
  }

  onAddButtonPress() {
    let {step, max, onChange} = this.props;
    let value = this.value;
    value += step;
    if (value > max) value = max;
    this.setState({value});
    onChange && onChange(value);
  }

  buildStyle() {
    let {style} = this.props;
    style = [{
      backgroundColor: Theme.stepperColor,
      borderColor: Theme.stepperBorderColor,
      borderWidth: Theme.stepperBorderWidth,
      borderRadius: Theme.stepperBorderRadius,
      flexDirection: 'row',
      alignItems: 'center',
      overflow: 'hidden',
    }].concat(style);
    return style;
  }

  renderSubButton() {
    let {subButton, disabled, editable, min} = this.props;

    let subDisabled = !editable || this.value <= min;
    let subOpacity = !disabled && subDisabled ? Theme.stepperDisabledOpacity : 1;

    if (!React.isValidElement(subButton)) {
      let btnStyle = {
        width: Theme.stepperButtonWidth,
        height: Theme.stepperButtonHeight,
        alignItems: 'center',
        justifyContent: 'center',
      };
      let btnTextStyle = {
        color: Theme.stepperBtnTextColor,
        fontSize: Theme.stepperBtnFontSize,
      };
      subButton = (
        <View style={btnStyle}>
          <Text style={btnTextStyle}>{subButton}</Text>
        </View>
      );
    }

    return (
      <TouchableOpacity disabled={subDisabled} onPress={() => this.onSubButtonPress()}>
        <View style={{opacity: subOpacity}}>
          {subButton}
        </View>
      </TouchableOpacity>
    );
  }

  renderAddButton() {
    let {addButton, disabled, editable, max} = this.props;

    let addDisabled = !editable || this.value >= max;
    let addOpacity = !disabled && addDisabled ? Theme.stepperDisabledOpacity : 1;

    let btnStyle = {
      width: Theme.stepperButtonWidth,
      height: Theme.stepperButtonHeight,
      alignItems: 'center',
      justifyContent: 'center',
    };
    let btnTextStyle = {
      color: Theme.stepperBtnTextColor,
      fontSize: Theme.stepperBtnFontSize,
    };
    if (!React.isValidElement(addButton)) {
      addButton = (
        <View style={btnStyle}>
          <Text style={btnTextStyle}>{addButton}</Text>
        </View>
      );
    }

    return (
      <TouchableOpacity disabled={addDisabled} onPress={() => this.onAddButtonPress()}>
        <View style={{opacity: addOpacity}}>
          {addButton}
        </View>
      </TouchableOpacity>
    );
  }

  renderValue() {
    let {valueStyle, valueFormat} = this.props;

    valueStyle = [{
      color: Theme.stepperTextColor,
      fontSize: Theme.stepperFontSize,
      textAlign: 'center',
      minWidth: Theme.stepperValueMinWidth,
      paddingHorizontal: Theme.stepperValuePaddingHorizontal,
    }].concat(valueStyle);

    return (
      <Text style={valueStyle} numberOfLines={1}>
        {valueFormat ? valueFormat(this.value) : this.value}
      </Text>
    );
  }

  render() {
    let {style, children, pointerEvents, opacity, defaultValue, value, step, max, min, valueStyle, valueFormat, subButton, addButton, showSeparator, disabled, editable, onLayout, onChange, ...others} = this.props; //disable View.onChange

    style = this.buildStyle();

    let separator;
    if (showSeparator) {
      let fs = StyleSheet.flatten(style);
      separator = <View style={{backgroundColor: fs.borderColor, width: fs.borderWidth, height: this.state.height}} />;
    }

    return (
      <View
        style={style}
        pointerEvents={disabled ? 'none' : pointerEvents}
        opacity={disabled ? Theme.stepperDisabledOpacity : opacity}
        onLayout={e => this.onLayout(e)}
        {...others}
      >
        {this.renderSubButton()}
        {separator}
        {this.renderValue()}
        {separator}
        {this.renderAddButton()}
      </View>
    );
  }

}
