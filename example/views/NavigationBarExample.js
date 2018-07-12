// NavigationBarExample.js

'use strict';

import React, {Component} from 'react';
import {Platform, View, ScrollView, Switch, Image} from 'react-native';

import {Theme, NavigationPage, ListRow, NavigationBar, Label} from 'teaset';
import SelectRow from './SelectRow';

export default class NavigationBarExample extends NavigationPage {

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'NavigationBar',
    navigationBarInsets: false,
  };

  constructor(props) {
    super(props);

    this.typeItems = ['Auto', 'iOS', 'Android'];
    this.titleItems = ['String', 'Custom'];
    this.leftViewItems = ['None', 'Back button', 'Link button', 'Icon button', 'Two icon button'];
    this.rightViewItems = ['None', 'Link button', 'Icon button', 'Two icon button'];
    this.bgColorItems = ['Default', 'Custom'];
    this.tintColorItems = ['Default', 'Custom'];
    this.statusBarStyleItems = ['Default', 'Light Content', 'Dark Content'];

    Object.assign(this.state, {
      type: 'iOS',
      title: 'String',
      leftView: 'Back button',
      rightView: 'None',
      bgColor: 'Default',
      tintColor: 'Default',
      customBackground: false,
      hidden: false,
      animated: true,
      statusBarStyle: 'Light Content',
      statusBarHidden: false,
    });
  }

  get type() {
    switch (this.state.type) {
      case 'Auto': return Platform.OS;
      default: return this.state.type.toLowerCase();
    }
  }

  get style() {
    switch (this.state.bgColor) {
      case 'Default': return null;
      case 'Custom': return {backgroundColor: '#e75f35'};
    }
  }

  get tintColor() {
    switch(this.state.tintColor) {
      case 'Default': return null;
      case 'Custom': return '#3af455';
    }
  }

  get statusBarStyle() {
    switch(this.state.statusBarStyle) {
      case 'Default': return 'default';
      case 'Light Content': return 'light-content';
      case 'Dark Content': return 'dark-content';
    }
  }

  renderLeftRightView(item) {
    switch (item) {
      case 'None':
        return null;
      case 'Back button':
        return (
          <NavigationBar.BackButton
            title={Theme.backButtonTitle}
            onPress={() => this.navigator.pop()}
            />
        );
      case 'Link button':
        return (
          <NavigationBar.LinkButton title='Link' />
        );
      case 'Icon button':
        return (
          <NavigationBar.IconButton icon={require('../icons/search.png')} />
        );
      case 'Two icon button':
        return (
          <View style={{flexDirection: 'row'}}>
            <NavigationBar.IconButton icon={require('../icons/edit.png')} />
            <NavigationBar.IconButton icon={require('../icons/trash.png')} />
          </View>
        );
    }
  }

  renderNavigationTitle() {
    let {title} = this.state;
    switch (title) {
      case 'String':
        return this.props.title;
      case 'Custom':
        let titleStyle = {
          flex: 1,
          paddingLeft: 4,
          paddingRight: 4,
          alignItems: this.type === 'ios' ? 'center' : 'flex-start',
        };
        return (
          <View style={titleStyle}>
            <Label style={{color: Theme.navTitleColor, fontSize: 15}} text='Title' />
            <Label style={{color: Theme.navTitleColor, fontSize: 11}}  text='Secondary title' />
          </View>
        );
    }
  }

  renderNavigationLeftView() {
    return this.renderLeftRightView(this.state.leftView);
  }

  renderNavigationRightView() {
    return this.renderLeftRightView(this.state.rightView);
  }

  renderNavigationBar() {
    let {customBackground, hidden, animated, statusBarHidden} = this.state;
    return (
      <NavigationBar
        style={this.style}
        type={this.type}
        title={this.renderNavigationTitle()}
        leftView={this.renderNavigationLeftView()}
        rightView={this.renderNavigationRightView()}
        tintColor={this.tintColor}
        background={!customBackground ? null :
          <Image style={{flex: 1}} resizeMode='cover' source={require('../images/teaset2.jpg')} />
        }
        hidden={hidden}
        animated={animated}
        statusBarStyle={this.statusBarStyle}
        statusBarHidden={statusBarHidden}
        />
    );
  }

  renderPage() {
    let {type, title, leftView, rightView, bgColor, tintColor, customBackground, hidden, animated, statusBarStyle, statusBarHidden} = this.state;
    return (
      <ScrollView style={{flex: 1, paddingTop: Theme.statusBarHeight}}>
        <View style={{height: Theme.navBarContentHeight, alignItems: 'center', justifyContent: 'center'}}>
          <Label style={{color: '#ccc'}} size='xl' text='ScrollView header' />
        </View>
        <View style={{height: 20}} />
        <SelectRow
          title='Type'
          value={type}
          items={this.typeItems}
          onSelected={(item, index) => this.setState({type: item})}
          topSeparator='full'
          />
        <SelectRow
          title='Title'
          value={title}
          items={this.titleItems}
          onSelected={(item, index) => this.setState({title: item})}
          />
        <SelectRow
          title='Left view'
          value={leftView}
          items={this.leftViewItems}
          onSelected={(item, index) => this.setState({leftView: item})}
          />
        <SelectRow
          title='Right view'
          value={rightView}
          items={this.rightViewItems}
          onSelected={(item, index) => this.setState({rightView: item})}
          />
        <SelectRow
          title='Background color'
          value={bgColor}
          items={this.bgColorItems}
          onSelected={(item, index) => this.setState({bgColor: item})}
          />
        <SelectRow
          title='Tint color'
          value={tintColor}
          items={this.tintColorItems}
          onSelected={(item, index) => this.setState({tintColor: item})}
          />
        <ListRow
          title='Custom background'
          detail={<Switch value={customBackground} onValueChange={value => this.setState({customBackground: value})} />}
          />
        <ListRow
          title='Hidden'
          detail={<Switch value={hidden} onValueChange={value => this.setState({hidden: value})} />}
          />
        <ListRow
          title='Animated'
          detail={<Switch value={animated} onValueChange={value => this.setState({animated: value})} />}
          bottomSeparator='full'
          />
        <View style={{height: 20}} />
        <SelectRow
          title='Status bar style (iOS)'
          value={statusBarStyle}
          items={this.statusBarStyleItems}
          onSelected={(item, index) => this.setState({statusBarStyle: item})}
          topSeparator='full'
          />
        <ListRow
          title='Status bar hidden'
          detail={<Switch value={statusBarHidden} onValueChange={value => this.setState({statusBarHidden: value})} />}
          bottomSeparator='full'
          />
      </ScrollView>
    );
  }

}
