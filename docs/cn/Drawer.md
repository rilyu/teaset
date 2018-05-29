# `Drawer{}` 抽屉
Drawer 为抽屉静态类, 内部视图为 Overlay.PullView 的易用性简单封装。<br/>Drawer 基于 [Overlay{}](./Overlay.md) 实现。

## Static Methods
| Method | Params | Returns | Notes |
|---|---|---|---|
| [Overlay methods](./Overlay.md) |  |  | Drawer 继承 Overlay 的全部静态方法。
| open | view, side, rootTransform options | object | 打开一个抽屉。 参数说明：<br/>- view: 抽屉内部视图内容<br/>- side: 抽屉拉出边, 默认为 'left'<br/>- rootTransform: 根组件转换动画, 默认为 'none'<br/>- options: Drawer.DrawerView 其它属性, 参数类型参见 [DrawerView](#drawerdrawerview--props)<br/>返回值为一个对象, 对象属性说明：<br>- key: 浮层唯一键值<br/>- close: 关上抽屉函数, 调用该函数将关上抽屉

## Static Props
| Prop | Type | Default | Note |
|---|---|---|---|
| [DrawerView](#drawerdrawerview--props) | class |  | Drawer 内容显示组件。

## `<Drawer.DrawerView />` Props
| Prop | Type | Default | Note |
|---|---|---|---|
| [Overlay.PullView props...](./Overlay.md#overlaypullview--props) |  |  | Drawer.DrawerView 组件继承 Overlay.PullView 组件的全部属性。

## `<Drawer.DrawerView />` Events
| Event Name | Returns | Notes |
|---|---|---|
| [Overlay.PullView events...](./Overlay.md#overlaypullview--props) |  | Drawer.DrawerView 组件继承 Overlay.PullView 组件的全部事件。

## Example
简单用法
```
let view = (
  <View style={{backgroundColor: Theme.defaultColor, height: 260}}>
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Label type='detail' size='xl' text='Drawer' />
    </View>
  </View>
);
let drawer = Drawer.open(view, 'bottom');

...

drawer.close(); //如需要可代码手动关上抽屉
```

## Screenshots
![](https://github.com/rilyu/teaset/blob/master/screenshots/20b-Drawer1.png?raw=true) ![](https://github.com/rilyu/teaset/blob/master/screenshots/20b-Drawer2.png?raw=true)
