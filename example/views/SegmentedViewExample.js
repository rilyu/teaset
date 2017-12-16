// SegmentedViewExample.js

'use strict';

import React, {Component} from 'react';
import {StyleSheet, View, Image, ScrollView, Switch} from 'react-native';

import {Theme, NavigationPage, ListRow, SegmentedView, Label, PullPicker} from 'teaset';

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
      custom: false,
      activeIndex: 0,
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

  renderTitle(index) {
    let titles = ['One', 'Two', 'Three'];
    let {custom, activeIndex} = this.state;
    if (!custom) return titles[index];

    let icons = [
      require('../icons/home.png'),
      require('../icons/store.png'),
      require('../icons/me.png'),
    ];
    let activeIcons = [
      require('../icons/home_active.png'),
      require('../icons/store_active.png'),
      require('../icons/me_active.png'),
    ];
    let isActive = index == activeIndex;
    let tintColor = isActive ? Theme.primaryColor : '#989898';

    return (
      <View style={{alignItems: 'center'}} key={index}>
        <Image
          style={{width: 20, height: 20, tintColor}}
          source={isActive ? activeIcons[index] : icons[index]}
          />
        <Label style={{color: tintColor, paddingTop: 4}} text={titles[index]} />
      </View>
    );
  }

  renderPage() {
    let {custom} = this.state;
    return (
      <View style={{flex: 1}}>
        <SegmentedView
          style={{flex: 1}}
          type={this.state.type}
          indicatorLineColor={custom ? '#5cb85c' : undefined}
          indicatorLineWidth={custom ? 1 : undefined}
          indicatorPositionPadding={custom ? 3 : undefined}
          activeIndex={this.state.activeIndex}
          onChange={index => this.setState({activeIndex: index})}
        >
          <SegmentedView.Sheet title={this.renderTitle(0)}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Label type='detail' size='xl' text='Segment one' />
            </View>
          </SegmentedView.Sheet>
          <SegmentedView.Sheet title={this.renderTitle(1)}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Label type='detail' size='xl' text='Segment two' />
            </View>
          </SegmentedView.Sheet>
          <SegmentedView.Sheet title={this.renderTitle(2)}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Label type='detail' size='xl' text='Segment three' />
            </View>
          </SegmentedView.Sheet>
        </SegmentedView>
        <View style={{height: 20}} />
        <ListRow
          title='Type'
          detail={this.state.type}
          onPress={() => this.selectType()}
          topSeparator='full'
          />
        <ListRow
          title='Custom'
          detail={<Switch value={this.state.custom} onValueChange={value => this.setState({custom: value})} />}
          bottomSeparator='full'
          />
        <View style={{height: Theme.screenInset.bottom}} />
      </View>
    );
  }

}
