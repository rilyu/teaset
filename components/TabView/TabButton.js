// TabButton.js

'use strict';

import React, {Component, PropTypes} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

import Theme from 'teaset/themes/Theme';
import Badge from '../Badge/Badge';

export default class TabButton extends Component {
  
  static propTypes = {
    ...TouchableOpacity.propTypes,
    title: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    icon: PropTypes.oneOfType([PropTypes.element, PropTypes.shape({uri: PropTypes.string}), PropTypes.number]),
    activeIcon: PropTypes.oneOfType([PropTypes.element, PropTypes.shape({uri: PropTypes.string}), PropTypes.number]),
    active: PropTypes.bool,
    badge: PropTypes.oneOfType([PropTypes.element, PropTypes.number]),
  };

  static defaultProps = {
    ...TouchableOpacity.defaultProps,
    active: false,
  };

  buildProps() {
    let {style, title, icon, activeIcon, active, badge, ...others} = this.props;

    style = [{
      width: Theme.tvBarBtnWidth,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
    }].concat(style);

    if (!React.isValidElement(title) && (title || title === 0)) {
      let textStyle = {
        color: active ? Theme.tvBarBtnActiveTitleColor : Theme.tvBarBtnTitleColor,
        fontSize: Theme.tvBarBtnTextFontSize,
      };
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

    this.props = {style, title, icon, activeIcon, active, badge, ...others};
  }

  render() {
    this.buildProps();

    let {title, icon, activeIcon, active, badge, ...others} = this.props;
    let useIcon = active ? activeIcon : icon;
    return (
      <TouchableOpacity {...others}>
        {!useIcon ? null :
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            {useIcon}
          </View>
        }
        {title}
        {badge}
      </TouchableOpacity>
    );
  }
}
