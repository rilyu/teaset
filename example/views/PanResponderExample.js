// PanResponderExample.js

'use strict';

import React, {Component} from 'react';
import {StyleSheet, View, PanResponder, Image, TouchableOpacity, Animated} from 'react-native';

import {NavigationPage, Input} from 'teaset';

export default class PanResponderExample extends NavigationPage {

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'PanResponder',
    showBackButton: true,
  };

  constructor(props) {
    super(props);
    this.createPanResponder();
    this.prevTouches = [];
    this.layout = null;
    Object.assign(this.state, {
      translateX: 0,
      translateY: 0,
      scale: 1,
    });
  }

  createPanResponder() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => {
        console.log('onStartShouldSetPanResponder', e.nativeEvent, JSON.stringify(gestureState));
        return true;
      },
      onStartShouldSetPanResponderCapture: (e, gestureState) => {
        console.log('onStartShouldSetPanResponderCapture', e.nativeEvent, JSON.stringify(gestureState));
        return false;
      },
      onMoveShouldSetPanResponder: (e, gestureState) => {
        console.log('onMoveShouldSetPanResponder', e.nativeEvent, JSON.stringify(gestureState));
        return true;
      },
      onMoveShouldSetPanResponderCapture: (e, gestureState) => {
        console.log('onMoveShouldSetPanResponderCapture', e.nativeEvent, JSON.stringify(gestureState));
        return false;
      },
      onPanResponderGrant: (e, gestureState) => {
        console.log('onPanResponderGrant', e.nativeEvent, JSON.stringify(gestureState));
        this.prevTouches = e.nativeEvent.touches;
      },
      onPanResponderMove: (e, gestureState) => {
        //console.log('onPanResponderMove', e.nativeEvent, JSON.stringify(gestureState));
        this.handleTouches(e.nativeEvent.touches);
      },
      onPanResponderTerminationRequest: (e, gestureState) => {
        console.log('onPanResponderTerminationRequest', e.nativeEvent, JSON.stringify(gestureState));
        return true;
      },
      onPanResponderRelease: (e, gestureState) => {
        console.log('onPanResponderRelease', e.nativeEvent, JSON.stringify(gestureState));
        this.handleTouches(e.nativeEvent.touches);
      },
      onPanResponderTerminate: (e, gestureState) => {
        console.log('onPanResponderTerminate', e.nativeEvent, JSON.stringify(gestureState));
      },
      onShouldBlockNativeResponder: (e, gestureState) => {
        console.log('onShouldBlockNativeResponder', e, JSON.stringify(gestureState));
        return true;
      },
    });
  }

  handleTouches(touches) {
    let prevTouches = this.prevTouches;
    this.prevTouches = touches;

    if (touches.length == 0 || touches.length != prevTouches.length) {
      return;
    }
    for (let i = 0; i < touches.length; ++i) {
      if (touches[i].identifier != prevTouches[i].identifier) {
        return;
      }
    }

    //translate
    let t0, t1;
    if (touches.length == 1) {
      t0 = {x: prevTouches[0].pageX, y: prevTouches[0].pageY};
      t1 = {x: touches[0].pageX, y: touches[0].pageY};
    } else {
      t0 = {x: (prevTouches[0].pageX + prevTouches[1].pageX) / 2, y: (prevTouches[0].pageY + prevTouches[1].pageY) / 2};
      t1 = {x: (touches[0].pageX + touches[1].pageX) / 2, y: (touches[0].pageY + touches[1].pageY) /2};
    }
    let dx = t1.x - t0.x;
    let dy = t1.y - t0.y;

    //scale
    let distance0 = 0, distance1 = 0;
    if (touches.length >= 2) {
      let dx0 = prevTouches[1].pageX - prevTouches[0].pageX;
      let dy0 = prevTouches[1].pageY - prevTouches[0].pageY;
      let dx1 = touches[1].pageX - touches[0].pageX;
      let dy1 = touches[1].pageY - touches[0].pageY;
      distance0 = Math.sqrt(dx0 * dx0 + dy0 * dy0);
      distance1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
    }

    if (distance0 && distance1) {
      let scaleRate = distance1 / distance0;
      let scalePointX = (prevTouches[1].pageX + prevTouches[0].pageX) / 2;
      let scalePointY = (prevTouches[1].pageY + prevTouches[0].pageY) / 2;
      this.refs['view'].measure((x, y, width, height, pageX, pageY) => {
        //view center point position
        let viewCenterX = x + width / 2;
        let viewCenterY = y + height / 2;
        //the scale point with the center of the view as the origin
        let spBeforScaleX = scalePointX - viewCenterX;
        let spBeforScaleY = scalePointY - viewCenterY;
        let spAfterScaleX = spBeforScaleX * scaleRate;
        let spAfterScaleY = spBeforScaleY * scaleRate;
        //So that the scale point does not seem to move
        dx += spBeforScaleX - spAfterScaleX;
        dy += spBeforScaleY - spAfterScaleY;
        let {translateX, translateY, scale} = this.state;
        this.setState({translateX: translateX + dx, translateY: translateY + dy, scale: scale * scaleRate});
      });
    } else {
      let {translateX, translateY, scale} = this.state;
      this.setState({translateX: translateX + dx, translateY: translateY + dy, scale: scale});
    }

  }

  renderPage2() {
    let {translateX, translateY, scale} = this.state;
    return (
      <View style={{flex: 1}}>
        <View style={{backgroundColor: '#faa', height: 60}} />
        <View style={{backgroundColor: '#fff', padding: 10, overflow: 'hidden'}}>
          <View
            style={{
              backgroundColor: '#eee',
              flexGrow: 1,
              transform: [{translateX: translateX}, {translateY: translateY}, {scale: scale}],
              overflow: 'hidden',
            }}
            onLayout={e => this.layout = e.nativeEvent.layout}
            ref='view'
            {...this.panResponder.panHandlers}
          >
            <Input style={{width: 200, height: 30}} />
            <Image style={{width: 300, height: 500}} resizeMode='cover' source={require('../images/teaset1.jpg')} />
            <TouchableOpacity style={{flex: 1}} onPress={() => console.log('press')} />
          </View>
        </View>
      </View>
    );
  }

  renderPage() {
    return (
      <View style={{flex: 1}}>
        <MyTouchableOpacity style={styles.full} {...this.panResponder.panHandlers} />
        <View style={styles.box} />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  full: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  box: {
    backgroundColor: '#fff',
    position: 'absolute',
    top: 100,
    left: 100,
    right: 100,
    bottom: 100,    
  },
});

