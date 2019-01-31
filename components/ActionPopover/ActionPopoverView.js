// ActionPopoverView.js

'use strict';

import React, {Component} from "react";
import PropTypes from 'prop-types';
import {View, ScrollView} from 'react-native';

import Theme from 'teaset/themes/Theme';
import Overlay from '../Overlay/Overlay';
import ActionPopoverItem from './ActionPopoverItem';

export default class ActionPopoverView extends Overlay.PopoverView {

  static propTypes = {
    ...Overlay.PopoverView.propTypes,
    items: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      onPress: PropTypes.func,
    })).isRequired,
  };

  static defaultProps = {
    ...Overlay.PopoverView.defaultProps,
    direction: 'up',
    align: 'center',
    showArrow: true,
  };

  static Item = ActionPopoverItem;

  onItemPress(item) {
    this.close(false);
    item.onPress && item.onPress();
  }

  buildPopoverStyle() {
    this.defaultDirectionInsets = Theme.apDirectionInsets;
    let {popoverStyle, arrow} = super.buildPopoverStyle();
    popoverStyle = [{
      backgroundColor: Theme.apColor,
      paddingVertical: Theme.apPaddingVertical,
      paddingHorizontal: Theme.apPaddingHorizontal,
      borderRadius: Theme.apBorderRadius,
      flexDirection: 'row',
    }].concat(popoverStyle);
    return {popoverStyle, arrow};
  }

  renderContent() {
    let {items} = this.props;
    let list = [];
    for (let i = 0; items && i < items.length; ++i) {
      let item = items[i];
      list.push(
        <this.constructor.Item
          key={'item' + i}
          title={item.title}
          leftSeparator={i !== 0}
          onPress={() => this.onItemPress(item)}
          />
      );
    }
    return super.renderContent(list);
  }

}
