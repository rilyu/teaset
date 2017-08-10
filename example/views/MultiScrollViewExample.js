// MultiScrollViewExample.js

//通过交换内外层的scrollEnabled来实现滚动支持，不可使用，因交替时触摸事件无法传递，且交替后原ScrollView无法弹回原位

'use strict';

import React, {Component} from 'react';
import {StyleSheet, View, Image, ScrollView} from 'react-native';

import {NavigationPage, ListRow, SegmentedView, Carousel} from 'teaset';

export default class MultiScrollViewExample extends NavigationPage {

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'MultiScrollView',
    showBackButton: true,
  };

  constructor(props) {
    super(props);
    Object.assign(this.state, {
      width: 0,
      height: 0,
      outScroll: true,
    });
  }

  onOutScrollViewScroll(e) {
    let {y} = e.nativeEvent.contentOffset;
    if (this.state.outScroll && this.state.height + e.nativeEvent.contentOffset.y >= e.nativeEvent.contentSize.height) {
      this.setState({outScroll: false});
    }
  }

  onOutScrollViewLayout(e) {
    let {width, height} = e.nativeEvent.layout;
    if (this.state.width != width || this.state.height != height) {
      this.setState({width, height});
    }
  }

  onInnerScrollViewScroll(e) {
    let {y} = e.nativeEvent.contentOffset;
    if (!this.state.outScroll && e.nativeEvent.contentOffset.y <= 0) {
      this.setState({outScroll: true});
    }
  }

  renderPage() {
    let {width, height, outScroll} = this.state;
    let headerHeight = 30;
    let items = [
      'Apple',
      'Banana',
      'Cherry',
      'Durian',
      'Filbert',
      'Grape',
      'Hickory',
      'Lemon',
      'Mango',
      'Apple',
      'Banana',
      'Cherry',
      'Durian',
      'Filbert',
      'Grape',
      'Hickory',
      'Lemon',
      'Mango',
    ];
    return (
      <ScrollView
        style={{flex: 1}}
        alwaysBounceVertical={false}
        scrollEnabled={outScroll}
        scrollEventThrottle={16}
        onScroll={(e) => this.onOutScrollViewScroll(e)}
        onLayout={e => this.onOutScrollViewLayout(e)}
      >
        <Carousel style={{height: 238}} control={true}>
          <Image style={{width, height: 238}} resizeMode='cover' source={require('../images/teaset1.jpg')} />
          <Image style={{width, height: 238}} resizeMode='cover' source={require('../images/teaset2.jpg')} />
          <Image style={{width, height: 238}} resizeMode='cover' source={require('../images/teaset3.jpg')} />
        </Carousel>
        <SegmentedView style={{height: height}}>
          <SegmentedView.Sheet title='one'>
            <ScrollView
              style={{height: height - headerHeight}}
              scrollEnabled={!outScroll}
              scrollEventThrottle={16}
              onScroll={(e) => this.onInnerScrollViewScroll(e)}
            >
              {items.map((item, index) => <ListRow title={item} key={'0' + index} />)}
            </ScrollView>
          </SegmentedView.Sheet>
          <SegmentedView.Sheet title='two'>
            <ScrollView
              style={{height: height - headerHeight}}
              scrollEnabled={!outScroll}
              scrollEventThrottle={16}
              onScroll={(e) => this.onInnerScrollViewScroll(e)}
            >
              {items.map((item, index) => <ListRow title={item} key={'0' + index} />)}
            </ScrollView>
          </SegmentedView.Sheet>
        </SegmentedView>
      </ScrollView>
    );
  }

}
