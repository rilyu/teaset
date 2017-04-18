# `<Badge />` 徽章
Badge 组件定义一个徽章, 可用于图标角标显示数字、字母、原点等, 也可以自定义显示其它内容。

## Props
| Prop | Type | Default | Note |
|---|---|---|---|
| [View props...](https://facebook.github.io/react-native/docs/view.html) |  |  | Badge 组件继承 View 组件的全部属性。
| type | string | 'capsule' | 徽章类型。<br/>- capsule: 胶囊<br/>- square: 圆角矩形<br/>- dot: 圆点<br/>显示效果参见[Screenshots](#screenshots)。
| count | string<br/>number |  | 徽章显示数字。
| countStyle | 同Text.style |  | 徽章显示数字样式。
| maxCount | number | 99 | 最大值, 当 count 大于此值时显示为 maxCount 后接一个加号, 如'99+', 当 count 不是数字时无效。

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
<Badge count={6} />
```

圆角矩形
```
<Badge type='square' count={68} />
```

圆点
```
<Badge type='dot' />
```

自定义
```
<Badge style={{backgroundColor: '#777', paddingLeft: 0, paddingRight: 0}}>
  <Text style={{color: '#fff'}}>$</Text>
</Badge>
```


## Screenshots
![](https://github.com/rilyu/teaset/blob/master/screenshots/06-Badge.png?raw=true)
