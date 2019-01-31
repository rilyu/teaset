// PopoverPickerView.js

'use strict';

import React, {Component} from "react";
import PropTypes from 'prop-types';
import {View, ScrollView} from 'react-native';

import Theme from 'teaset/themes/Theme';
import Overlay from '../Overlay/Overlay';
import PopoverPickerItem from './PopoverPickerItem';

export default class PopoverPickerView extends Overlay.PopoverView {

  static propTypes = {
    ...Overlay.PopoverView.propTypes,
    items: PropTypes.array.isRequired,
    selectedIndex: PropTypes.number,
    getItemText: PropTypes.func, //(item, index) return display text of item, item=items[index], use item when it's null
    shadow: PropTypes.bool,
    onSelected: PropTypes.func, //(item, index)
  };

  static defaultProps = {
    ...Overlay.PopoverView.defaultProps,
    direction: 'down',
    align: 'center',
    showArrow: false,
    shadow: true,
  };

  static Item = PopoverPickerItem;

  onItemPress(itemIndex) {
    let {items, onSelected} = this.props;
    this.close(false);
    onSelected && onSelected(items[itemIndex], itemIndex);
  }

  buildPopoverStyle() {
    let {shadow, items, selectedIndex, getItemText} = this.props;

    let pickerStyle = {
      backgroundColor: Theme.poppColor,
      minWidth: Theme.poppMinWidth,
      maxWidth: Theme.poppMaxWidth,
      minHeight: Theme.poppMinHeight,
      maxHeight: Theme.poppMaxHeight,
    };
    if (shadow) {
      Object.assign(pickerStyle, {
        shadowColor: Theme.poppShadowColor,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.5,
        shadowRadius: 2,
      });
    }

    this.defaultDirectionInsets = Theme.poppDirectionInsets;
    let {popoverStyle, arrow} = super.buildPopoverStyle();
    popoverStyle = [pickerStyle].concat(popoverStyle);
    return {popoverStyle, arrow};
  }

  renderContent() {
    let {items, selectedIndex, getItemText} = this.props;
    return super.renderContent(
      <ScrollView>
        {items && items.map((item, index) => (
          <this.constructor.Item
            key={'item' + index}
            title={getItemText ? getItemText(item, index) : item}
            selected={index === selectedIndex}
            onPress={() => this.onItemPress(index)}
            />
        ))}
      </ScrollView>
    );
  }

}
