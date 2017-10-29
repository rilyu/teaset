// TabSheet.js

'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, ViewPropTypes} from 'react-native';

import Theme from 'teaset/themes/Theme';

export default class TabSheet extends Component {
  
  static propTypes = {
    type: PropTypes.oneOf(['sheet', 'button']),
    title: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    icon: PropTypes.oneOfType([PropTypes.element, PropTypes.shape({uri: PropTypes.string}), PropTypes.number]),
    activeIcon: PropTypes.oneOfType([PropTypes.element, PropTypes.shape({uri: PropTypes.string}), PropTypes.number]),
    iconContainerStyle: ViewPropTypes.style,
    badge: PropTypes.oneOfType([PropTypes.element, PropTypes.number]),
    onPress: PropTypes.func,
  };

  static defaultProps = {
    type: 'sheet',
    active: false,
  };

  render() {
    let {style, ...others} = this.props;
    style = [{flex: 1}].concat(style);
    return <View style={style} {...others} />;
  }
}
