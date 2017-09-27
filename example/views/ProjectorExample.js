// ProjectorExample.js

'use strict';

import React, {Component} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';

import {NavigationPage, ListRow, Projector, Button, Label, Input} from 'teaset';

export default class ProjectorExample extends NavigationPage {

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'Projector',
    showBackButton: true,
  };

  constructor(props) {
    super(props);
    Object.assign(this.state, {
      index: 0,
    });
  }

  renderSlide(color) {
    return (
      <View style={{backgroundColor: color, padding: 30, flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Label text='Enter something' />
        <View style={{height: 12}} />
        <View><Input style={{backgroundColor: 'rgba(255, 255, 255, 0.3)', width: 200}} /></View>
      </View>
    );
  }

  renderButton(i) {
    return (
      <Button
        title={i}
        type={this.state.index == i ? 'primary' : 'default'}
        onPress={() => this.setState({index: i})}
        />
    );
  }

  renderPage() {
    return (
      <ScrollView style={{flex: 1}}>
        <Projector style={{height: 238}} index={this.state.index}>
          {this.renderSlide('rgba(170, 240, 141, 0.1)')}
          {this.renderSlide('rgba(123, 207, 249, 0.1)')}
          {this.renderSlide('rgba(250, 231, 133, 0.1)')}
          {this.renderSlide('rgba(244, 131, 131, 0.1)')}
        </Projector>
        <View style={{height: 20}} />
        <ListRow
          title='Slide no'
          detail={
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
              {this.renderButton(0)}
              {this.renderButton(1)}
              {this.renderButton(2)}
              {this.renderButton(3)}
            </View>
          }
          topSeparator='full'
          bottomSeparator='full'
          />
      </ScrollView>
    );
  }

}
