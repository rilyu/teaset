// PullPickerItem.js

'use strict';

import React, {Component} from "react";
import PropTypes from 'prop-types';

import ListRow from '../ListRow/ListRow';

export default class PullPickerItem extends ListRow {

  static propTypes = {
    ...ListRow.propTypes,
    selected: PropTypes.bool,
  };

  renderAccessory(accessory = null) {
    return super.renderAccessory(this.props.selected ? 'check' : 'empty');
  }

}

              
