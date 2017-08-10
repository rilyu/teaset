// Drawer.js

'use strict';

import React, {Component} from "react";
import {View} from 'react-native';

import Overlay from '../Overlay/Overlay';

export default class Drawer extends Overlay {

  static DrawerView = Overlay.PullView;

  static open(view, side = 'left', rootTransform = 'none', options = {}) {
    let drawer;
    let key = super.show(
      <this.DrawerView side={side} rootTransform={rootTransform} {...options} ref={v => drawer = v}>
        {view}
      </this.DrawerView>
    );
    return {
      key: key,
      close: function(animated) {
        drawer && drawer.close(animated);
      },
    };
  }

}

