# `<Projector />` 幻灯机
Projector 组件定义一个幻灯机组件, 这是一个自动保持状态的多页显示组件, 并且具有视图缓存功能的, 切换页面就像切换幻灯机胶片一样, 原页面的内容和状态不会消失, 再切换回这个页面时原样呈现而无需重新渲染。

## Props
| Prop | Type | Default | Note |
|---|---|---|---|
| [View props...](https://facebook.github.io/react-native/docs/view.html) |  |  | Projector 组件继承 View 组件的全部属性。
| index | number | 0 | 当前胶片(页面)序号。
| slideStyle | 同View.style |  | 胶片(页面)样式。

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
<Projector style={{height: 238}} index={this.state.index}>
  {this.renderSlide('#dff0d8')}
  {this.renderSlide('#d9edf7')}
  {this.renderSlide('#fcf8e3')}
  {this.renderSlide('#f2dede')}
</Projector>
```


## Screenshots
![](https://github.com/rilyu/teaset/blob/master/screenshots/11-Projector.png?raw=true)
