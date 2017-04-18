# `<Button />` 按钮
Button 组件定义一个按钮, 可视、可触摸且有触摸反馈。

## Props
| Prop | Type | Default | Note |
|---|---|---|---|
| [TouchableOpacity props...](https://facebook.github.io/react-native/docs/touchableopacity.html) |  |  | Button 组件继承 TouchableOpacity 组件的全部属性。
| type | string | 'default' | 显示样式类型。<br/>- default: 默认<br/>- primary: 主按钮<br/>- secondary: 次按钮<br/>- danger: 危险<br/>- link: 链接<br>显示效果参见[Screenshots](#screenshots)。
| size | string | 'md' | 显示尺寸大小。<br/>- xl: 超大<br/>- lg: 大<br/>- md: 中<br/>- sm: 小<br/>- xs: 超小<br>显示效果参见[Screenshots](#screenshots)。
| title | string<br/>number<br/>element |  | 标题, 可以是字符串、数字或 React Native 组件。
| titleStyle | 同Text.style |  | 标题样式, 当 title 类型为 element 时无效。
| disabled | bool | false | 继承自 TouchableOpacity, 为 true 时组件显示为半透明且不可触摸。

## Events
| Event Name | Returns | Notes |
|---|---|---|
| [TouchableOpacity events...](https://facebook.github.io/react-native/docs/touchableopacity.html) |  | Button 组件继承 TouchableOpacity 组件的全部事件。

<!--
## Methods
None.

## Static Props
None.

## Static Methods
None.
-->

## Example
简单用法
```
<Button title='Default' onPress={() => alert('Hello world')} />
```

使用 type、size 属性
```
<Button type='primary' size='xl' title='Primary' />
```

自定义
```
<Button style={{backgroundColor: '#fcf8e3', borderColor: '#8a6d3b'}}>
  <Image style={{width: 16, height: 16, tintColor: '#8a6d3b'}} source={require('../icons/search.png')} />
  <Label style={{color: '#8a6d3b', fontSize: 16, paddingLeft: 8}} text='Search' />
</Button>
```


## Screenshots
![](https://github.com/rilyu/teaset/blob/master/screenshots/02-Button.png?raw=true)
