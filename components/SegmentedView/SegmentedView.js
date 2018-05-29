// SegmentedView.js

'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, ViewPropTypes} from 'react-native';

import Theme from 'teaset/themes/Theme';
import SegmentedSheet from './SegmentedSheet';
import SegmentedBar from '../SegmentedBar/SegmentedBar';
import Projector from '../Projector/Projector';
import Carousel from '../Carousel/Carousel';

export default class SegmentedView extends Component {

  static propTypes = {
    ...ViewPropTypes,
    type: PropTypes.oneOf(['projector', 'carousel']),
    barPosition: PropTypes.oneOf(['top', 'bottom']),
    //SegmentedBar
    barStyle: ViewPropTypes.style,
    justifyItem: PropTypes.oneOf(['fixed', 'scrollable']),
    indicatorType: PropTypes.oneOf(['none', 'boxWidth', 'itemWidth']),
    indicatorPosition: PropTypes.oneOf(['top', 'bottom']),
    indicatorLineColor: PropTypes.string,
    indicatorLineWidth: PropTypes.number,
    indicatorPositionPadding: PropTypes.number,
    animated: PropTypes.bool,
    autoScroll: PropTypes.bool,
    activeIndex: PropTypes.number,
    onChange: PropTypes.func, //(index)
  };

  static defaultProps = {
    ...View.defaultProps,
    type: 'projector',
    barPosition: 'top',
  };

  static Sheet = SegmentedSheet;

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: this.props.activeIndex ? this.props.activeIndex : 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeIndex != this.props.activeIndex && this.refs.carousel) {
      this.refs.carousel.scrollToPage(nextProps.activeIndex);
    }
  }

  get activeIndex() {
    let activeIndex = this.props.activeIndex;
    if (activeIndex || activeIndex === 0) return activeIndex;
    else return this.state.activeIndex;
  }

  buildProps() {
    let {style, children, ...others} = this.props;

    style = [{
      flexDirection: 'column',
      alignItems: 'stretch',
    }].concat(style);

    if (!(children instanceof Array)) {
      if (children) children = [children];
      else children = [];
    }
    children = children.filter(item => item); //remove empty item

    this.props = {style, children, ...others};
  }

  onSegmentedBarChange(index) {
    if (index == this.activeIndex) return;
    this.setState({activeIndex: index}, () => {
      if (this.refs.carousel) {
        this.refs.carousel.scrollToPage(index, false);
      }
      this.props.onChange && this.props.onChange(index);
    });
  }

  onCarouselChange(index) {
    if (index == this.state.activeIndex) return;
    this.setState({activeIndex: index}, () => {
      this.props.onChange && this.props.onChange(index);
    });
  }

  renderBar() {
    let {barPosition, barStyle, justifyItem, indicatorType, indicatorPosition, indicatorLineColor, indicatorLineWidth, indicatorPositionPadding, animated, autoScroll, onChange, children} = this.props;

    if (!indicatorPosition && barPosition == 'bottom') {
      indicatorPosition = 'top';
    }

    return (
      <View>
        <SegmentedBar
          style={barStyle}
          justifyItem={justifyItem}
          indicatorType={indicatorType}
          indicatorPosition={indicatorPosition}
          indicatorLineColor={indicatorLineColor}
          indicatorLineWidth={indicatorLineWidth}
          indicatorPositionPadding={indicatorPositionPadding}
          animated={animated}
          autoScroll={autoScroll}
          activeIndex={this.activeIndex}
          onChange={index => this.onSegmentedBarChange(index)}
        >
          {children.map((item, index) => (
            <SegmentedBar.Item
              key={index}
              title={item.props.title}
              titleStyle={item.props.titleStyle}
              activeTitleStyle={item.props.activeTitleStyle}
              badge={item.props.badge}
              />
          ))}
        </SegmentedBar>
      </View>
    );
  }

  renderProjector() {
    return (
      <Projector style={{flex: 1}} index={this.activeIndex}>
        {this.props.children}
      </Projector>
    );
  }

  renderCarousel() {
    let {children} = this.props;
    return (
      <Carousel
        style={{flex: 1}}
        carousel={false}
        startIndex={this.activeIndex}
        cycle={false}
        ref='carousel'
        onChange={index => this.onCarouselChange(index)}
      >
        {children}
      </Carousel>
    );
  }

  render() {
    this.buildProps();

    let {type, barPosition, children, onChange, ...others} = this.props; //disable View.onChange
    return (
      <View {...others}>
        {barPosition === 'top' ? this.renderBar() : null}
        {type === 'carousel' ? this.renderCarousel() : this.renderProjector()}
        {barPosition === 'bottom' ? this.renderBar() : null}
      </View>
    );
  }

}
