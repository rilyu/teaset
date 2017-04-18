# `PullPicker{}` 上拉选择器
PullPicker 为上拉选择器静态类, 一般用于触发显示一个数据列表供用户选择, 表现形式为从屏幕下方拖出抽屉。<br/>PullPicker 基于 [Overlay{}](./Overlay.md) 实现。

## Static Methods
| Method | Params | Returns | Notes |
|---|---|---|---|
| [Overlay methods](./Overlay.md) |  |  | PullPicker 继承 Overlay 的全部静态方法。
| show | title, items, selectedIndex, onSelected, options | key | 显示一个上拉选择器, 重写 [Overlay{}](./Overlay.md) 中的同名函数, 输入参数 title 为列表标题, items 为可选项列表, selectedIndex 为已选项编号, onSelected 为选择某项时的回调函数, options(可空)为 PullPicker.PullPickerView 其它属性, 参数类型参见 [PullPickerView](#pullpickerpullpickerview--props)。<br/>返回唯一的浮层 key 值。

## Static Props
| Prop | Type | Default | Note |
|---|---|---|---|
| [PullPickerView](#pullpickerpullpickerview--props) | class |  | PullPicker 内容显示组件。

## `<PullPicker.PullPickerView />` Props
| Prop | Type | Default | Note |
|---|---|---|---|
| [Overlay.PullView props...](./Overlay.md#overlaypullview--props) |  |  | PullPicker.PullPickerView 组件继承 Overlay.PullView 组件的全部属性。
| title | string |  | 列表标题。
| items | array |  | 可选项列表, 数组元素可以是任何类型。
| selectedIndex | number |  | 当前已选择项编号。
| getItemText | func |  | 取 items 数组元素的显示文本, 传入参数为(item, index), item = items[index], 默认直接使用 item

## `<PullPicker.PullPickerView />` Events
| Event Name | Returns | Notes |
|---|---|---|
| [Overlay.PullView events...](./Overlay.md#overlaypullview--props) |  | PullPicker.PullPickerView 组件继承 Overlay.PullView 组件的全部事件。
| onSelected | item, index | 当选择器选择 items 数组某项时调用, item = items[index]。

## `<PullPicker.PullPickerView />` Static Props
| Prop | Type | Default | Note |
|---|---|---|---|
| [Item](#pullpickerpullpickerviewitem--props) | class |  | PullPicker 可选项显示组件。

## `<PullPicker.PullPickerView.Item />` Props
| Prop | Type | Default | Note |
|---|---|---|---|
| [ListRow props...](./ListRow.md) |  |  | PullPicker.PullPickerView.Item 组件继承 ListRow 组件的全部属性。
| selected | bool |  | 是否已选中。

## Example
简单用法
```
let items = [
  'Apple',
  'Banana',
  'Cherry',
  'Durian',
  'Filbert',
  'Grape',
  'Hickory',
  'Lemon',
  'Mango',
];
PullPicker.show(
  'Select item',
  items,
  this.state.selectedIndex,
  (item, index) => this.setState({selectedIndex: index})
);
```


## Screenshots
![](https://github.com/rilyu/teaset/blob/master/screenshots/19-PullPicker.png?raw=true)
