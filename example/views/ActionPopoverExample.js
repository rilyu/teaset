// ActionPopoverExample.js

'use strict';

import React, {Component} from 'react';
import {View} from 'react-native';

import {NavigationPage, ActionPopover, Button} from 'teaset';

export default class ActionPopoverExample extends NavigationPage {

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'ActionPopover',
    showBackButton: true,
  };

  show(view) {
    view.measure((x, y, width, height, pageX, pageY) => {
      let items = [
        {title: 'Copy', onPress: () => alert('Copy')},
        {title: 'Remove', onPress: () => alert('Remove')},
        {title: 'Share', onPress: () => alert('Share')},
      ];
      ActionPopover.show({x: pageX, y: pageY, width, height}, items);
    });
  }

  renderPage() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button title='Show' ref='apButton' onPress={() => this.show(this.refs['apButton'])} />
      </View>
    );
  }

}
