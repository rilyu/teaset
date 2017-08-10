// StepperExample.js

'use strict';

import React, {Component} from 'react';
import {View, ScrollView, Text} from 'react-native';

import {NavigationPage, ListRow, Stepper} from 'teaset';

export default class StepperExample extends NavigationPage {

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'Stepper',
    showBackButton: true,
  };

  constructor(props) {
    super(props);
    Object.assign(this.state, {
      valueCustom: 1,
    });
  }

  renderPage() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={{height: 20}} />
        <ListRow title='Default' detail={<Stepper />} topSeparator='full' />
        <ListRow title='Min & max' detail={<Stepper defaultValue={1} min={1} max={10} />} />
        <ListRow title='Step' detail={<Stepper defaultValue={0.8} step={0.005} valueFormat={v => (v * 100).toFixed(1) + '%'} valueStyle={{minWidth: 60}} />} bottomSeparator='full' />
        <View style={{height: 20}} />
        <ListRow title='Readonly' detail={<Stepper editable={false} />} topSeparator='full' />
        <ListRow title='Disabled' detail={<Stepper disabled={true} />} bottomSeparator='full' />
        <View style={{height: 20}} />
        <ListRow title='Custom' detail={
          <Stepper
            style={{borderWidth: 0}}
            value={this.state.valueCustom}
            valueStyle={{color: '#8a6d3b'}}
            min={0}
            max={100}
            subButton={
              <View style={{backgroundColor: '#rgba(238, 169, 91, 0.1)', borderColor: '#8a6d3b', borderWidth: 1, borderRadius:4, width: 20, height: 20, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{color: '#8a6d3b'}}>－</Text>
              </View>
            }
            addButton={
              <View style={{backgroundColor: '#rgba(238, 169, 91, 0.1)', borderColor: '#8a6d3b', borderWidth: 1, borderRadius:4, width: 20, height: 20, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{color: '#8a6d3b'}}>＋</Text>
              </View>
            }
            showSeparator={false}
            onChange={v => this.setState({valueCustom: v})}
            />
        } topSeparator='full' bottomSeparator='full' />
      </ScrollView>
    );
  }

}
