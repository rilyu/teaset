// Theme.js

'use strict';

import ThemeDefault from './ThemeDefault';
import ThemeBlack from './ThemeBlack';
import ThemeViolet from './ThemeViolet';

var Theme = {

  themes: {
    default: ThemeDefault,
    black: ThemeBlack,
    violet: ThemeViolet,
  },

  set: function(theme) {
    Object.assign(this, theme);
  },

};

Theme.set(ThemeDefault);

module.exports = Theme;
