# `Menu{}` 菜单
Menu 为菜单静态类, 用于触发显示一个弹出菜单供用户选择, 表现形式为从触发源组件弹出的气泡。<br/>Menu 基于 [Overlay{}](./Overlay.md) 实现。

## Static Methods
| Method | Params | Returns | Notes |
|---|---|---|---|
| [Overlay methods](./Overlay.md) |  |  | Menu 继承 Overlay 的全部静态方法。
| show | fromBounds, items, options | key | 显示一个弹出菜单, 重写 [Overlay{}](./Overlay.md) 中的同名函数, 输入参数 fromBounds 为弹出菜单源组件 bounds, items 为菜单项列表, options(可空)为 Menu.MenuView 其它属性, 参数类型参见 [MenuView](#menumenuview--props)。<br/>返回唯一的浮层 key 值。

## Static Props
| Prop | Type | Default | Note |
|---|---|---|---|
| [MenuView](#menumenuview--props) | class |  | Menu 内容显示组件。

## `<Menu.MenuView />` Props
| Prop | Type | Default | Note |
|---|---|---|---|
| [Overlay.PopoverView props...](./Overlay.md#overlaypopoverview--props) |  |  | Menu.MenuView 组件继承 Overlay.PopoverView 组件的全部属性。
| items | array |  | 菜单项列表, 数组元素类型为: <br/>type MenuViewItem {<br/>&ensp;&ensp;title: string,<br/>&ensp;&ensp;icon: any,<br/>&ensp;&ensp;onPress: func,<br/>}<br/>icon 详细类型参见[Menu.MenuView.Item](#menumenuviewitem--props)
| shadow | bool | true | 是否显示阴影(iOS only)。
| direction | string | 'down' | 继承自 Overlay.PopoverView 并修改默认值。
| align | string | 'center' | 继承自 Overlay.PopoverView 并修改默认值。
| showArrow | bool | false | 继承自 Overlay.PopoverView 并修改默认值。

## `<Menu.MenuView />` Static Props
| Prop | Type | Default | Note |
|---|---|---|---|
| [Item](#menumenuviewitem--props) | class |  | Menu 菜单项显示组件。

## `<Menu.MenuView.Item />` Props
| Prop | Type | Default | Note |
|---|---|---|---|
| [TouchableOpacity props...](https://facebook.github.io/react-native/docs/touchableopacity.html) |  |  | Menu.MenuView.Item 组件继承 TouchableOpacity 组件的全部属性。
| title | string<br/>number<br/>element |  | 标题, 可以是字符串、数字或 React Native 组件。
| icon | string<br/>同Image.source<br/>element | 'none' | 图标, 可以是 string 枚举、 Image.source 或 React Native 组件。<br/>- none: 无图标<br/>- empty: 空图标, 显示为空白并占用图标显示大小的空间

## Example
简单用法, fromView 必须是支持 NativeMethodsMixin 的 React Native 原生组件, 如为复合组件需自行实现 measureInWindow 函数, 可参照[Select.js](/components/Select/Select.js)
```
fromView.measureInWindow((x, y, width, height) => {
  let items = [
    {title: 'Search', icon: require('../icons/search.png'), onPress: () => alert('Search')},
    {title: 'Edit', icon: require('../icons/edit.png'), onPress: () => alert('Edit')},
    {title: 'Remove', icon: require('../icons/trash.png'), onPress: () => alert('Remove')},
  ];
  Menu.show({x, y, width, height}, items);
});
```


## Screenshots
![](https://github.com/rilyu/teaset/blob/master/screenshots/20a-Menu1.png?raw=true) ![](https://github.com/rilyu/teaset/blob/master/screenshots/20a-Menu2.png?raw=true)
