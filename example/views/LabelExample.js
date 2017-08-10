// LabelExample.js

'use strict';

import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';

import {NavigationPage, ListRow, Label} from 'teaset';

export default class LabelExample extends NavigationPage {

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'Label',
    showBackButton: true,
  };

  renderPage() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={{height: 20}} />
        <ListRow title='Type default' detail={<Label text='Label' />} topSeparator='full' />
        <ListRow title='Type title' detail={<Label text='Label' type='title' />} />
        <ListRow title='Type detail' detail={<Label text='Label' type='detail' />} />
        <ListRow title='Type danger' detail={<Label text='Label' type='danger' />} bottomSeparator='full' />
        <View style={{height: 20}} />
        <ListRow title='Size xs' detail={<Label text='Label' size='xs'/>} topSeparator='full' />
        <ListRow title='Size sm' detail={<Label text='Label' size='sm'/>} />
        <ListRow title='Size md' detail={<Label text='Label' size='md'/>} />
        <ListRow title='Size lg' detail={<Label text='Label' size='lg'/>} />
        <ListRow title='Size xl' detail={<Label text='Label' size='xl'/>} bottomSeparator='full' />
        <View style={{height: 20}} />
        <ListRow title='Custom' detail={<Label style={{color: '#8a6d3b', fontSize: 16}} text='Custom' />} topSeparator='full' bottomSeparator='full' />
      </ScrollView>
    );
  }

}
