// TeaNavigator.js

'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';

import TeaNavigatorScene from './TeaNavigatorScene';

import {Navigator} from 'react-native-deprecated-custom-components';
//replace NavigatorScene, optimize the effect of the scene
Navigator.SceneConfigs = TeaNavigatorScene;

export default class TeaNavigator extends Component {

  static propTypes = {
    rootView: PropTypes.element,
  };

  static defaultProps = {
    rootView: (
      <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 36, padding: 10}}>Teaset</Text>
        <Text style={{fontSize: 13, padding: 10}}>
          <Text style={{fontWeight: 'bold'}}>Set TeaNavigator.rootView to show main page.{'\n\n'}</Text>
          <Text style={{color: '#ff7800'}}>class</Text> <Text style={{color: '#3b5bb5'}}>Application</Text> <Text style={{color: '#ff7800'}}>extends</Text> Component{' {\n\n'}
          {'  '}<Text style={{color: '#3b5bb5'}}>render</Text>(){' {\n'}
          {'    '}<Text style={{color: '#ff7800'}}>return</Text> {'<TeaNavigator rootView={YourRootView} />;\n'}
          {'  }\n\n'}
          {'}'}
        </Text>
      </View>
    )
  };

  static SceneConfigs = TeaNavigatorScene;

  static childContextTypes = {
    navigator: PropTypes.func,
  };

  getChildContext() {
    return {navigator: () => this.navigator};
  }

  render() {
    let {rootView} = this.props;
    return (
      <View style={{flex: 1, backgroundColor: 'black'}}>
        <Navigator
          initialRoute={{
            view: rootView, //the view element, like <View />
            scene: null, //navigate scene, null able
          }}
          configureScene={route => {
            if (route.scene) return route.scene;
            else if (route.view.props.scene) return route.view.props.scene;
            else return TeaNavigatorScene.PushFromRight;
          }}
          renderScene={(route, navigator) => {
            return React.cloneElement(route.view, {ref: v => route.viewRef = v});
          }}
          onDidFocus={route => {
            route.viewRef && route.viewRef.onDidFocus && route.viewRef.onDidFocus();
          }}
          onWillFocus={route => {
            route.viewRef && route.viewRef.onWillFocus && route.viewRef.onWillFocus();
          }}
          sceneStyle={null}
          ref={v => this.navigator = v}
        />
      </View>
    );
  }
}
