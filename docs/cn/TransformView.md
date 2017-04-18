# `<TransformView />` 可变视图
TransformView 组件定义一个可变视图, 支持双指按捏缩放、单指触摸移动手势, 使用纯 JS 实现, 同时支持 Android 和 iOS。

## Props
| Prop | Type | Default | Note |
|---|---|---|---|
| [View props...](https://facebook.github.io/react-native/docs/view.html) |  |  | TransformView 组件继承 View 组件的全部属性。
| containerStyle | View.style |  | 内部容器样式。
| maxScale | number |  | 最大缩放倍数。
| minScale | number |  | 最小缩放倍数。
| magnetic | number | true | 磁性边框, 当缩放后尺寸小于视图尺寸时自动放大到视图大小。

## Events
| Event Name | Returns | Notes |
|---|---|---|
| [View events...](https://facebook.github.io/react-native/docs/view.html) |  | TransformView 组件继承 View 组件的全部事件。
| onWillTransform | translateX, translateY, scale | Transform 开始, 三个参数分别为 x 坐标、y 坐标、缩放倍数。
| onTransforming | translateX, translateY, scale | Transform 进行中, 三个参数分别为 x 坐标、y 坐标、缩放倍数。
| onDidTransform | translateX, translateY, scale | Transform 结束, 三个参数分别为 x 坐标、y 坐标、缩放倍数。
| onPress | event | 单击事件, 触摸结束时调用, 与 TouchableOpacity.onPress 一致。

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
