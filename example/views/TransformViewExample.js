// TransformViewExample.js

'use strict';

import React, {Component} from 'react';
import {View, Image} from 'react-native';

import {Theme, NavigationPage, TransformView} from 'teaset';

export default class TransformViewExample extends NavigationPage {

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: ' TransformView',
    showBackButton: true,
  };

  renderPage() {
    return (
      <TransformView
        style={{backgroundColor: Theme.pageColor, flex: 1}}
        minScale={0.5}
        maxScale={2.5}
      >
        <Image style={{width: 375, height: 300}} resizeMode='cover' source={require('../images/teaset1.jpg')} />
      </TransformView>
    );
  }

}
