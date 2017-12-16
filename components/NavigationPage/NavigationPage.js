// NavigationPage.js

'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Platform, View, Dimensions} from 'react-native';

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

  constructor(props) {
    super(props);
    this.screenWidth = Dimensions.get('window').width;
  }

  buildProps() {
    let {navigationBarInsets, ...others} = super.buildProps();
    let {left: paddingLeft, right: paddingRight} = Theme.screenInset;
    let pageContainerStyle = [{
      flex: 1,
      paddingLeft,
      paddingRight,
      marginTop: navigationBarInsets ? (Theme.navBarContentHeight + Theme.statusBarHeight) : 0,
    }];
    return ({navigationBarInsets, pageContainerStyle, ...others});
  }

  onLayout(e) {
    let {width} = Dimensions.get('window');
    if (width != this.screenWidth) {
      this.screenWidth = width;
      this.forceUpdate();
    }
    this.props.onLayout && this.props.onLayout(e);
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
    let {autoKeyboardInsets, keyboardTopInsets, pageContainerStyle, onLayout, ...others} = this.buildProps();
    return (
      <View onLayout={e => this.onLayout(e)} {...others}>
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
