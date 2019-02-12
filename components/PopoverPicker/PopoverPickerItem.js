// PopoverPickerItem.js

'use strict';

import React, {Component} from "react";
import PropTypes from 'prop-types';
import {View, Text, Image, TouchableOpacity} from 'react-native';

import Theme from 'teaset/themes/Theme';

export default class PopoverPickerItem extends Component {

  static propTypes = {
    ...TouchableOpacity.propTypes,
    title: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    selected: PropTypes.bool,
  };

  buildStyle() {
    let {style} = this.props;
    style = [{
      backgroundColor: Theme.poppItemColor,
      paddingLeft: Theme.poppItemPaddingLeft,
      paddingRight: Theme.poppItemPaddingRight,
      paddingTop: Theme.poppItemPaddingTop,
      paddingBottom: Theme.poppItemPaddingBottom,      
      borderColor: Theme.poppItemSeparatorColor,
      borderBottomWidth: Theme.poppItemSeparatorWidth,
      flexDirection: 'row',
      alignItems: 'center',
    }].concat(style);
    return style;
  }

  renderTitle() {
    let {title} = this.props;
    if (typeof title === 'string' || typeof title === 'number') {
      let titleStyle = {
        color: Theme.poppItemTitleColor,
        fontSize: Theme.poppItemFontSize,
        overflow: 'hidden',
        flexGrow: 1,
        flexShrink: 1,
      };
      title = <Text style={titleStyle} numberOfLines={1}>{title}</Text>
    }
    return title;
  }

  renderAccessory() {
    let {accessory, selected} = this.props;
    let imageStyle = {
      width: Theme.poppAccessoryWidth,
      height: Theme.poppAccessoryHeight,
      tintColor: Theme.poppAccessoryCheckColor,
    };
    return (
      <View style={{paddingLeft: Theme.poppAccessoryPaddingLeft}}>
        <Image style={imageStyle} source={selected ? require('../../icons/check.png') : require('../../icons/empty.png')} />
      </View>
    );
  }

  render() {
    let {style, children, title, selected, ...others} = this.props;
    return (
      <TouchableOpacity style={this.buildStyle()} {...others}>
        {this.renderTitle()}
        {this.renderAccessory()}
      </TouchableOpacity>
    );
  }
}

