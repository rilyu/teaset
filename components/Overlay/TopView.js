// TopView.js

'use strict';

import React, {Component, PropTypes} from "react";
import {StyleSheet, AppRegistry, DeviceEventEmitter, View} from 'react-native';
//import {Symbol} from 'core-js';

let keyValue = 0;

export default class TopView extends Component {

  static add(element) {
    let key = ++keyValue;
    DeviceEventEmitter.emit("addOverlay", {key, element});
    return key;
  }

  static remove(key) {
    DeviceEventEmitter.emit("removeOverlay", key);
  }

  static removeAll() {
    DeviceEventEmitter.emit("removeAllOverlay");
  }

  constructor(props) {
    super(props);
    this.state = {
      elements: [],
    };
  }

  componentWillMount() {
    DeviceEventEmitter.addListener("addOverlay", e => this.add(e));
    DeviceEventEmitter.addListener("removeOverlay", key => this.remove(key));
    DeviceEventEmitter.addListener("removeAllOverlay", () => this.removeAll());
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeAllListeners("addOverlay");
    DeviceEventEmitter.removeAllListeners("removeOverlay");
    DeviceEventEmitter.removeAllListeners("removeAllOverlay");
  }

  add(e) {
    let {elements} = this.state;
    elements.push(e);
    this.setState({elements});
  }

  remove(key) {
    let {elements} = this.state;
    for (let i = elements.length - 1; i >= 0; --i) {
      if (elements[i].key === key) {
        elements.splice(i, 1);
        break;
      }
    }
    this.setState({elements});
  }

  removeAll() {
    this.setState({elements: []});
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this.props.children}
        {this.state.elements.map((item, index) => {
          return (
            <View key={'topView' + item.key} style={styles.overlay} pointerEvents='box-none'>
              {item.element}
            </View>
          );
        })}
      </View>
    );
  }

}

var styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

if (!AppRegistry.registerComponentOld) {
  AppRegistry.registerComponentOld = AppRegistry.registerComponent;
}
AppRegistry.registerComponent = function(appKey, getComponentFunc) {
  let SourceComponent = getComponentFunc();
  return AppRegistry.registerComponentOld(appKey, () => React.createClass({
    render: function() {
      return (
        <TopView>
          <SourceComponent {...this.props} />
        </TopView>
      );
    }
  }));
}
