// Overlay.js

'use strict';

import React, {Component, PropTypes} from "react";
import {View} from 'react-native';

import TopView from './TopView';
import OverlayView from './OverlayView';
import OverlayPullView from './OverlayPullView';
import OverlayPopView from './OverlayPopView';
import OverlayPopoverView from './OverlayPopoverView';

export default class Overlay {

  static View = OverlayView;
  static PullView = OverlayPullView;
  static PopView = OverlayPopView;
  static PopoverView = OverlayPopoverView;

  // base props
  //   style: View.propTypes.style,
  //   modal: PropTypes.bool,
  //   animated: PropTypes.bool,
  //   overlayOpacity: PropTypes.number,
  //   overlayPointerEvents: View.propTypes.pointerEvents,
  static show(overlayView) {
    let key;
    let onDisappearCompletedSave = overlayView.props.onDisappearCompleted;
    let element = React.cloneElement(overlayView, {
      onDisappearCompleted: () => {
        TopView.remove(key);
        onDisappearCompletedSave && onDisappearCompletedSave();
      }
    });
    key = TopView.add(element);
    return key;
  }

  static hide(key) {
    TopView.remove(key);
  }

}
