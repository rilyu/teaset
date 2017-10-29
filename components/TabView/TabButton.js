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

  buildProps() {
    let {style, title, titleStyle, activeTitleStyle, icon, activeIcon, active, badge, iconContainerStyle, ...others} = this.props;

    style = [{
      width: Theme.tvBarBtnWidth,
      overflow: 'visible',
      alignItems: 'center',
      justifyContent: 'center',
    }].concat(style);

    if (!React.isValidElement(title) && (title || title === '' || title === 0)) {
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
      title = <Text style={textStyle} numberOfLines={1}>{title}</Text>;
    }

    if (!activeIcon && activeIcon !== 0) activeIcon = icon;

    if (!React.isValidElement(icon) && (icon || icon === 0)) {
      let iconStyle = {
        width: Theme.tvBarBtnIconSize,
        height: Theme.tvBarBtnIconSize,
        tintColor: Theme.tvBarBtnIconTintColor,
      };
      icon = <Image style={iconStyle} source={icon} />
    }

    if (!React.isValidElement(activeIcon) && (activeIcon || activeIcon === 0)) {
      let iconStyle = {
        width: Theme.tvBarBtnIconSize,
        height: Theme.tvBarBtnIconSize,
        tintColor: Theme.tvBarBtnIconActiveTintColor,
      };
      activeIcon = <Image style={iconStyle} source={activeIcon} />
    }

    if (!React.isValidElement(badge) && badge) {
      let badgeStyle = {
        position: 'absolute',
        right: 0,
        top: 0,
      };
      badge = <Badge style={badgeStyle} count={badge} />;
    }

    iconContainerStyle = [{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }].concat(iconContainerStyle);

    this.props = {style, title, titleStyle, activeTitleStyle, icon, activeIcon, active, badge, iconContainerStyle, ...others};
  }

  render() {
    this.buildProps();

    let {title, icon, activeIcon, active, badge, iconContainerStyle, ...others} = this.props;
    let useIcon = active ? activeIcon : icon;
    return (
      <TouchableOpacity {...others}>
        {!useIcon ? null :
          <View style={iconContainerStyle}>
            {useIcon}
          </View>
        }
        {title}
        {badge}
      </TouchableOpacity>
    );
  }
}
