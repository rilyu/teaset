// ActionSheetView.js

'use strict';

import React, {Component, PropTypes} from "react";
import {View} from 'react-native';

import Overlay from '../Overlay/Overlay';
import ActionSheetItem from './ActionSheetItem';

export default class ActionSheetView extends Overlay.PullView {

  static propTypes = {
    ...Overlay.PullView.propTypes,
    items: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      onPress: PropTypes.func,
      disabled: PropTypes.bool,
    })),
    cancelItem: PropTypes.shape({
      title: PropTypes.string.isRequired,
      onPress: PropTypes.func,
      disabled: PropTypes.bool,
    }),
  };

  static Item = ActionSheetItem;

  disappearCompleted() {
    super.disappearCompleted();
    this.pressItem && this.pressItem.onPress && this.pressItem.onPress();
  }

  onItemPress(item) {
    if (item && item.disabled) return;
    this.pressItem = item;
    this.close(false);
  }

  onCancelItemPress() {
    let {cancelItem} = this.props;
    if (cancelItem && cancelItem.disabled) return;
    this.pressItem = cancelItem;
    this.close(true);
  }

  buildProps() {
    super.buildProps();

    let {items, cancelItem, children, ...others} = this.props;

    children = [];
    for (let i = 0; items && i < items.length; ++i) {
      let item = items[i];
      children.push(
        <this.constructor.Item
          key={'item' + i}
          title={item.title}
          topSeparator={i === 0 ? 'none' : 'full'}
          disabled={item.disabled}
          onPress={() => this.onItemPress(item)}
          />
      );
    }
    if (cancelItem) {
      children.push(
        <this.constructor.Item
          key={'cancelItem'}
          type='cancel'
          title={cancelItem.title}
          topSeparator='full'
          disabled={cancelItem.disabled}
          onPress={() => this.onCancelItemPress()}
          />
      );
    }

    this.props = {items, cancelItem, children, ...others};
  }

}

