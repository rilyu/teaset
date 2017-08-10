// NavigationLinkButton.js

'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text} from 'react-native';

import Theme from 'teaset/themes/Theme';
import NavigationButton from './NavigationButton';

export default class NavigationLinkButton extends NavigationButton {

  static propTypes = {
    ...NavigationButton.propTypes,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  buildProps() {
    super.buildProps();

    let {title, children, ...others} = this.props;

    if (title || title === '' || title === 0) {
      let textStyle = {
        color: this.context.tintColor,
        fontSize: Theme.navButtonFontSize,
        overflow: 'hidden',
      };
      children = <Text style={textStyle} numberOfLines={1} allowFontScaling={false}>{title}</Text>;
    }

    this.props = {title, children, ...others};
  }

}

