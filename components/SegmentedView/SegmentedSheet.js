// SegmentedSheet.js

'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ViewPropTypes} from 'react-native';

import Theme from 'teaset/themes/Theme';

export default class SegmentedSheet extends Component {
  
  static propTypes = {
    ...ViewPropTypes,
    title: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]).isRequired,
    titleStyle: Text.propTypes.style,
    activeTitleStyle: Text.propTypes.style,
    badge: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
  };

  render() {
    let {style, title, titleStyle, activeTitleStyle, badge, ...others} = this.props;
    style = [{flexGrow: 1}].concat(style);
    return <View style={style} {...others} />;
  }
}
