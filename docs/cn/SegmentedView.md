# `<SegmentedView />` 分段器
SegmentedView 组件定义一个分段器组件, 一般用于同一页面中多项内容分段显示。

## Props
| Prop | Type | Default | Note |
|---|---|---|---|
| [View props...](https://facebook.github.io/react-native/docs/view.html) |  |  | SegmentedView 组件继承 View 组件的全部属性。
| type | string | 'projector' | 分段器类型。<br/>- projector: 幻灯机, 内容页面使用[`<Projector />`](./Projector.md)组件渲染<br/>- carousel: 走马灯, 内容页面使用[`<Carousel />`](./Carousel.md)组件渲染
| barStyle | 同View.style |  | 分段按钮工具条样式。
| barPosition | string | 'top' | 分段按钮工具条位置。<br/>- top: 顶部<br/>- bottom: 底部
| activeIndex | number | 0 | 活动 Sheet 序号。

## Events
| Event Name | Returns | Notes |
|---|---|---|
| [View events...](https://facebook.github.io/react-native/docs/view.html) |  | SegmentedView 组件继承 View 组件的全部事件。
| onChange | index | 改变当前页面时调用, index 为当前 Sheet 序号。

## Static Props
| Prop | Type | Default | Note |
|---|---|---|---|
| [Sheet](#segmentedviewsheet--props) | class |  | 分段器 Sheet 组件。
| [Button](#segmentedviewbutton--props) | class |  | 分段器按钮组件。<br/>此组件由 Sheet 组件自动渲染, 无须代码显式声明, 但可以修改 SegmentedView.Button 为自定义类以更改分段器按钮组件。

<!--
## Methods
None.

## Static Methods
None.
-->

## `<SegmentedView.Sheet />` Props
| Prop | Type | Default | Note |
|---|---|---|---|
| [View props...](https://facebook.github.io/react-native/docs/view.html) |  |  | SegmentedView.Sheet 组件继承 View 组件的全部属性。
| title | string<br/>number<br/>element |  | 标题, 可以是字符串、数字或 React Native 组件。
| badge | string<br/>number<br/>element |  | 徽章, 可以是字符串、数字或 React Native 组件, 为字符串、数字时使用 `<Badge />`组件渲染。

## `<SegmentedView.Button />` Props
| Prop | Type | Default | Note |
|---|---|---|---|
| [TouchableOpacity props...](https://facebook.github.io/react-native/docs/touchableopacity.html) |  |  | SegmentedView.Button 组件继承 TouchableOpacity 组件的全部属性。
| title | string<br/>number<br/>element |  | 标题, 可以是字符串、数字或 React Native 组件。
| badge | string<br/>number<br/>element |  | 徽章, 可以是字符串、数字或 React Native 组件, 为字符串、数字时使用 `<Badge />`组件渲染。
| active | bool | false | 是否激活。

## Example
简单用法
```
<SegmentedView style={{flex: 1}} type='projector'>
  <SegmentedView.Sheet title='one' badge={1}>
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Label type='detail' size='xl' text='Segment one' />
    </View>
  </SegmentedView.Sheet>
  <SegmentedView.Sheet title='two'>
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Label type='detail' size='xl' text='Segment two' />
    </View>
  </SegmentedView.Sheet>
  <SegmentedView.Sheet title='three'>
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Label type='detail' size='xl' text='Segment three' />
    </View>
  </SegmentedView.Sheet>
</SegmentedView>
```


## Screenshots
![](https://github.com/rilyu/teaset/blob/master/screenshots/12-SegmentedView.png?raw=true)
