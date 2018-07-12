// NavigationTitle.js

'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text} from 'react-native';

import Theme from 'teaset/themes/Theme';

export default class NavigationTitle extends Component {

  static propTypes = {
    ...Text.propTypes,
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  static defaultProps = {
    ...Text.defaultProps,
    numberOfLines: 1,
    allowFontScaling: false,
  };

  static contextTypes = {
    tintColor: PropTypes.string,
  };

  buildProps() {
    let {style, text, children, ...others} = this.props;

    style = [{
      flex: 1,
      paddingLeft: 4,
      paddingRight: 4,
      textAlign: 'center',
      overflow: 'hidden',
      color: this.context.tintColor,
      fontSize: Theme.navTitleFontSize,
    }].concat(style);

    if (text || text === '' || text === 0) children = text;

    return {style, text, children, ...others};
  }

  render() {
    let props = this.buildProps();
    return (
      <Text {...props} />
    );
  }

}