class MyTouchableOpacity extends TouchableOpacity {

  constructor(props) {
    super(props);

    let touchableHandleStartShouldSetResponder = this.touchableHandleStartShouldSetResponder;
    let touchableHandleResponderTerminationRequest = this.touchableHandleResponderTerminationRequest;
    let touchableHandleResponderGrant = this.touchableHandleResponderGrant;
    let touchableHandleResponderMove = this.touchableHandleResponderMove;
    let touchableHandleResponderRelease = this.touchableHandleResponderRelease;
    let touchableHandleResponderTerminate = this.touchableHandleResponderTerminate;

    this.touchableHandleStartShouldSetResponder = (e) => {
      return this.onStartShouldSetResponder(touchableHandleStartShouldSetResponder, e);
    }
    this.touchableHandleResponderTerminationRequest = (e) => {
      return this.onResponderTerminationRequest(touchableHandleResponderTerminationRequest, e);
    }
    this.touchableHandleResponderGrant = (e) => {
      return this.onResponderGrant(touchableHandleResponderGrant, e);
    }
    this.touchableHandleResponderMove = (e) => {
      this._opacityInactive();
      return this.onResponderMove(touchableHandleResponderMove, e);
    }
    this.touchableHandleResponderRelease = (e) => {
      return this.onResponderRelease(touchableHandleResponderRelease, e);
    }
    this.touchableHandleResponderTerminate = (e) => {
      return this.onResponderTerminate(touchableHandleResponderTerminate, e);
    }

  }

  onStartShouldSetResponder(s, e) {
    console.log('==> onStartShouldSetResponder', e);
    return s(e);
  }

  onResponderTerminationRequest(s, e) {
    console.log('==> onResponderTerminationRequest', e);
    return s(e);
  }

  onResponderGrant(s, e) {
    console.log('==> onResponderGrant', e);
    return s(e);
  }

  onResponderMove(s, e) {
    console.log('==> onResponderMove', e);
    return s(e);
  }

  onResponderRelease(s, e) {
    console.log('==> onResponderRelease', e);
    return s(e);
  }

  onResponderTerminate(s, e) {
    console.log('==> onResponderTerminate', e);
    return s(e);
  }


  // touchableHandleStartShouldSetResponder(e) {
  //   console.log('===> touchableHandleStartShouldSetResponder', e);
  //   super.touchableHandleStartShouldSetResponder(e);
  // }

  // touchableHandleResponderTerminationRequest(e) {
  //   console.log('===> touchableHandleResponderTerminationRequest', e);
  //   super.touchableHandleResponderTerminationRequest(e);
  // }

  // touchableHandleResponderGrant(e) {
  //   console.log('===> touchableHandleResponderGrant', e);
  //   super.touchableHandleResponderGrant(e);
  // }

  // touchableHandleResponderMove(e) {
  //   console.log('===> touchableHandleResponderMove', e);
  //   super.touchableHandleResponderMove(e);
  // }

  // touchableHandleResponderRelease(e) {
  //   console.log('===> touchableHandleResponderRelease', e);
  //   super.touchableHandleResponderRelease(e);
  // }

  // touchableHandleResponderTerminate(e) {
  //   console.log('===> touchableHandleResponderTerminate', e);
  //   super.touchableHandleResponderTerminate(e);
  // }

}
