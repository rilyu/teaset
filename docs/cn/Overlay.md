# `Overlay{}` 浮层
Overlay 为浮层静态类, 是 Teaset 里非常重要的组成部分。

一般而言内容展示页面是二维的平面结构, 有一些辅助性的 UI 界面, 比如菜单、提示框、选择列表框等, 这并不属于主体内容的一部分, 但却是不可缺少的, 在开发时需要投入大量的时间来开发这部分代码，而且这部分代码会与主体内容的代码搅在一起, 增加代码维护的复杂度。

Overlay 使得 React Native 开发从二维变成三维的, 你可以在页面上覆盖任意层的浮层, 而且浮层界面使用函数方法来激活显示, 你完全可以把浮层代码从页面主体内容的 JSX 中剥离出来。

另外, Overlay 支持多种动画效果, 如淡入淡出、弹出、抽屉效果等, 让你的交互生动起来。

## Static Methods
| Method | Params | Returns | Notes |
|---|---|---|---|
| show | overlayView | key | 显示一个浮层视图, 输入参数 overlayView 为浮层视图, 推荐使用 [Overlay.View](#overlayview--props) 组件, 返回唯一的浮层 key 值。
| hide | key |  | 隐藏一个浮层视图, 输入参数 key 为浮层的 key 值。

## Static Props
| Prop | Type | Default | Note |
|---|---|---|---|
| [View](#overlayview--props) | class |  | 浮层组件, 传入 Overlay.show 函数的组件都应是 Overlay.View 组件或继承自 Overlay.View 的组件。 Overlay.View 是浮层的根组件, 你可以在上面显示任何内容。
| [PullView](#overlaypullview--props) | class |  | 拖拉效果浮层组件, 继承自 Overlay.View, 具有类似抽屉一样的拖拉效果。
| [PopView](#overlaypopview--props) | class |  | 弹出效果浮层组件, 继承自 Overlay.View。
| [PopoverView](#overlaypopoverview--props) | class |  | 气泡效果浮层组件, 继承自 Overlay.View。

## `<Overlay.View />` Props
| Prop | Type | Default | Note |
|---|---|---|---|
| style | 同View.style |  | 浮层样式。
| modal | bool | false | 是否为模态浮层, 非模态浮层在点击内容之外的半透明区域或按返回键(Android only)可关闭浮层, 模态浮层则需要代码手动关闭。
| animated | bool | false | 是否支持动画效果。
| overlayOpacity | number |  | 浮层非内容区域透明度, 值从 0 到 1, 透明度从全透明到不透明。默认值在 Theme 中设置。
| overlayPointerEvents | 同View.pointerEvents | 'auto' | 与 View.pointerEvents 一致。
| autoKeyboardInsets | bool | false | 在弹出键盘时是否自动缩减键盘高度空间。

## `<Overlay.View />` Events
| Event Name | Returns | Notes |
|---|---|---|
| onAppearCompleted |  | 在浮层显示完毕时调用。
| onDisappearCompleted |  | 在浮层隐藏完毕后调用。
| onCloseRequest | overlayView | 在点击内容之外的半透明区域或按返回键(Android only)时调用, 如设置此值 modal 将无效。

## `<Overlay.PullView />` Props
| Prop | Type | Default | Note |
|---|---|---|---|
| [Overlay.View props...](#overlayview--props) |  |  | Overlay.PullView 组件继承 Overlay.View 组件的全部属性。
| side | string | 'bottom' | 抽屉从屏幕哪条边弹出。<br/>- top: 上边<br/>- bottom: 下边<br/>- left: 左边<br/>- right: 右边
| containerStyle | 同View.style |  | 抽屉容器样式。
| rootTransform | string<br/>[Transform] | 'none' | 浮层弹出时根组件转换动画, 可以是字符串或 View.style.transform 类似的数组。<br/>- none: 无转换<br/>- translate: 位移转换, 把根组件往浮层弹出方向移动<br/>- scale: 缩小转换, 缩小倍数在 Theme 中定义<br/>Transform 目前支持 translateX 、 translateY 、 scaleX 、 scaleY, 类型定义：<br/>type Transform {<br/>&ensp;&ensp;translateX: number,<br/>&ensp;&ensp;translateY: number,<br/>&ensp;&ensp;scaleX: number,<br/>&ensp;&ensp;scaleY: number,<br/>}<br/>
| animated | bool | true | 继承自 Overlay.View 并修改默认属性。

## `<Overlay.PullView />` Events
| Event Name | Returns | Notes |
|---|---|---|
| [Overlay.View events...](#overlayview--events) |  | Overlay.PullView 组件继承 Overlay.View 组件的全部事件。

## `<Overlay.PopView />` Props
| Prop | Type | Default | Note |
|---|---|---|---|
| [Overlay.View props...](#overlayview--props) |  |  | Overlay.PopView 组件继承 Overlay.View 组件的全部属性。
| type | string | 'zoomOut' | 弹出效果。<br/>- zoomOut: 缩小, 弹出框放大后动画过度到原大<br/>- zoomIn: 放大, 弹出框缩小后动画过度到原大<br/>- custom: 自定义, 弹出框从 customBounds 位置和大小动画过度到原大
| containerStyle | 同View.style |  | 弹出框容器样式。
| customBounds | Rect |  | 弹出框动画过度起始位置和大小, type = 'custom' 时有效。<br/>type Rect {<br/>&ensp;&ensp;x: number,<br/>&ensp;&ensp;y: number,<br/>&ensp;&ensp;width: number,<br/>&ensp;&ensp;height: number,<br/>}
| animated | bool | true | 继承自 Overlay.View 并修改默认属性。

## `<Overlay.PopView />` Events
| Event Name | Returns | Notes |
|---|---|---|
| [Overlay.View events...](#overlayview--events) |  | Overlay.PopView 组件继承 Overlay.View 组件的全部事件。

## `<Overlay.PopoverView />` Props
| Prop | Type | Default | Note |
|---|---|---|---|
| [Overlay.View props...](#overlayview--props) |  |  | Overlay.PopoverView 组件继承 Overlay.View 组件的全部属性。
| popoverStyle | 同View.style |  | 气泡样式。
| fromBounds | Rect |  | 弹出气泡源组件 bounds, 气泡箭头将指向这个组件。<br/>type Rect {<br/>&ensp;&ensp;x: number,<br/>&ensp;&ensp;y: number,<br/>&ensp;&ensp;width: number,<br/>&ensp;&ensp;height: number,<br/>}
| direction | string | 'down' | 弹出方向。<br/>- down: 向下弹出<br/>- up: 向上弹出<br/>- right: 向右弹出<br/>- left: 向左弹出
| autoDirection | bool | true | 是否自动调整弹出方向, 为 true 时, 如弹出方向屏幕空间不足则往反方向弹出, 例如 direction = 'down' 时, 如 fromBounds 下方的空间不足则往上方弹出。
| directionInsets | number | 0 | 气泡与弹出组件 fromBounds 之间的距离。
| align | string | 'end' | 气泡与弹出组件 fromBounds 的对齐方式。<br/>- start: 起始位置对齐, 上边或左边<br/>- center: 居中对齐<br/>- end: 起始位置对齐, 下边或右边
| alignInsets | number | 0 | 对齐方向偏移量。
| showArrow | bool | true | 是否显示气泡箭头。
| paddingCorner | number |  | 箭头与对齐角的距离。默认值在 Theme 中设置。
| overlayOpacity | number | 0 | 继承自 Overlay.View 并修改默认值。

## `<Overlay.PopoverView />` Events
| Event Name | Returns | Notes |
|---|---|---|
| [Overlay.View events...](#overlayview--events) |  | Overlay.PopoverView 组件继承 Overlay.View 组件的全部事件。

## Example
全透明模态浮层框
```
let overlayView = (
  <Overlay.View
    style={{alignItems: 'center', justifyContent: 'center'}}
    modal={true}
    overlayOpacity={0}
    ref={v => this.overlayView = v}
    >
    <View style={{backgroundColor: '#333', padding: 40, borderRadius: 15, alignItems: 'center'}}>
      <Label style={{color: '#eee'}} size='xl' text='Overlay' />
      <View style={{height: 20}} />
      <Button title='Close' onPress={() => this.overlayView && this.overlayView.close()} />
    </View>
  </Overlay.View>
);
Overlay.show(overlayView);
```

半透明非模态浮层框
```
let overlayView = (
  <Overlay.View
    style={{alignItems: 'center', justifyContent: 'center'}}
    modal={false}
    overlayOpacity={0}
    >
    <View style={{backgroundColor: '#fff', padding: 40, borderRadius: 15, alignItems: 'center'}}>
      <Label style={{color: '#000'}} size='xl' text='Overlay' />
    </View>
  </Overlay.View>
);
Overlay.show(overlayView);
```

拖拉(抽屉)效果浮层框, 常用于多项选择(从屏幕底部拖出)或 Android 左侧抽屉菜单
```
let overlayView = (
  <Overlay.PullView side='bottom' modal={false}>
    <View style={{backgroundColor: '#fff', minWidth: 300, minHeight: 260, justifyContent: 'center', alignItems: 'center'}}>
      <Label type='title' size='xl' text='Pull Overlay' />
    </View>
  </Overlay.PullView>
);
Overlay.show(overlayView);
```

弹出浮层框
```
let overlayView = (
  <Overlay.PopView
    style={{alignItems: 'center', justifyContent: 'center'}}
    >
    <View style={{backgroundColor: '#fff', minWidth: 260, minHeight: 180, borderRadius: 15, justifyContent: 'center', alignItems: 'center'}}>
      <Label type='title' size='xl' text='Pop Overlay' />
    </View>
  </Overlay.PopView>
);
Overlay.show(overlayView);
```

从源组件放大弹出浮层框, 常用于图片全屏放大, fromView 必须是支持 NativeMethodsMixin 的 React Native 原生组件, 如为复合组件需自行实现 measureInWindow 函数, 可参照[Select.js](/components/Select/Select.js)
```
fromView.measureInWindow((x, y, width, height) => {
  let overlayView = (
    <Overlay.PopView
      style={{alignItems: 'center', justifyContent: 'center'}}
      overlayOpacity={1}
      type='custom'
      customBounds={{x, y, width, height}}
      ref={v => this.customPopView = v}
      >
      <TouchableWithoutFeedback onPress={() => this.customPopView && this.customPopView.close()}>
        <Image source={require('../images/faircup.jpg')} resizeMode='cover' />
      </TouchableWithoutFeedback>
    </Overlay.PopView>
  );
  Overlay.show(overlayView);
});
```

弹出气泡浮层框, fromView 必须是支持 NativeMethodsMixin 的 React Native 原生组件, 如为复合组件需自行实现 measureInWindow 函数, 可参照[Select.js](/components/Select/Select.js)
```
fromView.measureInWindow((x, y, width, height) => {
  let popoverStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
  };
  let fromBounds = {x, y, width, height};
  let overlayView = (
    <Overlay.PopoverView
      popoverStyle={popoverStyle}
      fromBounds={fromBounds}
      direction='left'
      align='start'
      directionInsets={4}
      showArrow={true}
    >
      <Label style={{color: '#fff'}} size='lg' text='Popover Overlay' />
    </Overlay.PopoverView>
  );
  Overlay.show(overlayView);
});
```


## Screenshots
![](https://github.com/rilyu/teaset/blob/master/screenshots/15-Overlay1.png?raw=true) ![](https://github.com/rilyu/teaset/blob/master/screenshots/15-Overlay2.png?raw=true)
![](https://github.com/rilyu/teaset/blob/master/screenshots/15-Overlay3.png?raw=true) ![](https://github.com/rilyu/teaset/blob/master/screenshots/15-Overlay6.png?raw=true)
![](https://github.com/rilyu/teaset/blob/master/screenshots/15-Overlay4.png?raw=true) ![](https://github.com/rilyu/teaset/blob/master/screenshots/15-Overlay5.png?raw=true)
