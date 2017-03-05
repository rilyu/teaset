// TabSheet.js

'use strict';

import React, {Component, PropTypes} from 'react';
import {View} from 'react-native';

import Theme from 'teaset/themes/Theme';

export default class TabSheet extends Component {
  
  static propTypes = {
    title: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    icon: PropTypes.oneOfType([PropTypes.element, PropTypes.shape({uri: PropTypes.string}), PropTypes.number]),
    activeIcon: PropTypes.oneOfType([PropTypes.element, PropTypes.shape({uri: PropTypes.string}), PropTypes.number]),
    badge: PropTypes.oneOfType([PropTypes.element, PropTypes.number]),
  };

  static defaultProps = {
    active: false,
  };

  render() {
    let {style, ...others} = this.props;
    style = [{flex: 1}].concat(style);
    return <View style={style} {...others} />;
  }
}
