// ModalIndicatorView.js

'use strict';

import React, {Component} from "react";
import PropTypes from 'prop-types';
import {View, Text, ActivityIndicator} from 'react-native';

import Theme from 'teaset/themes/Theme';
import Overlay from '../Overlay/Overlay';

export default class ModalIndicatorView extends Overlay.View {

  static propTypes = {
    ...Overlay.View.propTypes,
    text: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    position: PropTypes.oneOf(['top', 'bottom', 'center']),
    size: PropTypes.oneOfType([PropTypes.oneOf(['small', 'large']), PropTypes.number]),
    color: PropTypes.string,
  };

  static defaultProps = {
    ...Overlay.View.defaultProps,
    modal: true,
    position: 'center',
    size: 'large',
  };

  constructor(props) {
    super(props);
    Object.assign(this.state, {
      text: props.text,
    });
  }

  get text() {
    return this.state.text;
  }

  set text(value) {
    this.setState({text: value});
  }

  buildStyle() {
    let {style, position} = this.props;
    style = [{
      paddingLeft: Theme.miScreenPaddingLeft,
      paddingRight: Theme.miScreenPaddingRight,
      paddingTop: Theme.miScreenPaddingTop,
      paddingBottom: Theme.miScreenPaddingBottom,
      justifyContent: position === 'top' ? 'flex-start' : (position === 'bottom' ? 'flex-end' : 'center'),
      alignItems: 'center',
    }].concat(super.buildStyle());
    return style;
  }

  renderContent() {
    let {size, color} = this.props;
    let {text} = this.state;
    return (
      <View style={{alignItems: 'center'}}>
        <ActivityIndicator size={size} color={color || Theme.miIndicatorColor} />
        {React.isValidElement(text) ? text :
          <Text style={{color: Theme.miTextColor, fontSize: Theme.miFontSize, paddingTop: Theme.miTextPaddingTop}}>
            {text}
          </Text>
        }
      </View>
    );
  }

}
