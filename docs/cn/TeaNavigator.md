# `<TeaNavigator />` 导航器
TeaNavigator 定义一个导航器, 封装 React Native 的 Navigator 组件并提供 navigator() Context 函数给子组件使用, 在任意子组件均可取得 navigator 进行页面跳转。

如果选用 TeaNavigator, 那么 TeaNavigator 组件应该是 App 的根组件。

关于 Context 请参阅 React 官方说明: [Context](https://facebook.github.io/react/docs/context.html)。

## Props
| Prop | Type | Default | Note |
|---|---|---|---|
| rootView | element |  | 根组件。

## Context
| Name | Type | Note |
|---|---|---|
| navigator | func | 无入参, 返回 navigator 组件。

## Example
简单用法
```
<TeaNavigator rootView={<YourRootView />} />
```
