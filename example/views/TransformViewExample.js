// TransformViewExample.js

'use strict';

import React, {Component, PropTypes} from 'react';
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
        style={{backgroundColor: Theme.pageColor, flex: 1, alignItems: 'center', justifyContent: 'center'}}
        minScale={0.5}
        maxScale={2}
        magnetic={true}
      >
        <Image style={{width: 375, height: 300}} resizeMode='cover' source={require('../images/teaset1.jpg')} />
      </TransformView>
    );
  }

}
