// Badge.js

'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ViewPropTypes} from 'react-native';

import Theme from 'teaset/themes/Theme';

export default class Badge extends Component {

  static propTypes = {
    ...ViewPropTypes,
    type: PropTypes.oneOf(['capsule', 'square', 'dot']),
    count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    countStyle: Text.propTypes.style,
    maxCount: PropTypes.number,
  };

  static defaultProps = {
    ...View.defaultProps,
    type: 'capsule',
    maxCount: 99,
  };

  buildProps() {
    let {style, type, count, countStyle, maxCount, children, ...others} = this.props;

    let width, height, minWidth, borderRadius, borderWidth, padding;
    switch (type) {
      case 'capsule':
        height = Theme.badgeSize;
        minWidth = Theme.badgeSize;
        borderRadius = Theme.badgeSize / 2;
        borderWidth = Theme.badgeBorderWidth;
        padding = (count + '').length === 1 ? 0 : Theme.badgePadding;
        break;
      case 'square':
        height = Theme.badgeSize;
        minWidth = Theme.badgeSize;
        borderRadius = 2;
        borderWidth = Theme.badgeBorderWidth;
        padding = (count + '').length === 1 ? 0 : Theme.badgePadding;
        break;
      case 'dot':
        width = Theme.badgeDotSize;
        height = Theme.badgeDotSize;        
        borderRadius = Theme.badgeDotSize / 2;
        borderWidth = 0;
        padding = 0;
        break;
    }

    style = [{
      backgroundColor: Theme.badgeColor,
      width: width,
      height: height,
      minWidth: minWidth,
      borderRadius: borderRadius,
      borderColor: Theme.badgeBorderColor,
      borderWidth: borderWidth,
      paddingLeft: padding,
      paddingRight: padding,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    }].concat(style);

    if (type === 'dot') children = null;
    else if (count || count === 0) {
      countStyle = [{
        color: Theme.badgeTextColor,
        fontSize: Theme.badgeFontSize,
      }].concat(countStyle);
      children = (
        <Text style={countStyle} allowFontScaling={false} numberOfLines={1}>
          {count > maxCount ? maxCount + '+' : count}
        </Text>
      );
    }

    this.props = {style, type, count, countStyle, maxCount, children, ...others};
  }

  render() {
    this.buildProps();
    return <View {...this.props} />;
  }

}
