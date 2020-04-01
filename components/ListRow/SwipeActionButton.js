// SwipeActionButton.js

'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, TouchableOpacity} from 'react-native';

import Theme from 'teaset/themes/Theme';

export default class SwipeActionButton extends Component {
  
  static propTypes = {
    type: PropTypes.oneOf(['default', 'danger']),
    title: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    titleStyle: Text.propTypes.style,
  };

  static defaultProps = {
    type: 'default',
  };

  buildStyle() {
    let {style, type} = this.props;

    style = [{
      backgroundColor: type === 'danger' ? Theme.rowActionButtonDangerColor : Theme.rowActionButtonColor,
      paddingHorizontal: Theme.rowActionButtonPaddingHorizontal,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
    }].concat(style);

    return style;
  }

  renderTitle() {
    let {type, title, titleStyle, children} = this.props;
    if (React.isValidElement(title)) return title;
    else if (title === null || title === undefined) return children;
    titleStyle = [{
      color: type === 'danger' ? Theme.rowActionButtonDangerTitleColor : Theme.rowActionButtonTitleColor,
      fontSize: Theme.rowActionButtonTitleFontSize,
      overflow: 'hidden',
    }].concat(titleStyle);
    return <Text style={titleStyle} numberOfLines={1}>{title}</Text>;
  }

  render() {
    let {style, children, type, title, titleStyle, ...others} = this.props;
    return (
      <TouchableOpacity style={this.buildStyle()} {...others}>
        {this.renderTitle()}
      </TouchableOpacity>
    );
  }
}

