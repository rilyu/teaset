// PopoverExample.js

'use strict';

import React, {Component} from 'react';
import {StyleSheet, View, Image, ScrollView} from 'react-native';

import {NavigationPage, ListRow, Popover, Label} from 'teaset';

export default class PopoverExample extends NavigationPage {

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'Popover',
    showBackButton: true,
  };

  renderPage() {
    let img = require('../images/faircup.jpg');
    return (
      <ScrollView style={{flex: 1}}>
        <View style={{height: 20}} />

        <View style={{padding: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <View style={{flex: 1, paddingRight: 8, alignItems: 'flex-end'}}>
            <Popover style={styles.popoverStyle} arrow='bottomRight'>
              <Label style={{color: '#000'}} text='bottomRight' />
            </Popover>
          </View>
          <View>
            <Popover style={styles.popoverStyle} arrow='bottom'>
              <Label style={{color: '#000'}} text='bottom' />
            </Popover>
          </View>
          <View style={{flex: 1, paddingLeft: 8, alignItems: 'flex-start'}}>
            <Popover style={styles.popoverStyle} arrow='bottomLeft'>
              <Label style={{color: '#000'}} text='bottomLeft' />
            </Popover>
          </View>
        </View>

        <View style={{padding: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <View style={{flex: 1, paddingRight: 40, alignItems: 'flex-end'}}>
            <Popover style={styles.popoverStyle} arrow='rightBottom'>
              <Label style={{color: '#000'}} text='rightBottom' />
            </Popover>
          </View>
          <View style={{height: 32, width: 32}} />
          <View style={{flex: 1, paddingLeft: 40, alignItems: 'flex-start'}}>
            <Popover style={styles.popoverStyle} arrow='leftBottom'>
              <Label style={{color: '#000'}} text='leftBottom' />
            </Popover>
          </View>
        </View>

        <View style={{padding: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <View style={{flex: 1, paddingRight: 40, alignItems: 'flex-end'}}>
            <Popover style={styles.popoverStyle} arrow='right'>
              <Label style={{color: '#000'}} text='right' />
            </Popover>
          </View>
          <Image style={{height: 32, width: 32, borderRadius: 16, tintColor: '#337ab7'}} source={require('teaset/icons/smile.png')}/>
          <View style={{flex: 1, paddingLeft: 40, alignItems: 'flex-start'}}>
            <Popover style={styles.popoverStyle} arrow='left'>
              <Label style={{color: '#000'}} text='left' />
            </Popover>
          </View>
        </View>

        <View style={{padding: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <View style={{flex: 1, paddingRight: 40, alignItems: 'flex-end'}}>
            <Popover style={styles.popoverStyle} arrow='rightTop'>
              <Label style={{color: '#000'}} text='rightTop' />
            </Popover>
          </View>
          <View style={{height: 32, width: 32}} />
          <View style={{flex: 1, paddingLeft: 40, alignItems: 'flex-start'}}>
            <Popover style={styles.popoverStyle} arrow='leftTop'>
              <Label style={{color: '#000'}} text='leftTop' />
            </Popover>
          </View>
        </View>

        <View style={{padding: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <View style={{flex: 1, paddingRight: 8, alignItems: 'flex-end'}}>
            <Popover style={styles.popoverStyle} arrow='topRight'>
              <Label style={{color: '#000'}} text='topRight' />
            </Popover>
          </View>
          <View>
            <Popover style={styles.popoverStyle} arrow='top'>
              <Label style={{color: '#000'}} text='top' />
            </Popover>
          </View>
          <View style={{flex: 1, paddingLeft: 8, alignItems: 'flex-start'}}>
            <Popover style={styles.popoverStyle} arrow='topLeft'>
              <Label style={{color: '#000'}} text='topLeft' />
            </Popover>
          </View>
        </View>

      </ScrollView>
    );
  }

}

var styles = StyleSheet.create({
  popoverStyle: {
    backgroundColor: '#fff',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadowStyle: {
    shadowColor: '#777',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
});

