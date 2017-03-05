// ActionSheet.js

'use strict';

import React, {Component, PropTypes} from "react";
import {View} from 'react-native';

import Overlay from '../Overlay/Overlay';
import ActionSheetView from './ActionSheetView';

export default class ActionSheet extends Overlay {

  static ActionSheetView = ActionSheetView;

  // items and cancelItem shape
  //   title: PropTypes.string.isRequired,
  //   onPress: PropTypes.func,
  //   disabled: PropTypes.bool,
  static show(items, cancelItem, options = {}) {
    return super.show(
      <this.ActionSheetView items={items} cancelItem={cancelItem} {...options} />
    );
  }

}

