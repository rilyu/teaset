// SegmentedButton.js

'use strict';

import React, {Component, PropTypes} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import Theme from 'teaset/themes/Theme';
import Badge from '../Badge/Badge';

export default class SegmentedButton extends Component {
  
  static propTypes = {
    ...TouchableOpacity.propTypes,
    title: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    active: PropTypes.bool,
    badge: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
  };

  static defaultProps = {
    ...TouchableOpacity.defaultProps,
    active: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      badgeRight: 0,
      badgeTop: 0,
    };
  }

  buildProps() {
    let {style, title, active, badge, ...others} = this.props;

    style = [{
      paddingTop: Theme.svBarBtnPaddingTop,
      paddingBottom: Theme.svBarBtnPaddingBottom,
      paddingLeft: Theme.svBarBtnPaddingLeft,
      paddingRight: Theme.svBarBtnPaddingRight,
      borderBottomWidth: active ? Theme.svBarBtnActiveLineWidth : 0,
      borderBottomColor: Theme.svBarBtnActiveLineColor,
      overflow: 'visible',
      alignItems: 'center',
      justifyContent: 'center',
    }].concat(style);

    if (!React.isValidElement(title) && (title || title === 0)) {
      let textStyle = {
        color: active ? Theme.svBarBtnActiveTitleColor : Theme.svBarBtnTitleColor,
        fontSize: Theme.svBarBtnTextFontSize,
      };
      title = <Text style={textStyle} numberOfLines={1}>{title}</Text>;
    }

    if (badge === 0) {
      badge = null;
    } else if (!React.isValidElement(badge) && badge) {
      let badgeStyle = {
        position: 'absolute',
        right: this.state.badgeRight,
        top: this.state.badgeTop,
      };
      badge = (
        <Badge
          style={badgeStyle}
          count={badge}
          onLayout={e => {
            let {width, height} = e.nativeEvent.layout;
            let badgeRight = -width / 2;
            let badgeTop = 0;
            if (badgeRight != this.state.badgeRight || badgeTop != this.state.badgeTop) {
              this.setState({badgeRight, badgeTop});
            }
          }}/>
      );
    }

    this.props = {style, title, active, badge, ...others};
  }

  render() {
    this.buildProps();

    let {title, active, badge, ...others} = this.props;
    return (
      <TouchableOpacity {...others}>
        {title}
        {badge}
      </TouchableOpacity>
    );
  }
}
