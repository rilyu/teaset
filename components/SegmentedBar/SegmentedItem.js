// SegmentedItem.js

'use strict';

import React, {Component, PropTypes} from 'react';
import {View, Text} from 'react-native';

import Theme from 'teaset/themes/Theme';
import Badge from '../Badge/Badge';

export default class SegmentedItem extends View {

  static propTypes = {
    ...View.propTypes,
    title: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    titleStyle: Text.propTypes.style,
    activeTitleStyle: Text.propTypes.style,
    active: PropTypes.bool,
    badge: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
  };

  static defaultProps = {
    ...View.defaultProps,
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
    let {style, title, titleStyle, active, activeTitleStyle, badge, children, ...others} = this.props;

    style = [{
      paddingTop: Theme.sbBtnPaddingTop,
      paddingBottom: Theme.sbBtnPaddingBottom,
      paddingLeft: Theme.sbBtnPaddingLeft,
      paddingRight: Theme.sbBtnPaddingRight,
      overflow: 'visible',
      alignItems: 'center',
      justifyContent: 'center',
    }].concat(style);

    if (!React.isValidElement(title) && (title || title === 0)) {
      let textStyle;
      if (active) {
        textStyle = [{
          color: Theme.sbBtnActiveTitleColor,
          fontSize: Theme.sbBtnActiveTextFontSize,
        }].concat(titleStyle).concat(activeTitleStyle);
      } else {
        textStyle = [{
          color: Theme.sbBtnTitleColor,
          fontSize: Theme.sbBtnTextFontSize,
        }].concat(titleStyle);
      }
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

    children = [title, badge];

    this.props = {style, title, titleStyle, active, activeTitleStyle, badge, children, ...others};
  }

  render() {
    this.buildProps();

    return super.render();
  }
}
