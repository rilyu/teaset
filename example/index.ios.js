// index.ios.js

'use strict';

import React, {Component} from 'react';
import {AppRegistry} from 'react-native';

import {TeaNavigator} from 'teaset';
import TeasetExampleHome from './views/Home';

export default class TeasetExample extends Component {
  render() {
    return <TeaNavigator rootView={<TeasetExampleHome />} />;
  }
}

AppRegistry.registerComponent('example', () => TeasetExample);
