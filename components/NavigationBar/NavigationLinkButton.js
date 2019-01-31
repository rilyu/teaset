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

  renderTitle() {
    let {title} = this.props;
    if (title === null || title === undefined) return super.renderTitle();
    let textStyle = {
      color: this.context.tintColor,
      fontSize: Theme.navButtonFontSize,
      overflow: 'hidden',
    };
    return <Text style={textStyle} numberOfLines={1} allowFontScaling={false}>{title}</Text>;
  }

}

