// NavigationBar.js

'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Platform, StatusBar, View, Text, Animated, ViewPropTypes, Dimensions} from 'react-native';

import Theme from 'teaset/themes/Theme';
import NavigationTitle from './NavigationTitle';
import NavigationButton from './NavigationButton';
import NavigationLinkButton from './NavigationLinkButton';
import NavigationIconButton from './NavigationIconButton';
import NavigationBackButton from './NavigationBackButton';

export default class NavigationBar extends Component {

  static propTypes = {
    ...ViewPropTypes,
    type: PropTypes.oneOf(['auto', 'ios', 'android']),
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    titleStyle: Text.propTypes.style,
    leftView: PropTypes.element,
    rightView: PropTypes.element,
    tintColor: PropTypes.string, //bar tint color, default tint color leftView and rightView
    background: PropTypes.element,
    hidden: PropTypes.bool, //bar hidden
    animated: PropTypes.bool, //hide or show bar with animation
    statusBarStyle: PropTypes.oneOf(['default', 'light-content','dark-content',]), //status bar style (iOS only)
    statusBarColor: PropTypes.string, //status bar color, default: style.backgroundColor
    statusBarHidden: PropTypes.bool, //status bar hidden
    statusBarInsets: PropTypes.bool, //auto add space for iOS status bar
  };

  static defaultProps = {
    ...View.defaultProps,
    type: 'ios',
    hidden: false,
    animated: true,
    statusBarInsets: true,
  };

  static childContextTypes = {
    tintColor: PropTypes.string,
  };

  static Title = NavigationTitle;
  static Button = NavigationButton;
  static LinkButton = NavigationLinkButton;
  static IconButton = NavigationIconButton;
  static BackButton = NavigationBackButton;

  constructor(props) {
    super(props);
    this.screenWidth = Dimensions.get('window').width;
    this.state = {
      leftViewWidth: 0,
      rightViewWidth: 0,
      barTop: new Animated.Value(props.hidden ? -(Theme.navBarContentHeight + Theme.statusBarHeight) : 0),
      barOpacity: new Animated.Value(props.hidden ? 0 : 1),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.hidden != this.props.hidden) {
      this.checkBarHidden(nextProps.hidden, nextProps.animated);
    }
  }

  getChildContext() {
    return {tintColor: this.props.tintColor ? this.props.tintColor : Theme.navTintColor};
  }

  buildProps() {
    let {style, type, title, titleStyle, tintColor, hidden, animated, statusBarColor, statusBarStyle, statusBarInsets, ...others} = this.props;

    //build style
    let justifyContent, titleTextAlign;
    switch (type === 'auto' ? Platform.OS : type) {
      case 'ios':
        justifyContent = 'space-between';
        titleTextAlign = 'center';
        break;
      case 'android':
        justifyContent = 'flex-end';
        titleTextAlign = 'left';
        break;
    }
    let {left: leftInset, right: rightInset} = Theme.screenInset;
    style = [{
      backgroundColor: Theme.navColor,
      position: 'absolute',
      left: 0,
      right: 0,
      height: Theme.navBarContentHeight + (statusBarInsets ? Theme.statusBarHeight : 0),
      paddingTop: statusBarInsets ? Theme.statusBarHeight : 0,
      paddingLeft: 4 + leftInset,
      paddingRight: 4 + rightInset,
      borderBottomWidth: Theme.navSeparatorLineWidth,
      borderBottomColor: Theme.navSeparatorColor,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: justifyContent,
    }].concat(style).concat({
      top: this.state.barTop, //hidden or shown
    });

    let fs = StyleSheet.flatten(style);

    //build tintColor
    if (!tintColor) tintColor = Theme.navTintColor;

    //build statusBarColor and statusBarStyle
    if (!statusBarColor) statusBarColor = statusBarInsets && (Platform.OS === 'ios' || Platform.Version > 20) ? 'rgba(0,0,0,0)' : fs.backgroundColor;
    if (!statusBarStyle) statusBarStyle = Theme.navStatusBarStyle ? Theme.navStatusBarStyle : 'default';

    //build titleViewStyle
    let {leftViewWidth, rightViewWidth} = this.state;
    let barPaddingLeft = fs.paddingLeft ? fs.paddingLeft : (fs.padding ? fs.padding : 0);
    let barPaddingRight = fs.paddingRight ? fs.paddingRight : (fs.padding ? fs.padding : 0);
    let paddingLeft, paddingRight;
    switch (type === 'auto' ? Platform.OS : type) {
      case 'ios':
        let paddingLeftRight = Math.max(leftViewWidth + barPaddingLeft, rightViewWidth + barPaddingRight);
        paddingLeft = paddingLeftRight;
        paddingRight = paddingLeftRight;
        break;
      case 'android':
        paddingLeft = barPaddingLeft;
        paddingRight = leftViewWidth + rightViewWidth + barPaddingRight;
        break;
    }
    let titleViewStyle = {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      position: 'absolute',
      top: statusBarInsets ? Theme.statusBarHeight : 0,
      left: 0,
      right: 0,
      height: Theme.navBarContentHeight,
      paddingLeft: paddingLeft,
      paddingRight: paddingRight,
      opacity: this.state.barOpacity,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    };

    //build leftView and rightView style
    let leftRightViewStyle = {opacity: this.state.barOpacity};

    //convert string title to NavigationBar.Title
    if (typeof title === 'string') {
      title = <this.constructor.Title style={[{textAlign: titleTextAlign, color: Theme.navTitleColor}].concat(titleStyle)} text={title} />;
    }

    //build backgroundView style
    let backgroundViewStyle = {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: this.state.barOpacity,
    };

    return ({style, type, title, titleStyle, tintColor, titleViewStyle, leftRightViewStyle, backgroundViewStyle, hidden, animated, statusBarColor, statusBarStyle, statusBarInsets, ...others});
  }

