// PullPickerView.js

'use strict';

import React, {Component} from "react";
import PropTypes from 'prop-types';
import {View, ScrollView} from 'react-native';

import Theme from 'teaset/themes/Theme';
import Overlay from '../Overlay/Overlay';
import Label from '../Label/Label';
import PullPickerItem from './PullPickerItem';

export default class PullPickerView extends Overlay.PullView {

  static propTypes = {
    ...Overlay.PullView.propTypes,
    title: PropTypes.string,
    items: PropTypes.array.isRequired,
    selectedIndex: PropTypes.number,
    getItemText: PropTypes.func, //(item, index) return display text of item, item=items[index], use item when it's null
    onSelected: PropTypes.func, //(item, index)
  };

  static Item = PullPickerItem;

  onItemPress(itemIndex) {
    let {items, onSelected} = this.props;
    this.close(false);
    onSelected && onSelected(items[itemIndex], itemIndex);
  }

  buildProps() {
    super.buildProps();

    let {title, items, selectedIndex, getItemText, children, ...others} = this.props;

    let headerRowStyle = {
      backgroundColor: Theme.pupHeaderColor,
      paddingLeft: Theme.pupHeaderPaddingLeft,
      paddingRight: Theme.pupHeaderPaddingRight,
      paddingTop: Theme.pupHeaderPaddingTop,
      paddingBottom: Theme.pupHeaderPaddingBottom
    };
    let headerTextStyle = {
      color: Theme.pupHeaderTitleColor,
      fontSize: Theme.pupHeaderFontSize,
      fontWeight: Theme.pupHeaderFontWeight,
    }
    let headerSeparatorStyle = {
      backgroundColor: Theme.pupHeaderSeparatorColor,
      height: Theme.pupHeaderSeparatorHeight,
    }
    let {left: leftInset, right: rightInset} = Theme.screenInset;
    children = (
      <View style={{backgroundColor: Theme.pupColor, maxHeight: Theme.pupMaxHeight, paddingLeft: leftInset, paddingRight: rightInset}}>
        {!title ? null :
          <View style={headerRowStyle}>
            <Label style={headerTextStyle} text={title} />
          </View>
        }
        {!title ? null : <View style={headerSeparatorStyle} />}
        <ScrollView style={{backgroundColor: Theme.pupColor, flexGrow: 1}}>
          {items && items.map((item, index) => (
            <this.constructor.Item
              key={'item' + index}
              style={{backgroundColor: Theme.pupItemColor}}
              title={getItemText ? getItemText(item, index) : item}
              selected={index === selectedIndex}
              bottomSeparator={<View style={{backgroundColor: Theme.pupSeparatorColor, height: Theme.rowSeparatorLineWidth}} />}
              onPress={() => this.onItemPress(index)}
              />
          ))}
          <View style={{height: Theme.screenInset.bottom}} />
        </ScrollView>
      </View>
    );

    this.props = {title, items, selectedIndex, getItemText, children, ...others};
  }

}

