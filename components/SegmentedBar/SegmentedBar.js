// SegmentedBar.js

'use strict';

import React, {Component, PropTypes} from 'react';
import {View, ScrollView, TouchableOpacity, Animated} from 'react-native';

import Theme from 'teaset/themes/Theme';
import SegmentedItem from './SegmentedItem';

export default class SegmentedBar extends Component {

  static propTypes = {
    ...View.propTypes,
    justifyItem: PropTypes.oneOf(['fixed', 'scrollable']),
    indicatorType: PropTypes.oneOf(['none', 'boxWidth', 'itemWidth']),
    indicatorPosition: PropTypes.oneOf(['top', 'bottom']),
    animated: PropTypes.bool,
    autoScroll: PropTypes.bool,
    activeIndex: PropTypes.number, //if use this prop, you need update this value from onChange event
    onChange: PropTypes.func, //(index)
  };

  static defaultProps = {
    ...View.defaultProps,
    justifyItem: 'fixed',
    indicatorType: 'itemWidth',
    indicatorPosition: 'bottom',
    animated: true,
    autoScroll: true,
  };

  static Item = SegmentedItem;

  constructor(props) {
    super(props);
    this._activeIndex = this.props.activeIndex ? this.props.activeIndex : 0;
    this._buttonsLayout = this.makeLayoutArray([], props.children);
    this._itemsLayout = this.makeLayoutArray([], props.children);
    this._indicatorX = null;
    this._indicatorWidth = null;
    this._scrollViewWidth = 0;
  }

  componentWillReceiveProps(nextProps) {
    let nextItemsLayout = this.makeLayoutArray(this._itemsLayout, nextProps.children);
    if (nextItemsLayout.length != this._itemsLayout.length) {
      let nextButtonsLayout = this.makeLayoutArray(this._buttonsLayout, nextProps.children);
      this._buttonsLayout = nextButtonsLayout;
      this._itemsLayout = nextItemsLayout;
    }
    if (nextProps.activeIndex || nextProps.activeIndex === 0) {
      this._activeIndex = nextProps.activeIndex;
    }
    if (this._activeIndex >= nextItemsLayout.length) {
      this._activeIndex = nextItemsLayout.length - 1;
    }
   this.props = nextProps;
   this.updateIndicator();
  }

  get activeIndex() {
    return this._activeIndex;
  }

  set activeIndex(value) {
    if (this._activeIndex != value) {
      this._activeIndex = value;
      this.updateIndicator();
      this.forceUpdate();
      this.props.onChange && this.props.onChange(value);
    }
  }

  get indicatorXValue() {
    switch (this.props.indicatorType) {
      case 'boxWidth':
        return this._buttonsLayout[this._activeIndex].x;
      case 'itemWidth':
        return this._buttonsLayout[this._activeIndex].x + this._itemsLayout[this._activeIndex].x;
    }
    return 0;
  }

  get indicatorWidthValue() {
    switch (this.props.indicatorType) {
      case 'boxWidth':
        return this._buttonsLayout[this.activeIndex].width;
      case 'itemWidth':
        return this._itemsLayout[this.activeIndex].width;
    }
    return 0;
  }

  makeLayoutArray(olders, items) {
    if (items instanceof Array) return items.map((item, index) => {
      return index < olders.length ? olders[index] : {x: 0, y:0, width: 0, height: 0};
    });
    else if (items) return [olders.length > 0 ? olders[0] : {x: 0, y:0, width: 0, height: 0}];
    return [];
  }

  checkInitIndicator() {
    if (this._indicatorX && this._indicatorWidth) {
      this._indicatorX.setValue(this.indicatorXValue);
      this._indicatorWidth.setValue(this.indicatorWidthValue);
    } else {
      this._indicatorX = new Animated.Value(this.indicatorXValue);
      this._indicatorWidth = new Animated.Value(this.indicatorWidthValue);
    }
    this.forceUpdate();
  }

