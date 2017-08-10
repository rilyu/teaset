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

  buildProps() {
    let {selected, accessory, ...others} = this.props;
    accessory = selected ? 'check' : 'empty';
    this.props = {selected, accessory, ...others} ;

    super.buildProps();
  }

}

              
