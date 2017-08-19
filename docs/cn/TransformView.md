# `<TransformView />` 可变视图
TransformView 组件定义一个可变视图, 支持双指按捏缩放、单指触摸移动手势, 使用纯 JS 实现, 同时支持 Android 和 iOS。

## Props
| Prop | Type | Default | Note |
|---|---|---|---|
| [View props...](https://facebook.github.io/react-native/docs/view.html) |  |  | TransformView 组件继承 View 组件的全部属性。
| containerStyle | View.style |  | 内部容器样式。
| maxScale | number |  | 最大缩放倍数。
| minScale | number |  | 最小缩放倍数。
| magnetic | bool | true | 磁性边框, 当缩放后尺寸小于视图尺寸时自动放大到视图大小。
| tension | bool | true | 拉拽阻力, 当图片边缘在视图内时继续拉拽有阻力效果。

## Events
| Event Name | Returns | Notes |
|---|---|---|
| [View events...](https://facebook.github.io/react-native/docs/view.html) |  | TransformView 组件继承 View 组件的全部事件。
| onWillTransform | translateX, translateY, scale | Transform 开始, 三个参数分别为 x 坐标、y 坐标、缩放倍数。
| onTransforming | translateX, translateY, scale | Transform 进行中, 三个参数分别为 x 坐标、y 坐标、缩放倍数。
| onDidTransform | translateX, translateY, scale | Transform 结束, 三个参数分别为 x 坐标、y 坐标、缩放倍数。
| onWillMagnetic | translateX, translateY, scale, newX, newY, newScale | 磁性边框效果开始前调用，返回 true 允许磁性边框效果，否则阻止磁性边框效果效果， magnetic = true 时有效。
| onDidMagnetic | translateX, translateY, scale | 磁性边框效果结束时调用, 三个参数分别为 x 坐标、y 坐标、缩放倍数。
| onPress | event | 单击事件, 触摸结束时调用, 与 TouchableOpacity.onPress 一致。
| onLongPress | event | 长按事件, 按压组件超过 500ms 时调用, 与 TouchableOpacity.onLongPress 一致。

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
<TransformView
  style={{backgroundColor: '#fff', flex: 1, alignItems: 'center', justifyContent: 'center'}}
  minScale={0.5}
  maxScale={2}
>
  <Image style={{width: 375, height: 300}} resizeMode='cover' source={require('../images/teaset1.jpg')} />
</TransformView>
```


## Screenshots
![](https://github.com/rilyu/teaset/blob/master/screenshots/14-TransformView.png?raw=true)
