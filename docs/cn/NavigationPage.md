# `<NavigationPage />` 导航页面
NavigationPage 定义一个导航页面组件, 继承自 [BasePage](./BasePage.md), 在 BasePage 的基础上添加一个 [NavigationBar](./NavigationBar.md) 导航条。

## Props
| Prop | Type | Default | Note |
|---|---|---|---|
| [BasePage props...](./BasePage.md) |  |  | NavigationPage 组件继承 BasePage 组件的全部属性。
| title | string | null | 导航条标题。
| showBackButton | bool | false | 是否显示返回按钮。
| navigationBarInsets | bool | true | 是否为内容区域增加导航条占用空间。<br/>此属性默认为 true, 使得内容不被导航条遮挡, 如果页面内容实用 ScrollView 且需要自行控制 NavigationBar 导航条的显示/隐藏, 那么你需要将此属性设置为 false 并自行在 ScrollView 容器里增加导航条的占用空间, 这样可以在导航条隐藏后把顶部空间利用起来。
| scene | object | Navigator.SceneConfigs.PushFromRight | 继承自 BasePage 并修改默认值。

## Methods
| Method | Params | Returns | Notes |
|---|---|---|---|
| [BasePage methods...](./BasePage.md) |  |  | NavigationPage 组件继承 BasePage 组件的全部方法。
| renderNavigationTitle |  | element | 导航条标题渲染函数, 默认为 this.props.title。
| renderNavigationLeftView |  | element | 导航条左按钮渲染函数, 默认根据 this.props.showBackButton 值决定返回值, 为 true 时返回 NavigationBar.BackButton 组件实例, 否则返回 null。<br/>注: 可以通过 Theme 修改返回按钮的默认标题。
| renderNavigationRightView |  | element | 导航条右侧按钮渲染函数, 默认返回 null。
| renderNavigationBar |  | element | 导航条渲染函数, 一般应重写上面三个函数, 而不是此函数。

## Example
简单用法
```
import React from 'react';
import {View} from 'react-native';

import {NavigationPage, Label} from 'teaset';

class MePage extends NavigationPage {

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'Me',
    showBackButton: false,
  };

  renderPage() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Label type='detail' size='xl' text={this.props.title} />
      </View>
    );
  }

}
```
