// NavigationButton.js

'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity} from 'react-native';

export default class NavigationButton extends Component {

  static propTypes = {
  };

  static defaultProps = {
    hitSlop: {top: 12, bottom: 12, left: 8, right: 8},
  };

  static contextTypes = {
    tintColor: PropTypes.string,
  };

  buildStyle() {
    let {style} = this.props;
    style = [{
      backgroundColor: 'rgba(0, 0, 0, 0)',
      paddingLeft: 6,
      paddingRight: 6,
      overflow: 'hidden',
      flexDirection: 'row',
      alignItems: 'center',
    }].concat(style);
    return style;
  }

  renderTitle() {
    return this.props.children;
  }

  render() {
    let {style, children, ...others} = this.props;
    style = this.buildStyle();
    return (
      <TouchableOpacity style={style} {...others}>
        {this.renderTitle()}
      </TouchableOpacity>
    );
  }

}
