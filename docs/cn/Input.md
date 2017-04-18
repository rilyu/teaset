# `<Input />` 输入框
Input 组件定义一个输入编辑框。

## Props
| Prop | Type | Default | Note |
|---|---|---|---|
| [TextInput props...](https://facebook.github.io/react-native/docs/textinput.html) |  |  | Input 组件继承 TextInput 组件的全部属性。
| size | string | 'md' | 显示尺寸大小。<br/>- lg: 大<br/>- md: 中<br/>- sm: 小<br/>显示效果参见[Screenshots](#screenshots)。
| disabled | bool | false | 组件是否禁用, 为 true 时组件显示为半透明且不可聚焦。 |
| underlineColorAndroid | string | 'rgba(0, 0, 0, 0)' | 继承自 TextInput 并修改默认值。

## Events
| Event Name | Returns | Notes |
|---|---|---|
| [TextInput events...](https://facebook.github.io/react-native/docs/textinput.html) |  | Input 组件继承 TextInput 组件的全部事件。

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
<Input style={{width: 200}} />
```

使用 size、value 属性
```
<Input style={{width: 200}}
  size='lg'
  value={this.state.value}
  onChangeText={text => this.setState({value: text})}
  />
```

只读
```
<Input style={{width: 200}} editable={false} />
```

禁用
```
<Input style={{width: 200}} disabled={true} />
```

自定义
```
<Input
  style={{width: 200, backgroundColor: '#fcf8e3', borderColor: '#8a6d3b', color: '#8a6d3b', textAlign: 'right'}}
  value={this.state.valueCustom}
  onChangeText={text => this.setState({valueCustom: text})}
  />
```


## Screenshots
![](https://github.com/rilyu/teaset/blob/master/screenshots/04-Input.png?raw=true)
