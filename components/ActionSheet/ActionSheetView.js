// ActionSheetView.js

'use strict';

import React, {Component} from "react";
import PropTypes from 'prop-types';
import {View} from 'react-native';

import Theme from 'teaset/themes/Theme';
import Overlay from '../Overlay/Overlay';
import ActionSheetItem from './ActionSheetItem';

export default class ActionSheetView extends Overlay.PullView {

  static propTypes = {
    ...Overlay.PullView.propTypes,
    items: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]).isRequired,
      onPress: PropTypes.func,
      disabled: PropTypes.bool,
    })),
    cancelItem: PropTypes.shape({
      title: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]).isRequired,
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

  renderContent() {
    let {items, cancelItem} = this.props;

    let list = [];
    for (let i = 0; items && i < items.length; ++i) {
      let item = items[i];
      list.push(
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
      list.push(
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
    list.push(
      <View
        style={{
          backgroundColor: cancelItem ? Theme.asCancelItemColor : Theme.asItemColor,
          height: Theme.screenInset.bottom
        }}
        key={'bottomSpace'}
        />
    );

    return super.renderContent(list);
  }

}

