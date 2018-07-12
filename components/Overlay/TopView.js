// TopView.js

'use strict';

import React, {Component, PureComponent} from "react";
import {StyleSheet, AppRegistry, DeviceEventEmitter, View, Animated} from 'react-native';
//import {Symbol} from 'core-js';

import Theme from 'teaset/themes/Theme';

let keyValue = 0;

export default class TopView extends Component {

  static add(element) {
    let key = ++keyValue;
    DeviceEventEmitter.emit("addOverlay", {key, element});
    return key;
  }

  static remove(key) {
    DeviceEventEmitter.emit("removeOverlay", {key});
  }

  static removeAll() {
    DeviceEventEmitter.emit("removeAllOverlay", {});
  }

  static transform(transform, animated, animatesOnly = null) {
    DeviceEventEmitter.emit("transformRoot", {transform, animated, animatesOnly});
  }

  static restore(animated, animatesOnly = null) {
    DeviceEventEmitter.emit("restoreRoot", {animated, animatesOnly});
  }

  constructor(props) {
    super(props);
    this.state = {
      elements: [],
      translateX: new Animated.Value(0),
      translateY: new Animated.Value(0),
      scaleX: new Animated.Value(1),
      scaleY: new Animated.Value(1),
    };
  }

  componentWillMount() {
    DeviceEventEmitter.addListener("addOverlay", e => this.add(e));
    DeviceEventEmitter.addListener("removeOverlay", e => this.remove(e));
    DeviceEventEmitter.addListener("removeAllOverlay", e => this.removeAll(e));
    DeviceEventEmitter.addListener("transformRoot", e => this.transform(e));
    DeviceEventEmitter.addListener("restoreRoot", e => this.restore(e));
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeAllListeners("addOverlay");
    DeviceEventEmitter.removeAllListeners("removeOverlay");
    DeviceEventEmitter.removeAllListeners("removeAllOverlay");
    DeviceEventEmitter.removeAllListeners("transformRoot");
    DeviceEventEmitter.removeAllListeners("restoreRoot");
  }

  add(e) {
    let {elements} = this.state;
    elements.push(e);
    this.setState({elements});
  }

  remove(e) {
    let {elements} = this.state;
    for (let i = elements.length - 1; i >= 0; --i) {
      if (elements[i].key === e.key) {
        elements.splice(i, 1);
        break;
      }
    }
    this.setState({elements});
  }

  removeAll(e) {
    let {elements} = this.state;
    this.setState({elements: []});
  }

  transform(e) {
    let {translateX, translateY, scaleX, scaleY} = this.state;
    let {transform, animated, animatesOnly} = e;
    let tx = 0, ty = 0, sx = 1, sy = 1;
    transform.map(item => {
      if (item && typeof item === 'object') {
        for (let name in item) {
          let value = item[name];
          switch (name) {
            case 'translateX': tx = value; break;
            case 'translateY': ty = value; break;
            case 'scaleX': sx = value; break;
            case 'scaleY': sy = value; break;
          }
        }
      }
    });
    if (animated) {
      let animates = [
        Animated.spring(translateX, {toValue: tx, friction: 9}),
        Animated.spring(translateY, {toValue: ty, friction: 9}),
        Animated.spring(scaleX, {toValue: sx, friction: 9}),
        Animated.spring(scaleY, {toValue: sy, friction: 9}),
      ];
      animatesOnly ? animatesOnly(animates) : Animated.parallel(animates).start();
    } else {
      if (animatesOnly) {
        let animates = [
          Animated.timing(translateX, {toValue: tx, duration: 1}),
          Animated.timing(translateY, {toValue: ty, duration: 1}),
          Animated.timing(scaleX, {toValue: sx, duration: 1}),
          Animated.timing(scaleY, {toValue: sy, duration: 1}),
        ];
        animatesOnly(animates);
      } else {
        translateX.setValue(tx);
        translateY.setValue(ty);
        scaleX.setValue(sx);
        scaleY.setValue(sy);
      }
    }

  }

  restore(e) {
    let {translateX, translateY, scaleX, scaleY} = this.state;
    let {animated, animatesOnly} = e;
    if (animated) {
      let animates = [
        Animated.spring(translateX, {toValue: 0, friction: 9}),
        Animated.spring(translateY, {toValue: 0, friction: 9}),
        Animated.spring(scaleX, {toValue: 1, friction: 9}),
        Animated.spring(scaleY, {toValue: 1, friction: 9}),
      ];
      animatesOnly ? animatesOnly(animates) : Animated.parallel(animates).start();
    } else {
      if (animatesOnly) {
        let animates = [
          Animated.timing(translateX, {toValue: 0, duration: 1}),
          Animated.timing(translateY, {toValue: 0, duration: 1}),
          Animated.timing(scaleX, {toValue: 1, duration: 1}),
          Animated.timing(scaleY, {toValue: 1, duration: 1}),
        ];
        animatesOnly(animates);
      } else {
        translateX.setValue(0);
        translateY.setValue(0);
        scaleX.setValue(1);
        scaleY.setValue(1);
      }
    }
  }

  render() {
    let {elements, translateX, translateY, scaleX, scaleY} = this.state;
    let transform = [{translateX}, {translateY}, {scaleX}, {scaleY}];
    return (
      <View style={{backgroundColor: Theme.screenColor, flex: 1}}>
        <Animated.View style={{flex: 1, transform: transform}}>
          <PureView>
            {this.props.children}
          </PureView>
        </Animated.View>
        {elements.map((item, index) => {
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

class PureView extends PureComponent {
  render() {
    return (
      <View style={{flex: 1}}>
        {this.props.children}
      </View>
    );
  }
}

if (!AppRegistry.registerComponentOld) {
  AppRegistry.registerComponentOld = AppRegistry.registerComponent;
}

AppRegistry.registerComponent = function(appKey, componentProvider) {

  class RootElement extends Component {
    render() {
      let Component = componentProvider();
      return (
        <TopView>
          <Component {...this.props} />
        </TopView>
      );
    }
  }

  return AppRegistry.registerComponentOld(appKey, () => RootElement);
}
