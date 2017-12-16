// App.js

'use strict';

import React, {Component} from 'react';

import {TeaNavigator, Theme} from 'teaset';
import TeasetExampleHome from './views/Home';

Theme.set({fitIPhoneX: true});

export default class App extends Component<{}> {
  render() {
    return <TeaNavigator rootView={<TeasetExampleHome />} />;
  }
}
