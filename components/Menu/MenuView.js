// MenuView.js

'use strict';

import React, {Component} from "react";
import PropTypes from 'prop-types';
import {View, ScrollView} from 'react-native';

import Theme from 'teaset/themes/Theme';
import Overlay from '../Overlay/Overlay';
import MenuItem from './MenuItem';

export default class MenuView extends Overlay.PopoverView {

  static propTypes = {
    ...Overlay.PopoverView.propTypes,
    items: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
      icon: PropTypes.oneOfType([PropTypes.element, PropTypes.shape({uri: PropTypes.string}), PropTypes.number, PropTypes.oneOf(['none', 'empty'])]),
      onPress: PropTypes.func,
    })).isRequired,
    shadow: PropTypes.bool,
  };

  static defaultProps = {
    ...Overlay.PopoverView.defaultProps,
    direction: 'down',
    align: 'center',
    showArrow: false,
    shadow: true,
  };

  static Item = MenuItem;

  onItemPress(item) {
    this.close(false);
    item.onPress && item.onPress();
  }

  buildPopoverStyle() {
    this.defaultDirectionInsets = Theme.menuDirectionInsets;
    let {popoverStyle, arrow} = super.buildPopoverStyle();
    let menuStyle = {
      backgroundColor: Theme.menuColor,
    };
    if (this.props.shadow) {
      Object.assign(menuStyle, {
        shadowColor: Theme.menuShadowColor,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.5,
        shadowRadius: 2,
      });
    }
    popoverStyle = [menuStyle].concat(popoverStyle);
    return {popoverStyle, arrow};
  }

  renderContent() {
    let {items} = this.props;
    let iconDefault = 'none';
    for (let item of items) {
      if (item.icon) {
        iconDefault = 'empty';
        break;
      }
    }
    let list = [];
    for (let i = 0; items && i < items.length; ++i) {
      let item = items[i];
      let {title, icon} = item;
      let style = i === 0 ? {borderTopWidth: 0} : null;
      list.push(
        <this.constructor.Item
          key={'item' + i}
          style={style}
          title={title}
          icon={icon ? icon : iconDefault}
          onPress={() => this.onItemPress(item)}
          />
      );
    }
    return super.renderContent(list);
  }

}