  updateIndicator() {
    if (!this._indicatorX || !this._indicatorWidth) return;

    let indicatorXValue = this.indicatorXValue;
    let indicatorWidthValue = this.indicatorWidthValue;
    if (indicatorXValue === this._saveIndicatorXValue
        && indicatorWidthValue === this._saveIndicatorWidthValue) {
      return;
    }

    this._saveIndicatorXValue = indicatorXValue;
    this._saveIndicatorWidthValue = indicatorWidthValue;
    if (this.props.animated) {
      Animated.parallel([
        Animated.spring(this._indicatorX, {toValue: indicatorXValue, friction: 9}),
        Animated.spring(this._indicatorWidth, {toValue: indicatorWidthValue, friction: 9}),
      ]).start();
    } else {
      this._indicatorX.setValue(indicatorXValue);
      this._indicatorWidth.setValue(indicatorWidthValue);
    }

    if (this.props.autoScroll && this.refs.scrollView) {
      let contextWidth = 0;
      this._buttonsLayout.map(item => contextWidth += item.width);
      let x = indicatorXValue + indicatorWidthValue / 2 - this._scrollViewWidth / 2;
      if (x < 0) {
        x = 0;
      } else if (x > contextWidth - this._scrollViewWidth) {
        x = contextWidth - this._scrollViewWidth;
      }
      this.refs.scrollView.scrollTo({x: x, y: 0, animated: this.props.animated});
    }
  }

  isEqualLayout(obj1, obj2) {
    return obj1.x == obj2.x && obj1.y == obj2.y && obj1.width == obj2.width && obj1.height == obj2.height;
  }

  onButtonPress(index) {
    this.activeIndex = index;
  }

  onButtonLayout(index, e) {
    let {layout} = e.nativeEvent;
    if (!this.isEqualLayout(layout, this._buttonsLayout[index])) {
      this._buttonsLayout[index] = layout;
      this.checkInitIndicator();
    }
  }

  onItemLayout(index, e) {
    let {layout} = e.nativeEvent;
    if (!this.isEqualLayout(layout, this._itemsLayout[index])) {
      this._itemsLayout[index] = layout;
      this.checkInitIndicator();
    }
  }

  onScrollViewLayout(e) {
    this._scrollViewWidth = e.nativeEvent.layout.width;
    this.props.onLayout && this.props.onLayout(e);
  }

  renderItem(item, index) {
    let saveOnLayout = item.props.onLayout;
    let newItem = React.cloneElement(item, {
      active: index === this.activeIndex,
      onLayout: e => {
        this.onItemLayout(index, e);
        saveOnLayout && saveOnLayout(e);
      },
    });
    return newItem;
  }

  renderIndicator() {
    let style = {
      backgroundColor: Theme.sbIndicatorLineColor,
      position: 'absolute',
      left: this._indicatorX,
      width: this._indicatorWidth,
      height: Theme.sbIndicatorLineWidth,
    };
    if (this.props.indicatorPosition == 'top') {
      style.top = Theme.sbIndicatorPositionPadding;
    } else {
      style.bottom = Theme.sbIndicatorPositionPadding;
    }
    return (
      <Animated.View style={style} />
    );
  }

  renderFixed() {
    let {style, justifyItem, indicatorType, animated, activeIndex, onChange, children, ...others} = this.props;
    style = [{
      backgroundColor: Theme.sbColor,
      flexDirection: 'row',
    }].concat(style);
    if (!children) {
      children = [];
    } else if (!(children instanceof Array)) {
      children = [children];
    }
    return (
      <View style={style} {...others}>
        {children.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
            onPress={() => this.onButtonPress(index)}
            onLayout={e => this.onButtonLayout(index, e)}
          >
            {this.renderItem(item, index)}
          </TouchableOpacity>
        ))}
        {this.renderIndicator()}
      </View>
    );
  }

  renderScrollable() {
    let {style, justifyItem, indicatorType, animated, activeIndex, onChange, onLayout, children, ...others} = this.props;
    style = [{
      backgroundColor: Theme.sbColor,
    }].concat(style);
    if (!children) {
      children = [];
    } else if (!(children instanceof Array)) {
      children = [children];
    }
    return (
      <ScrollView
        style={style}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        scrollsToTop={false}
        onLayout={e => this.onScrollViewLayout(e)}
        ref='scrollView'
        {...others}
      >
        {children.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => this.onButtonPress(index)}
            onLayout={e => this.onButtonLayout(index, e)}
          >
            {this.renderItem(item, index)}
          </TouchableOpacity>
        ))}
        {this.renderIndicator()}
      </ScrollView>
    );
  }

  render() {
    if (this.props.justifyItem === 'scrollable') return this.renderScrollable();
    else return this.renderFixed();
  }
}
