// Toast.js

'use strict';

import React, {Component, PropTypes} from "react";
import {View} from 'react-native';

import Overlay from '../Overlay/Overlay';
import ToastView from './ToastView';

export default class Toast extends Overlay {

  static ToastView = ToastView;
  static defaultDuration = 'short';
  static defaultPosition = 'center';
  static messageDefaultDuration = 'short';
  static messageDefaultPosition = 'bottom';

  // options shape
  //   text: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
  //   icon: PropTypes.oneOfType([
  //     PropTypes.element,
  //     PropTypes.shape({uri: PropTypes.string}), //{uri: 'http://...'}
  //     PropTypes.number, //require('path/to/image')
  //     PropTypes.oneOf(['none', 'success', 'fail', 'smile', 'sad', 'info', 'stop']),
  //   ]),
  //   position: PropTypes.oneOf(['top', 'bottom', 'center']),
  //   duration: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['short', 'long'])]),
  static show(options) {
    let {duration, ...others} = options && typeof options === 'object' ? options : {};    

    let key = super.show(<this.ToastView {...others} />);
    if (typeof duration !== 'number') {
      switch (duration) {
        case 'long': duration = 3500; break;
        default: duration = 2000; break;
      }
    }
    setTimeout(() => this.hide(key), duration);

    return key;
  }

  static message(text, duration = this.messageDefaultDuration, position = this.messageDefaultPosition) {
    return this.show({text, duration, position});
  }

  static success(text, duration = this.defaultDuration, position = this.defaultPosition) {
    return this.show({text, duration, position, icon: 'success'});
  }

  static fail(text, duration = this.defaultDuration, position = this.defaultPosition) {
    return this.show({text, duration, position, icon: 'fail'});
  }

  static smile(text, duration = this.defaultDuration, position = this.defaultPosition) {
    return this.show({text, duration, position, icon: 'smile'});
  }

  static sad(text, duration = this.defaultDuration, position = this.defaultPosition) {
    return this.show({text, duration, position, icon: 'sad'});
  }

  static info(text, duration = this.defaultDuration, position = this.defaultPosition) {
    return this.show({text, duration, position, icon: 'info'});
  }

  static stop(text, duration = this.defaultDuration, position = this.defaultPosition) {
    return this.show({text, duration, position, icon: 'stop'});
  }

}
