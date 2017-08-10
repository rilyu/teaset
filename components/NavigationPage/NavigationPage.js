// NavigationPage.js

'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Platform, View} from 'react-native';

import Theme from 'teaset/themes/Theme';
import TeaNavigator from '../TeaNavigator/TeaNavigator';
import BasePage from '../BasePage/BasePage';
import NavigationBar from '../NavigationBar/NavigationBar';
import KeyboardSpace from '../KeyboardSpace/KeyboardSpace';

export default class NavigationPage extends BasePage {

  static propTypes = {
    ...BasePage.propTypes,
    title: PropTypes.string,
    showBackButton: PropTypes.bool,
    navigationBarInsets: PropTypes.bool,
  };

  static defaultProps = {
    ...BasePage.defaultProps,
    scene: TeaNavigator.SceneConfigs.PushFromRight,
    title: null,
    showBackButton: false,
    navigationBarInsets: true,
  };

  buildProps() {
    super.buildProps();

    let {navigationBarInsets, ...others} = this.props;
    let pageContainerStyle = [{
      flex: 1,
      padding: 0,
      marginTop: navigationBarInsets ? (Platform.OS === 'ios' ? 64 : 44) : 0,
    }];
    this.props = {navigationBarInsets, pageContainerStyle, ...others};
  }

  renderNavigationTitle() {
    return this.props.title;
  }

  renderNavigationLeftView() {
    if (!this.props.showBackButton) return null;
    return (
      <NavigationBar.BackButton
        title={Theme.backButtonTitle}
        onPress={() => this.navigator.pop()}
        />
    );
  }

  renderNavigationRightView() {
    return null;
  }

  renderNavigationBar() {
    return (
      <NavigationBar 
        title={this.renderNavigationTitle()}
        leftView={this.renderNavigationLeftView()}
        rightView={this.renderNavigationRightView()}
        />
    );
  }

  renderPage() {
    return null;
  }

  render() {
    this.buildProps();
    
    let {autoKeyboardInsets, keyboardTopInsets, pageContainerStyle, ...others} = this.props;
    return (
      <View {...others}>
        <View style={{flex: 1}} >
          <View style={pageContainerStyle}>
            {this.renderPage()}
          </View>
          {this.renderNavigationBar()}
        </View>
        {autoKeyboardInsets ? <KeyboardSpace topInsets={keyboardTopInsets} /> : null}
      </View>
    );
  }


}
