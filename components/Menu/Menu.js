// Menu.js

'use strict';

import React, {Component} from "react";
import {View} from 'react-native';

import Overlay from '../Overlay/Overlay';
import MenuView from './MenuView';

export default class Menu extends Overlay {

  static MenuView = MenuView;

  // fromBounds shape: x, y, width, height
  // items shape
  //   title: PropTypes.string,
  //   icon: PropTypes.oneOfType([PropTypes.element, PropTypes.shape({uri: PropTypes.string}), PropTypes.number, PropTypes.oneOf(['none', 'empty'])]),
  //   onPress: PropTypes.func,
  static show(fromBounds, items, options = {}) {
    return super.show(
      <this.MenuView fromBounds={fromBounds} items={items} {...options} />
    );
  }

}

