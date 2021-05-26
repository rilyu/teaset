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
    tintColor: PropTypes.string, //bar tint color, default tint color leftView and rightView, set to null for no tint color
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

  componentDidUpdate(prevProps) {
    if (prevProps.hidden != this.props.hidden) {
      this.checkBarHidden();
    }
  }

  getChildContext() {
    return {tintColor: this.props.tintColor === undefined ? Theme.navTintColor : this.props.tintColor};
  }

  buildStyle() {
    let {style, type, statusBarInsets} = this.props;

    let justifyContent;
    switch (type === 'auto' ? Platform.OS : type) {
      case 'ios': justifyContent = 'space-between'; break;
      case 'android': justifyContent = 'flex-end'; break;
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
      justifyContent,
    }].concat(style).concat({
      top: this.state.barTop, //hidden or shown
    });

    return style;
  }

  checkBarHidden() {
    let {hidden, animated} = this.props;
    let {barTop, barOpacity} = this.state;
    let barTopValue = hidden ? -this.barHeight : 0;
    let barOpacityValue = hidden ? 0 : 1;
    if (barTop._value != barTopValue || barOpacity._value != barOpacityValue) {
      if (animated) {
        Animated.parallel([
          Animated.spring(barTop, {toValue: barTopValue, friction: 9, useNativeDriver: false,}),
          Animated.spring(barOpacity, {toValue: barOpacityValue, friction: 9, useNativeDriver: false,}),
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
      this.checkBarHidden();
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

  renderStatusBar(fs) {
    let {statusBarColor, statusBarStyle, statusBarHidden, statusBarInsets, animated} = this.props;

    if (!statusBarColor) statusBarColor = statusBarInsets && (Platform.OS === 'ios' || Platform.Version > 20) ? 'rgba(0,0,0,0)' : fs.backgroundColor;
    if (!statusBarStyle) statusBarStyle = Theme.navStatusBarStyle ? Theme.navStatusBarStyle : 'default';

    return (
      <StatusBar backgroundColor={statusBarColor} translucent={true} barStyle={statusBarStyle} animated={animated} hidden={statusBarHidden} />
    );
  }

  renderBackground() {
    let backgroundViewStyle = {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: this.state.barOpacity,
    };
    return <Animated.View style={backgroundViewStyle}>{this.props.background}</Animated.View>;
  }

  renderTitle(fs) {
    let {type, title, titleStyle, statusBarInsets} = this.props;
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

    //convert string title to NavigationBar.Title
    if (typeof title === 'string') {
      let textAlign;
      switch (type === 'auto' ? Platform.OS : type) {
        case 'ios': textAlign = 'center'; break;
        case 'android': textAlign = 'left'; break;
      }
      title = <this.constructor.Title style={[{textAlign, color: Theme.navTitleColor}].concat(titleStyle)} text={title} />;
    }

    return <Animated.View style={titleViewStyle}>{title}</Animated.View>;
  }

  renderLeftView() {
    let {leftView} = this.props;
    let {barOpacity: opacity} = this.state;
    return <Animated.View style={{opacity}} onLayout={e => this.onLeftViewLayout(e)}>{leftView}</Animated.View>;
  }

  renderRightView() {
    let {rightView} = this.props;
    let {barOpacity: opacity} = this.state;
    return <Animated.View style={{opacity}} onLayout={e => this.onRightViewLayout(e)}>{rightView}</Animated.View>;
  }

  render() {
    let {style, children, type, title, titleStyle, leftView, rightView, tintColor, background, hidden, animated, statusBarStyle, statusBarColor, statusBarHidden, statusBarInsets, onLayout, ...others} = this.props;
    let fs = StyleSheet.flatten(this.buildStyle());
    return (
      <Animated.View style={fs} onLayout={e => this.onLayout(e)} {...others}>
        {this.renderStatusBar(fs)}
        {this.renderBackground()}
        {this.renderTitle(fs)}
        {this.renderLeftView()}
        {this.renderRightView()}
      </Animated.View>
    );
  }
}
