// PullPickerItem.js

'use strict';

import React, {Component, PropTypes} from "react";

import Theme from 'teaset/themes/Theme';
import ListRow from '../ListRow/ListRow';

export default class PullPickerItem extends ListRow {

  static propTypes = {
    ...ListRow.propTypes,
    selected: PropTypes.bool,
  };

  buildProps() {
    let {style, selected, accessory, ...others} = this.props;
    style = [{backgroundColor: Theme.pupItemColor}].concat(style);
    accessory = selected ? 'check' : 'empty';
    this.props = {style, selected, accessory, ...others} ;

    super.buildProps();
  }

}

              
