// TabButton.js

'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, TouchableOpacity, ViewPropTypes} from 'react-native';

import Theme from 'teaset/themes/Theme';
import Badge from '../Badge/Badge';

export default class TabButton extends Component {
  
  static propTypes = {
    ...TouchableOpacity.propTypes,
    title: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    titleStyle: Text.propTypes.style,
    activeTitleStyle: Text.propTypes.style,
    icon: PropTypes.oneOfType([PropTypes.element, PropTypes.shape({uri: PropTypes.string}), PropTypes.number]),
    activeIcon: PropTypes.oneOfType([PropTypes.element, PropTypes.shape({uri: PropTypes.string}), PropTypes.number]),
    active: PropTypes.bool,
    iconContainerStyle: ViewPropTypes.style,
    badge: PropTypes.oneOfType([PropTypes.element, PropTypes.number]),
  };

  static defaultProps = {
    ...TouchableOpacity.defaultProps,
    active: false,
  };

  buildStyle() {
    let {style} = this.props;
    style = [{
      width: Theme.tvBarBtnWidth,
      overflow: 'visible',
      alignItems: 'center',
      justifyContent: 'center',
    }].concat(style);
    return style;
  }

  renderIcon() {
    let {icon, activeIcon, active, badge, iconContainerStyle} = this.props;
    if (active && activeIcon !== null && activeIcon !== undefined) icon = activeIcon;
    if (icon === null || icon === undefined) return icon;

    if (!React.isValidElement(icon)) {
      let iconStyle = {
        width: Theme.tvBarBtnIconSize,
        height: Theme.tvBarBtnIconSize,
        tintColor: active ? Theme.tvBarBtnIconActiveTintColor : Theme.tvBarBtnIconTintColor,
      };
      icon = <Image style={iconStyle} source={icon} />;      
    }

    iconContainerStyle = [{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }].concat(iconContainerStyle);

    return <View style={iconContainerStyle}>{icon}</View>;
  }

  renderTitle() {
    let {title, titleStyle, activeTitleStyle, active} = this.props;
    if (title === null || title === undefined || React.isValidElement(title)) return title;

    let textStyle;
    if (active) {
      textStyle = [{
        backgroundColor: 'rgba(0, 0, 0, 0)',
        color: Theme.tvBarBtnActiveTitleColor,
        fontSize: Theme.tvBarBtnActiveTextFontSize,
      }].concat(titleStyle).concat(activeTitleStyle);
    } else {
      textStyle = [{
        backgroundColor: 'rgba(0, 0, 0, 0)',
        color: Theme.tvBarBtnTitleColor,
        fontSize: Theme.tvBarBtnTextFontSize,
      }].concat(titleStyle);
    }
    return <Text style={textStyle} numberOfLines={1}>{title}</Text>;
  }

  renderBadge() {
    let {badge} = this.props;
    if (!badge || React.isValidElement(badge)) return badge;

    let badgeStyle = {
      position: 'absolute',
      right: 0,
      top: 0,
    };
    return <Badge style={badgeStyle} count={badge} />;
  }

  render() {
    let {style, children, title, titleStyle, activeTitleStyle, icon, activeIcon, active, iconContainerStyle, badge, ...others} = this.props;
    return (
      <TouchableOpacity style={this.buildStyle()} {...others}>
        {this.renderIcon()}
        {this.renderTitle()}
        {this.renderBadge()}
      </TouchableOpacity>
    );
  }
}

