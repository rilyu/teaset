// SegmentedSheet.js

'use strict';

import React, {Component, PropTypes} from 'react';
import {View, Text} from 'react-native';

import Theme from 'teaset/themes/Theme';

export default class SegmentedSheet extends Component {
  
  static propTypes = {
    ...View.propTypes,
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
