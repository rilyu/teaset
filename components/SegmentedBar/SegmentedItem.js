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

  buildStyle() {
    let {style} = this.props;
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
    return style;
  }

  renderTitle() {
    let {title, titleStyle, activeTitleStyle, active} = this.props;
    if (title === null || title === undefined) return null;
    else if (React.isValidElement(title)) return title;

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
    return <Text key='title' style={textStyle} numberOfLines={1}>{title}</Text>;
  }

  renderBadge() {
    let {badge, onAddWidth} = this.props;
    if (!badge) return null;
    else if (React.isValidElement(badge)) return badge;

    let badgeStyle = {
      position: 'absolute',
      right: 0,
      top: 0,
    };
    return (
      <Badge
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

  render() {
    let {style, children, title, titleStyle, activeTitleStyle, active, badge, onAddWidth, ...others} = this.props;
    return (
      <View style={this.buildStyle()} {...others}>
        {this.renderTitle()}
        {this.renderBadge()}
      </View>
    );
  }
}
