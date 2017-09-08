# `<AlbumView />` 相册视图
AlbumView 组件定义一个相册视图, 支持多图左右切换显示，支持双指按捏缩放、单指触摸移动手势, 使用纯 JS 实现, 同时支持 Android 和 iOS。

## Props
| Prop | Type | Default | Note |
|---|---|---|---|
| [View props...](https://facebook.github.io/react-native/docs/view.html) |  |  | AlbumView 组件继承 View 组件的全部属性。
| images | array |  | 相册图片数组，必填，数组元素为 Image.source 或 React Native 组件。
| thumbs | array |  | 相册缩略图数组，可空，数组元素为 Image.source 。
| defaultIndex | number | 0 | 默认显示图片索引。
| index | number | | 显示图片索引，设置此属性需要监听 onChange 事件并自行维护状态。
| maxScale | number | 3 | 最大缩放倍数。
| space | number | 20 | 相册图片间隔空间。
| control | bool<br/>element | false | 页面控制器, 为 true 时显示默认页面控制器, 也可以传入自定义的页面控制器, 建议使用 Carousel.Control 组件。

## Events
| Event Name | Returns | Notes |
|---|---|---|
| [View events...](https://facebook.github.io/react-native/docs/view.html) |  | AlbumView 组件继承 View 组件的全部事件。
| onWillChange | index, newIndex | 改变当前页面前时调用, index 为当前页面索引值, newIndex 为将要改变的页面索引值。
| onChange | index, oldIndex | 改变当前页面完成后调用, index 为改变后页面索引值, oldIndex 为改变前页面索引值。
| onPress | index, event | 单击事件, 触摸结束时调用。
| onLongPress | index, event | 长按事件, 按压组件超过 500ms 时调用。
| onWillLoadImage | index | 加载图片前调用。
| onLoadImageSuccess | index, width, height | 加载图片成功时调用。
| onLoadImageFailure | index, error | 加载图片失败时调用。

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
<AlbumView
  style={{flex: 1}}
  control={true}
  images={[
    require('../images/teaset1.jpg'),
    require('../images/teaset2.jpg'),
    require('../images/teaset3.jpg'),
    require('../images/faircup.jpg'),
  ]}
  thumbs={[
    require('../images/teaset1_s.jpg'),
    require('../images/teaset2_s.jpg'),
    require('../images/teaset3_s.jpg'),
    require('../images/faircup_s.jpg'),
  ]}
  />
```

## Screenshots
![](https://github.com/rilyu/teaset/blob/master/screenshots/14a-AlbumView1.png?raw=true) ![](https://github.com/rilyu/teaset/blob/master/screenshots/14a-AlbumView2.png?raw=true)