  checkBarHidden(hidden, animated) {
    let {barTop, barOpacity} = this.state;
    let barTopValue = hidden ? -this.barHeight : 0;
    let barOpacityValue = hidden ? 0 : 1;
    if (barTop._value != barTopValue || barOpacity._value != barOpacityValue) {
      if (animated) {
        Animated.parallel([
          Animated.spring(barTop, {toValue: barTopValue, friction: 9}),
          Animated.spring(barOpacity, {toValue: barOpacityValue, friction: 9}),
        ]).start();
      } else {
        barTop.setValue(barTopValue);
        barOpacity.setValue(barOpacityValue);
      }      
    }
  }

  onLayout(e) {
    if (e.nativeEvent.layout.height != this.barHeight) {
      this.barHeight = e.nativeEvent.layout.height;
      this.checkBarHidden(this.props.hidden, this.props.animated);
    }
    let {width} = Dimensions.get('window');
    if (width != this.screenWidth) {
      this.screenWidth = width;
      this.forceUpdate();
    }
    this.props.onLayout && this.props.onLayout(e);
  }

  onLeftViewLayout(e) {
    if (e.nativeEvent.layout.width != this.state.leftViewWidth) {
      this.setState({leftViewWidth: e.nativeEvent.layout.width});
    }
  }

  onRightViewLayout(e) {
    if (e.nativeEvent.layout.width != this.state.rightViewWidth) {
      this.setState({rightViewWidth: e.nativeEvent.layout.width});
    }
  }

  render() {
    let {style, animated, statusBarStyle, statusBarColor, statusBarHidden, title, titleViewStyle, leftRightViewStyle, leftView, rightView, background, backgroundViewStyle, ...others} = this.buildProps();
    return (
      <Animated.View style={style} {...others} onLayout={e => this.onLayout(e)}>
        <StatusBar backgroundColor={statusBarColor} translucent={true} barStyle={statusBarStyle} animated={animated} hidden={statusBarHidden} />
        <Animated.View style={backgroundViewStyle}>{background}</Animated.View>
        <Animated.View style={titleViewStyle}>{title}</Animated.View>
        <Animated.View style={leftRightViewStyle} onLayout={e => this.onLeftViewLayout(e)}>{leftView}</Animated.View>
        <Animated.View style={leftRightViewStyle} onLayout={e => this.onRightViewLayout(e)}>{rightView}</Animated.View>
      </Animated.View>
    );
  }
}

