// ActionPopover.js

'use strict';

import React, {Component} from "react";
import {View} from 'react-native';

import Overlay from '../Overlay/Overlay';
import ActionPopoverView from './ActionPopoverView';

export default class ActionPopover extends Overlay {

  static ActionPopoverView = ActionPopoverView;

  // fromBounds shape: x, y, width, height
  // items shape
  //   title: PropTypes.string.isRequired,
  //   onPress: PropTypes.func,
  static show(fromBounds, items, options = {}) {
    return super.show(
      <this.ActionPopoverView fromBounds={fromBounds} items={items} {...options} />
    );
  }

}

