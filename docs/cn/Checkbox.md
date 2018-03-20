# `<Checkbox />` 复选框
Checkbox 组件定义一个复选框, 具有选中、非选中两种状态。

## Props
| Prop | Type | Default | Note |
|---|---|---|---|
| [TouchableOpacity props...](https://facebook.github.io/react-native/docs/touchableopacity.html) |  |  | Checkbox 组件继承 TouchableOpacity 组件的全部属性。
| checked | bool | false | 是否勾选。
| defaultChecked | bool | false | 默认是否勾选，仅创建时使用一次，不想自行监听维护 checked 状态时用 defaultChecked 代替。
| size | string | 'md' | 显示尺寸大小。<br/>- lg: 大<br/>- md: 中<br/>- sm: 小<br/>显示效果参见[Screenshots](#screenshots)。
| title | string<br/>number<br/>element |  | 标题, 可以是字符串、数字或 React Native 组件。
| titleStyle | 同Text.style |  | 标题样式, 当 title 类型为 element 时无效。
| checkedIcon | 同Image.source<br/>element |  | 已勾选图标
| checkedIconStyle | 同Image.style |  | 已勾选图标样式
| uncheckedIcon | 同Image.source<br/>element |   | 未勾选图标
| uncheckedIconStyle | 同Image.style |  | 未勾选图标样式
| disabled | bool | false | 继承自 TouchableOpacity, 为 true 时组件显示为半透明且不可触摸。
| hitSlop | 同TouchableOpacity.hitSlop | {top: 8, bottom: 8,<br/>left: 8, right: 8} | 继承自 TouchableOpacity 并修改默认值。

## Events
| Event Name | Returns | Notes |
|---|---|---|
| [TouchableOpacity events...](https://facebook.github.io/react-native/docs/touchableopacity.html) |  | Checkbox 组件继承 TouchableOpacity 组件的全部事件。
| onChange | checked | 当 checked 状态发生变更时调用, 值为修改后的 checked。

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
<Checkbox
  title='Default'
  checked={this.state.checked}
  onChange={checked => this.setState({checked})}
  />
```

使用 size 属性
```
<Checkbox
  title='Large'
  size='lg'
  checked={this.state.checked}
  onChange={checked => this.setState({checked})}
  />
```

自定义
```
<Checkbox
  title='Custom'
  titleStyle={{color: '#8a6d3b', paddingLeft: 4}}
  checkedIcon={<Image style={{width: 15, height: 15, tintColor: '#8a6d3b'}} source={require('../icons/checkbox_checked.png')} />}
  uncheckedIcon={<Image style={{width: 15, height: 15, tintColor: '#8a6d3b'}} source={require('../icons/checkbox_unchecked.png')} />}
  checked={this.state.checkedCustom}
  onChange={checked => this.setState({checkedCustom: checked})}
  />
```


## Screenshots
![](https://github.com/rilyu/teaset/blob/master/screenshots/03-Checkbox.png?raw=true)
