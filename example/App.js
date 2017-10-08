// App.js

'use strict';

import React, {Component} from 'react';

import {TeaNavigator} from 'teaset';
import TeasetExampleHome from './views/Home';

export default class App extends Component<{}> {
  render() {
    return <TeaNavigator rootView={<TeasetExampleHome />} />;
  }
}
