// PullPicker.js

'use strict';

import React, {Component, PropTypes} from "react";
import {View} from 'react-native';

import Overlay from '../Overlay/Overlay';
import PullPickerView from './PullPickerView';

export default class PullPicker extends Overlay {

  static PullPickerView = PullPickerView;

  // items: array of string
  static show(title, items, selectedIndex, onSelected, options = {}) {
    return super.show(
      <this.PullPickerView
        title={title}
        items={items}
        selectedIndex={selectedIndex}
        onSelected={onSelected}
        {...options}
        />
    );
  }

}

