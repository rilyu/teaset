// SegmentedItem.js

'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ViewPropTypes} from 'react-native';

import Theme from 'teaset/themes/Theme';
import Badge from '../Badge/Badge';

export default class SegmentedItem extends Component {

  static propTypes = {
    ...ViewPropTypes,
    title: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    titleStyle: Text.propTypes.style,
    activeTitleStyle: Text.propTypes.style,
    active: PropTypes.bool,
    badge: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    onAddWidth: PropTypes.func, //(width)
  };

  static defaultProps = {
    ...View.defaultProps,
    active: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      badgeWidth: 0,
    };
  }

  buildProps() {
    let {style, title, titleStyle, active, activeTitleStyle, badge, onAddWidth, children, ...others} = this.props;
    let {badgeWidth} = this.state;

    style = [{
      paddingTop: Theme.sbBtnPaddingTop,
      paddingBottom: Theme.sbBtnPaddingBottom,
      paddingLeft: Theme.sbBtnPaddingLeft + badgeWidth / 2,
      paddingRight: Theme.sbBtnPaddingRight + badgeWidth / 2,
      overflow: 'visible',
      alignItems: 'center',
      justifyContent: 'center',
    }].concat(style);

    if (!React.isValidElement(title) && (title || title === '' || title === 0)) {
      let textStyle;
      if (active) {
        textStyle = [{
          color: Theme.sbBtnActiveTitleColor,
          fontSize: Theme.sbBtnActiveTextFontSize,
        }].concat(activeTitleStyle);
      } else {
        textStyle = [{
          color: Theme.sbBtnTitleColor,
          fontSize: Theme.sbBtnTextFontSize,
        }].concat(titleStyle);
      }
      title = <Text key='title' style={textStyle} numberOfLines={1}>{title}</Text>;
    }
    if (badge === 0) {
      badge = null;
    } else if (!React.isValidElement(badge) && badge) {
      let badgeStyle = {
        position: 'absolute',
        right: 0,
        top: 0,
      };
      badge = (
        <Badge
          key='badge'
          style={badgeStyle}
          count={badge}
          onLayout={e => {
            let {width} = e.nativeEvent.layout;
            if (width != this.state.badgeWidth) {
              this.setState({badgeWidth: width});
              onAddWidth && onAddWidth(width);
            }
          }}/>
      );
    }

    children = [title, badge];

    this.props = {style, title, titleStyle, active, activeTitleStyle, badge, children, ...others};
  }

  render() {
    this.buildProps();

    return <View {...this.props} />;
  }
}
