// SegmentedView.js

'use strict';

import React, {Component, PropTypes} from 'react';
import {View} from 'react-native';

import Theme from 'teaset/themes/Theme';
import SegmentedSheet from './SegmentedSheet';
import SegmentedButton from './SegmentedButton';
import Projector from '../Projector/Projector';
import Carousel from '../Carousel/Carousel';

export default class SegmentedView extends Component {

  static propTypes = {
    ...View.propTypes,
    type: PropTypes.oneOf(['projector', 'carousel']),
    barStyle: View.propTypes.style,
    barPosition: PropTypes.oneOf(['top', 'bottom']),
    activeIndex: PropTypes.number,
    onChange: PropTypes.func, //(index)
  };

  static defaultProps = {
    ...View.defaultProps,
    type: 'projector',
    barPosition: 'top',
  };

  static Sheet = SegmentedSheet;
  static Button = SegmentedButton;

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: this.props.activeIndex ? this.props.activeIndex : 0,
    };
  }

  get activeIndex() {
    let activeIndex = this.props.activeIndex;
    if (activeIndex || activeIndex === 0) return activeIndex;
    else return this.state.activeIndex;
  }

  buildProps() {
    let {style, barStyle, children, ...others} = this.props;

    style = [{
      flexDirection: 'column',
      alignItems: 'stretch',
    }].concat(style);
    barStyle = [{
      backgroundColor: Theme.svBarColor,
      height: Theme.svBarHeight,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
    }].concat(barStyle);

    if (!(children instanceof Array)) {
      if (children) children = [children];
      else children = [];
    }

    this.props = {style, barStyle, children, ...others};
  }

  renderBar() {
    let {barStyle, onChange, children} = this.props;
    return (
      <View style={barStyle}>
        {children.map((item, index) => {
          let {title, badge} = item.props;
          return (
            <this.constructor.Button
              key={index}
              title={title}
              active={index === this.activeIndex}
              badge={badge}
              onPress={() => {
                this.setState({activeIndex: index}, () => {
                  this.refs.carousel && this.refs.carousel.scrollToPage(index);                  
                  onChange && onChange(index);
                });
              }}
              />
          );
        })}
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
    let {children, onChange} = this.props;
    return (
      <Carousel
        style={{flex: 1}}
        carousel={false}
        startIndex={this.activeIndex}
        cycle={false}
        ref='carousel'
        onChange={index => {
          this.setState({activeIndex: index}, () => onChange && onChange(index));
        }}
      >
        {children}
      </Carousel>
    );
  }

  render() {
    this.buildProps();

    let {type, barPosition, children, ...others} = this.props;
    return (
      <View {...others}>
        {barPosition === 'top' ? this.renderBar() : null}
        {type === 'carousel' ? this.renderCarousel() : this.renderProjector()}
        {barPosition === 'bottom' ? this.renderBar() : null}
      </View>
    );
  }

}
