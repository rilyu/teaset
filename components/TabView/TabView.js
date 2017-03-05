// TabView.js

'use strict';

import React, {Component, PropTypes} from 'react';
import {View} from 'react-native';

import Theme from 'teaset/themes/Theme';
import TabSheet from './TabSheet';
import TabButton from './TabButton';
import Projector from '../Projector/Projector';
import Carousel from '../Carousel/Carousel';

export default class TabView extends Component {

  static propTypes = {
    ...View.propTypes,
    type: PropTypes.oneOf(['projector', 'carousel']),
    barStyle: View.propTypes.style,
    activeIndex: PropTypes.number,
    onChange: PropTypes.func, //(index)
  };

  static defaultProps = {
    ...View.defaultProps,
    type: 'projector',
  };

  static Sheet = TabSheet;
  static Button = TabButton;

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
      backgroundColor: Theme.tvBarColor,
      height: Theme.tvBarHeight,
      paddingTop: Theme.tvBarPaddingTop,
      paddingBottom: Theme.tvBarPaddingBottom,
      borderTopWidth: Theme.tvBarSeparatorWidth,
      borderColor: Theme.tvBarSeparatorColor,
      flexDirection: 'row',
      alignItems: 'stretch',
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
          let {icon, activeIcon, title, badge} = item.props;
          return (
            <this.constructor.Button
              key={index}
              title={title}
              icon={icon}
              activeIcon={activeIcon}
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

    let {type, children, ...others} = this.props;
    return (
      <View {...others}>
        {type === 'carousel' ? this.renderCarousel() : this.renderProjector()}
        {this.renderBar()}
      </View>
    );
  }

}
