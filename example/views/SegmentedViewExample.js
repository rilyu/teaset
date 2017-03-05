// SegmentedViewExample.js

'use strict';

import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';

import {NavigationPage, ListRow, SegmentedView, Label, PullPicker} from 'teaset';

export default class SegmentedViewExample extends NavigationPage {

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'SegmentedView',
    showBackButton: true,
  };

  constructor(props) {
    super(props);
    this.items = ['projector', 'carousel'];
    Object.assign(this.state, {
      type: 'projector',
    });
  }

  selectType() {
    PullPicker.show(
      'Type',
      this.items,
      this.items.indexOf(this.state.type),
      (item, index) => this.setState({type: item})
    );
  }

  renderPage() {
    return (
      <View style={{flex: 1}}>
        <SegmentedView style={{flex: 1}} type={this.state.type}>
          <SegmentedView.Sheet title='one'>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Label type='detail' size='xl' text='Segment one' />
            </View>
          </SegmentedView.Sheet>
          <SegmentedView.Sheet title='two'>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Label type='detail' size='xl' text='Segment two' />
            </View>
          </SegmentedView.Sheet>
          <SegmentedView.Sheet title='three'>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Label type='detail' size='xl' text='Segment three' />
            </View>
          </SegmentedView.Sheet>
        </SegmentedView>
        <View style={{height: 20}} />
        <ListRow title='Type' detail={this.state.type} onPress={() => this.selectType()} topSeparator='full' bottomSeparator='full' />
      </View>
    );
  }

}
