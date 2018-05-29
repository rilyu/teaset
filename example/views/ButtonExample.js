// ButtonExample.js

'use strict';

import React, {Component} from 'react';
import {View, ScrollView, Text, Image} from 'react-native';

import {NavigationPage, ListRow, Button, Label, Theme} from 'teaset';

export default class ButtonExample extends NavigationPage {

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'Button',
    showBackButton: true,
  };

  renderPage() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={{height: 20}} />
        <ListRow title='Type default' detail={<Button title='Button' />} topSeparator='full' />
        <ListRow title='Type primary' detail={<Button title='Button' type='primary' />} />
        <ListRow title='Type secondary' detail={<Button title='Button' type='secondary' />} />
        <ListRow title='Type danger' detail={<Button title='Button' type='danger' />} />
        <ListRow title='Type link' detail={<Button title='Button' type='link' />} bottomSeparator='full' />
        <View style={{height: 20}} />
        <ListRow title='Size xs' detail={<Button title='Button' size='xs'/>} topSeparator='full' />
        <ListRow title='Size sm' detail={<Button title='Button' size='sm'/>} />
        <ListRow title='Size md' detail={<Button title='Button' size='md'/>} />
        <ListRow title='Size lg' detail={<Button title='Button' size='lg'/>} />
        <ListRow title='Size xl' detail={<Button title='Button' size='xl'/>} bottomSeparator='full' />
        <View style={{height: 20}} />
        <ListRow title='Type default disabled' detail={<Button title='Button' disabled={true} />} topSeparator='full' />
        <ListRow title='Type primary disabled' detail={<Button title='Button' type='primary' disabled={true} />} />
        <ListRow title='Type secondary disabled' detail={<Button title='Button' type='secondary' disabled={true} />} />
        <ListRow title='Type danger disabled' detail={<Button title='Button' type='danger' disabled={true} />} />
        <ListRow title='Type link disabled' detail={<Button title='Button' type='link' disabled={true} />} bottomSeparator='full' />
        <View style={{height: 20}} />
        <ListRow title='Custom' detail={
          <Button style={{backgroundColor: '#rgba(238, 169, 91, 0.1)', borderColor: '#8a6d3b'}}>
            <Image style={{width: 16, height: 16, tintColor: '#8a6d3b'}} source={require('../icons/search.png')} />
            <Label style={{color: '#8a6d3b', fontSize: 16, paddingLeft: 8}} text='Search' />
          </Button>
        } topSeparator='full' bottomSeparator='full' />
        <View style={{height: Theme.screenInset.bottom}} />
      </ScrollView>
    );
  }

}
