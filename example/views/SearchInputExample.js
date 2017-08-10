// SearchInputExample.js

'use strict';

import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';

import {NavigationPage, ListRow, SearchInput} from 'teaset';

export default class SearchInputExample extends NavigationPage {

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'SearchInput',
    showBackButton: true,
  };

  constructor(props) {
    super(props);
    Object.assign(this.state, {
      valueCustom: null,
    });
  }

  renderPage() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={{height: 20}} />
        <ListRow title='Default' detail={
          <SearchInput style={{width: 200}} placeholder='Enter text' clearButtonMode='while-editing' />
        } topSeparator='full' bottomSeparator='full' />
        <View style={{height: 20}} />
        <ListRow title='Readonly' detail={
          <SearchInput style={{width: 200}} placeholder='Enter text' clearButtonMode='while-editing' value='Readonly' editable={false} />
        } topSeparator='full' />
        <ListRow title='Disabled' detail={
          <SearchInput style={{width: 200}} placeholder='Enter text' clearButtonMode='while-editing' value='Disabled' disabled={true} />
        } bottomSeparator='full' />
        <View style={{height: 20}} />
        <ListRow title='Custom' detail={
          <SearchInput
            style={{width: 200, height: 40, backgroundColor: '#rgba(238, 169, 91, 0.1)', borderColor: '#8a6d3b'}}
            inputStyle={{color: '#8a6d3b', fontSize: 18}}
            iconSize={15}
            value={this.state.valueCustom}
            placeholder='Custom'
            placeholderTextColor='#aaa'
            onChangeText={text => this.setState({valueCustom: text})}
            />
        } topSeparator='full' bottomSeparator='full' />
      </ScrollView>
    );
  }

}
