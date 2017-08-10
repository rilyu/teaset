// NavigationIconButton.js

'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Image} from 'react-native';

import Theme from 'teaset/themes/Theme';
import NavigationButton from './NavigationButton';

export default class NavigationIconButton extends NavigationButton {

  static propTypes = {
    ...NavigationButton.propTypes,
    icon: Image.propTypes.source,
  }

  buildProps() {
    super.buildProps();

    let {icon, children, ...others} = this.props;

    if (icon) {
      let iconStyle = {
        tintColor: this.context.tintColor,
        width: 20,
        height: 20,
      };
      children = <Image style={iconStyle} source={icon} />;
    }

    this.props = {icon, children, ...others};
  }

}

