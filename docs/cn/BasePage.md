# `<BasePage />` 基础页面
BasePage 定义一个基础页面组件, 是 Page 的抽象封装, 需要派生出新的类来使用, 提供一系列易于使用的可重写方法, 和 TeaNavigator 搭配使用可大大简化页面跳转代码。

## Props
| Prop | Type | Default | Note |
|---|---|---|---|
| [View props...](https://facebook.github.io/react-native/docs/view.html) |  |  | BasePage 组件继承 View 组件的全部属性。
| scene | object | Navigator.SceneConfigs.Replace | 默认转场效果, 与 TeaNavigator 搭配使用时, 如没在 route 中指定 scene 则自动取此属性使用。
| autoKeyboardInsets | bool | true(iOS)<br/>false(Android) | 在弹出键盘时是否自动插入键盘占用空间, 插入键盘占用空间的目的是避免页面内容被键盘遮挡。
| keyboardTopInsets | number | 0 | 键盘占用空间顶部偏移量。

## Variables
| Variable | Type | Notes |
|---|---|---|
| navigator | Navigator | 返回 TeaNavigator 封装的 navigator。<br/>这是一个只读属性变量。
| didMount | bool | componentDidMount 是否已调用, 代替 React 废弃的 isMounted。

## State
| State | Type | Notes |
|---|---|---|
| isFocused | bool | 是否已聚焦到此页面, 如不想重写 onDidFocus 函数也可以使用此状态代替。

## Methods
| Method | Params | Returns | Notes |
|---|---|---|---|
| onWillFocus |  |  | 将要聚焦到此页面, 在页面转场动画开始前调用。<br/>在派生类中重写此函数执行所需操作。
| onDidFocus |  |  | 已经聚焦到此页面, 在页面转场动画结束后调用。<br/>在派生类中重写此函数执行所需操作。<br/>如果页面初始化有较耗时的操作, 在初始化过程中容易引起页面转场动画卡顿, 建议把复杂的初始化代码放到此函数中处理。
| onHardwareBackPress |  | bool | 当用户按下返回键(物理键, Android only)时调用。<br/>默认返回上一页, 如为根页面则退出程序。<br/>在派生类中重写此函数执行所需操作, 返回 true 表示已接管此次调用。
| renderPage |  | element | 页面渲染函数, BasePage 所有派生类都应该重写此函数渲染界面, 而不是 render 函数。

## Example
简单用法
```
import React from 'react';
import {Navigator, View} from 'react-native';

import {BasePage, Input, Button} from 'teaset';

export default class Login extends BasePage {

  static defaultProps = {
    ...BasePage.defaultProps,
    scene: Navigator.SceneConfigs.FloatFromBottom,
  };

  constructor(props) {
    super(props);
    Object.assign(this.state, {
      userName: null,
      password: null,
    });
  }

  renderPage() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Input
          style={{width: 200}}
          size='sm'
          value={this.state.userName}
          placeholder='用户名'
          onChangeText={text => this.setState({userName: text})}
          />
        <Input
          style={{width: 200}}
          size='sm'
          value={this.state.password}
          placeholder='密码'
          secureTextEntry={true}
          onChangeText={text => this.setState({password: text})}
          />
        <Button title='登录' onPress={() => this.navigator.push({view: <YourMainPage />})}/>
      </View>
    );
  }

}
```
