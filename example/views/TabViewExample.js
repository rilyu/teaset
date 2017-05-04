// TabViewExample.js

'use strict';

import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';

import {TeaNavigator, NavigationPage, BasePage, ListRow, TabView, Label, PullPicker} from 'teaset';

export default class TabViewExample extends BasePage {

  static defaultProps = {
    ...BasePage.defaultProps,
    scene: TeaNavigator.SceneConfigs.PushFromRight,
  };

  constructor(props) {
    super(props);
    Object.assign(this.state, {
      type: 'projector',
    });
  }

  renderPage() {
    return (
      <TabView style={{flex: 1}} type={this.state.type}>
        <TabView.Sheet
          title='Home'
          icon={require('../icons/home.png')}
          activeIcon={require('../icons/home_active.png')}
        >
          <HomePage type={this.state.type} onChangeType={type => this.setState({type})} />
        </TabView.Sheet>
        <TabView.Sheet
          title='Me'
          icon={require('../icons/me.png')}
          activeIcon={require('../icons/me_active.png')}
          badge={1}
        >
          <MePage />
        </TabView.Sheet>
      </TabView>
    );
  }

}

class HomePage extends NavigationPage {

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'Home',
    showBackButton: true,
  };

  selectType() {
    let {type, onChangeType} = this.props;
    let items = ['projector', 'carousel'];
    PullPicker.show(
      'Type',
      items,
      items.indexOf(this.props.type),
      (item, index) => onChangeType && onChangeType(item)
    );
  }

  renderPage() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={{height: 20}} />
        <ListRow title='Type' detail={this.props.type} onPress={() => this.selectType()} topSeparator='full' bottomSeparator='full' />
      </ScrollView>
    );
  }

}

class MePage extends NavigationPage {

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'Me',
    showBackButton: false,
  };

  renderPage() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Label type='detail' size='xl' text={this.props.title} />
      </View>
    );
  }

}
