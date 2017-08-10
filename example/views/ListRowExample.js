// ListRowExample.js

'use strict';

import React, {Component} from 'react';
import {View, ScrollView, Image, Text} from 'react-native';

import {NavigationPage, ListRow, Label} from 'teaset';

export default class ListRowExample extends NavigationPage {

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: ' ListRow',
    showBackButton: true,
  };

  constructor(props) {
    super(props);
  }

  renderPage() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={{height: 20}} />
        <ListRow title='Title' detail='Detail' topSeparator='full' />
        <ListRow title={<Label style={{fontSize: 18, color: '#31708f'}} text='Custom title' />} />
        <ListRow title='Custom detail' detail={
          <View style={{backgroundColor: '#5bc0de', width: 60, height: 24, borderRadius: 4}} />
        } />
        <ListRow title='Long detail' detail={
          'React Native enables you to build world-class application experiences on native platforms using a consistent developer experience based on JavaScript and React.'
        } />
        <ListRow title='Title place top' detail={
          'React Native enables you to build world-class application experiences on native platforms using a consistent developer experience based on JavaScript and React.'
        } titlePlace='top' />
        <ListRow title='Icon' icon={require('../icons/config.png')} />
        <ListRow title='Accessory indicator' accessory='indicator' />
        <ListRow title='Custom accessory' accessory={<Image source={require('../icons/location.png')} />} />
        <ListRow title='Press able' onPress={() => alert('Press!')} />
        <ListRow
          title='Swipe able'
          detail='Swipe to show action buttons'
          swipeActions={[
            <ListRow.SwipeActionButton title='Cancel' />,
            <ListRow.SwipeActionButton title='Remove' type='danger' onPress={() => alert('Remove')}/>,          
          ]}
          bottomSeparator='full'
          />
      </ScrollView>
    );
  }

}
