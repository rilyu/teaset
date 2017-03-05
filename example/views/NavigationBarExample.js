// NavigationBarExample.js

'use strict';

import React, {Component, PropTypes} from 'react';
import {View, ScrollView} from 'react-native';

import {NavigationPage, ListRow, NavigationBar, Label} from 'teaset';

export default class NavigationBarExample extends NavigationPage {

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'NavigationBar',
    showBackButton: true,
  };

  renderHeader(text) {
    return (
      <View style={{paddingLeft: 8, paddingTop: 16, paddingBottom: 8}}>
        <Label style={{fontSize: 15}} type='detail' text={text} />
      </View>
    );
  }

  renderDetail(type, example) {
    let title = example, leftView, rightView;
    let style = {
      //only for this example, do not use in your code
      flex: 1,
      position: 'relative',
    };
    let tintColor;
    switch (example) {
      case 'Default':
        rightView = (
          <NavigationBar.IconButton icon={require('../icons/search.png')} />
        );
        break;
      case 'Custom':
        let titleStyle = {
          flex: 1,
          paddingLeft: 4,
          paddingRight: 4,
          alignItems: type === 'ios' ? 'center' : 'flex-start',
        };
        style.backgroundColor = '#eff';
        tintColor = '#333';
        title = (
          <View style={titleStyle}>
            <Label style={{color: '#000', fontSize: 15}} text={title} />
            <Label style={{color: '#333', fontSize: 11}}  text='Secondary title' />
          </View>
        );
        leftView = (
          <NavigationBar.IconButton icon={require('../icons/search.png')} />
        );
        rightView = (
          <View style={{flexDirection: 'row'}}>
            <NavigationBar.IconButton icon={require('../icons/edit.png')} />
            <NavigationBar.IconButton icon={require('../icons/trash.png')} />
          </View>
        );
        break;
      case 'Back Button':
        leftView = <NavigationBar.BackButton title='Back' />;
        break;
      case 'Link Button':
        leftView = <NavigationBar.LinkButton title='Close' />;
        rightView = <NavigationBar.LinkButton title='OK' />;
        break;
    }
    return (
      <NavigationBar
        style={style}
        type={type}
        tintColor={tintColor}
        title={title}
        leftView={leftView}
        rightView={rightView}
        />
    );
  }

  renderPage() {
    return (
      <ScrollView style={{flex: 1}}>
        {this.renderHeader('Android')}
        <ListRow titlePlace='none' detail={this.renderDetail('android', 'Default')} topSeparator='full' />
        <ListRow titlePlace='none' detail={this.renderDetail('android', 'Custom')} bottomSeparator='full' />
        {this.renderHeader('iOS')}
        <ListRow titlePlace='none' detail={this.renderDetail('ios', 'Default')} topSeparator='full' />
        <ListRow titlePlace='none' detail={this.renderDetail('ios', 'Custom')} />
        <ListRow titlePlace='none' detail={this.renderDetail('ios', 'Back Button')} bottomSeparator='full' />
        {this.renderHeader('Auto')}
        <ListRow titlePlace='none' detail={this.renderDetail('auto', 'Link Button')} topSeparator='full' bottomSeparator='full' />
      </ScrollView>
    );
  }

}
