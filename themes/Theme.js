// Theme.js

'use strict';

import {Platform, Dimensions, NativeModules, DeviceInfo, StatusBar} from 'react-native';

import ThemeDefault from './ThemeDefault';
import ThemeBlack from './ThemeBlack';
import ThemeViolet from './ThemeViolet';

// See https://mydevice.io/devices/ for device dimensions
const X_WIDTH = 375;
const X_HEIGHT = 812;
const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;
const PAD_WIDTH = 768;
const PAD_HEIGHT = 1024;
const IPHONE12_WIDTH = 390;
const IPHONE12_HEIGHT = 844;

const {width: D_WIDTH, height: D_HEIGHT} = Dimensions.get('window');

const { PlatformConstants = {} } = NativeModules;
const { minor = 0 } = PlatformConstants.reactNativeVersion || {};

const isIPhoneX = (() => {
  if (Platform.OS === 'web') return false;

  return (
    Platform.OS === 'ios' &&
    ((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) ||
      (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT)) ||
    ((D_HEIGHT === XSMAX_HEIGHT && D_WIDTH === XSMAX_WIDTH) ||
      (D_HEIGHT === XSMAX_WIDTH && D_WIDTH === XSMAX_HEIGHT)) ||
      ((D_HEIGHT === IPHONE12_HEIGHT && D_WIDTH === IPHONE12_WIDTH) ||
        (D_HEIGHT === IPHONE12_WIDTH && D_WIDTH === IPHONE12_HEIGHT))
  );
})();

const isIPad = (() => {
  if (Platform.OS !== 'ios' || isIPhoneX) return false;

  // if portrait and width is smaller than iPad width
  if (D_HEIGHT > D_WIDTH && D_WIDTH < PAD_WIDTH) {
    return false;
  }

  // if landscape and height is smaller that iPad height
  if (D_WIDTH > D_HEIGHT && D_HEIGHT < PAD_WIDTH) {
    return false;
  }

  return true;
})();


const Theme = {

  themes: {
    default: ThemeDefault,
    black: ThemeBlack,
    violet: ThemeViolet,
  },

  set: function(theme) {
    Object.assign(this, theme);
  },

  isPad: isIPad,

  isIPhoneX: isIPhoneX,

  fitIPhoneX: true,

  get isLandscape() {
    return Dimensions.get('window').width > Dimensions.get('window').height;
  },

  get statusBarHeight() {
    if (Platform.OS === 'ios') {
      if (this.isIPhoneX) return this.isLandscape ? 0 : (this.fitIPhoneX ? 44 : 20);
      if (this.isPad) return 20;
    } else if (Platform.OS === 'android') {
      if (Platform.Version > 20) return StatusBar.currentHeight; //translucent StatusBar is required
      return 0;
    }
    return this.isLandscape ? 0 : 20;
  },

  get screenInset() {
    let isLandscape = this.isLandscape;
    let isIPhoneX = this.isIPhoneX;
    let fitIPhoneX = this.fitIPhoneX;
    return ({
      left: isLandscape && isIPhoneX && fitIPhoneX ? 44 : 0,
      right: isLandscape && isIPhoneX && fitIPhoneX ? 44 : 0,
      top: this.statusBarHeight,
      bottom: isIPhoneX && fitIPhoneX ? (isLandscape ? 24 : 34) : 0,
    });
  },

};

Theme.set(ThemeDefault);

module.exports = Theme;
