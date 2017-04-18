# `<Label />` 标签
Label 组件用于文本显示, 一般为单行的少量文字。

## Props
| Prop | Type | Default | Note |
|---|---|---|---|
| [Text props...](https://facebook.github.io/react-native/docs/text.html) |  |  | Label 组件继承 Text 组件的全部属性。
| type | string | 'default' | 显示样式类型。<br/>- default: 在默认 Theme 中定义的字体颜色为深灰色(#333)<br/>- title: 在默认 Theme 中定义的字体颜色为黑色(#000), 字体大小为 default 的 1.1 倍<br/>- detail: 在默认 Theme 中定义的字体颜色为浅灰色(#989898), 字体大小为 default 的 0.9 倍<br/>- danger: 在默认 Theme 中定义的字体颜色为红色(#a94442)<br>显示效果参见[Screenshots](#screenshots)。
| size | string | 'md' | 显示尺寸大小。<br/>- xl: 超大, 在默认 Theme 中定义的字体大小为 26<br/>- lg: 大, 在默认 Theme 中定义的字体大小为 20<br/>- md: 中, 在默认 Theme 中定义的字体大小为 14<br/>- sm: 小, 在默认 Theme 中定义的字体大小为 10<br/>- xs: 超小, 在默认 Theme 中定义的字体大小为 8<br>显示效果参见[Screenshots](#screenshots)。
| text | string<br/>number |  | 显示文本, 可以是字符串或数字。
| numberOfLines | number | 1 | 显示行数, 继承自 Text 组件并修改默认值。

<!--
## Events
None.

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
<Label text='Hello world' />
```

使用 type、size 属性
```
<Label type='title' size='xl' text='Hello world' />
```

自定义 style
```
<Label style={{color: '#8a6d3b', fontSize: 16}} text='Hello world' />
```

## Screenshots
![](https://github.com/rilyu/teaset/blob/master/screenshots/01-Label.png?raw=true)
