// Projector.js

'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, ViewPropTypes} from 'react-native';

import Theme from 'teaset/themes/Theme';

export default class Projector extends Component {

  static propTypes = {
    ...ViewPropTypes,
    index: PropTypes.number,
    slideStyle: ViewPropTypes.style,
  };

  static defaultProps = {
    ...View.defaultProps,
    index: 0,
  };

  render() {
    let {index, slideStyle, children, ...others} = this.props;
    if (!(children instanceof Array)) {
      if (children) children = [children];
      else children = [];
    }
    if (!this.slideShowns || this.slideShowns.length !== children.length) {
      this.slideShowns = children.map(item => false);
    }
    return (
      <View {...others}>
        {children.map((item, i) => {
          let active = (i == index);
          if (active) this.slideShowns[i] = true;
          let renderSlideStyle = [slideStyle, styles.slide, {opacity: active ? 1 : 0}]; 
          return (
            <View key={i} style={renderSlideStyle} pointerEvents={active ? 'auto' : 'none'}>
              {this.slideShowns[i] ? item : null}
            </View>
          );
        })}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  slide: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
