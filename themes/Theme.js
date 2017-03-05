// Theme.js

'use strict';

import ThemeDefault from './ThemeDefault';

var Theme = {
  set: function(theme) {
    Object.assign(this, theme);
  }
};

Theme.set(ThemeDefault);

module.exports = Theme;
