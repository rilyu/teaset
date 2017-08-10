// ModalIndicatorExample.js

'use strict';

import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';

import {NavigationPage, ListRow, ModalIndicator} from 'teaset';

export default class ModalIndicatorExample extends NavigationPage {

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'ModalIndicator',
    showBackButton: true,
  };

  show() {
    let secs = 5;
    ModalIndicator.show(`Close after ${secs} sec(s)`);
    let timer = setInterval(() => {
      secs--;
      ModalIndicator.show(`Close after ${secs} sec(s)`);
      if (secs < 0) {
        clearInterval(timer);
        ModalIndicator.hide();
      }
    }, 1000);
  }

  renderPage() {
    let img = require('../images/faircup.jpg');
    return (
      <ScrollView style={{flex: 1}}>
        <View style={{height: 20}} />
        <ListRow title='Show' onPress={() => this.show()} topSeparator='full' bottomSeparator='full' />
      </ScrollView>
    );
  }

}
