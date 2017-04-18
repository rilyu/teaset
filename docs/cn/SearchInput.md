# `<SearchInput />` 搜索输入框
SearchInput 组件定义一个搜索输入框, 与 Input 的区别是有多一个放大镜图标, 在内容为空时且不在编辑状态时居中显示, 否则左对齐。

## Props
| Prop | Type | Default | Note |
|---|---|---|---|
| [TextInput props...](https://facebook.github.io/react-native/docs/textinput.html) |  |  | SearchInput 组件继承 View 组件的全部属性。
| style | 同View.style |  | 组件样式, 也就是组件的容器 View 的样式。
| inputStyle | 同TextInput.style |  | 输入框样式。
| iconSize | number |  | 放大镜图标长宽尺寸, 默认值在 Theme 中设置。
| disabled | bool | false | 是否禁用, 为 true 时组件显示为半透明且不可触摸。
| underlineColorAndroid | string | 'rgba(0, 0, 0, 0)' | 继承自 TextInput 并修改默认值。

## Events
| Event Name | Returns | Notes |
|---|---|---|
| [TextInput events...](https://facebook.github.io/react-native/docs/textinput.html) |  | SearchInput 组件继承 TextInput 组件的全部事件。

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
<SearchInput style={{width: 200}} placeholder='Enter text' />
```

只读
```
<SearchInput style={{width: 200}} placeholder='Enter text' editable={false} />
```

禁用
```
<SearchInput style={{width: 200}} placeholder='Enter text' disabled={true} />
```

自定义
```
<SearchInput
  style={{width: 200, height: 40, backgroundColor: '#fcf8e3', borderColor: '#8a6d3b'}}
  inputStyle={{color: '#8a6d3b', fontSize: 18}}
  iconSize={15}
  value={this.state.valueCustom}
  placeholder='Custom'
  placeholderTextColor='#aaa'
  onChangeText={text => this.setState({valueCustom: text})}
  />
```


## Screenshots
![](https://github.com/rilyu/teaset/blob/master/screenshots/05b-SearchInput.png?raw=true)
