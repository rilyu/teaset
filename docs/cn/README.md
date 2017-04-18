# Teaset
[English version](/README.md)

React Native UI 组件库, 超过 20 个纯 JS(ES6) 组件, 专注于内容展示和操作控制。

Teaset 设计精巧, 不依赖任何第三方库, 全部源代码不压缩时也只有 300+k, 即使加上图标文件也不足 600k, 如果只需要使用其中的少量组件, 也可以使用按需加载方式只加载需要使用的组件。

Teaset 组件采用 React Native 原生组件同样的风格来编写, 可以与 React Native 无缝融合开发, 你不需要太多的学习成本即可掌握。由于使用纯 JS 开发, 因此在 iOS 和 Android 下的表现形式几乎一样。

利用 Teaset, 你可以快速搭建 App 页面框架, 丰富的 UI 组件大大改善页面开发效率, 强大的 Overlay 浮层类把你从繁琐的交互控制中解放出来, 使得你可以专注于业务与逻辑。


![](https://github.com/rilyu/teaset/blob/master/screenshots/00-Teaset1.png?raw=true) ![](https://github.com/rilyu/teaset/blob/master/screenshots/00-Teaset2.png?raw=true)

# 快速上手

## 安装
在你的 React Native App 工程根目录下执行以下命令进行安装:
```
npm install --save teaset
```

## Hello world
从 teaset 包中 import 组件即可使用
```
import React, {Component} from 'react';
import {View, AppRegistry} from 'react-native';

import {Label} from 'teaset';

class HelloWorldApp extends Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Label size='xl' text='Hello world!' />
      </View>
    );
  }
}

AppRegistry.registerComponent('HelloWorldApp', () => HelloWorldApp);
```
## 按需加载
使用单独 import 组件实现按需加载
```
import Label from 'teaset/components/Label/Label';
```

## 运行示例程序
在 Teaset 包目录下执行以下命令:
```
cd example
npm install
```
在 iOS 下运行:
```
react-native run-ios
```
在 Android 下运行:
```
react-native run-android
```

# 文档
中文文档已编写完成, 暂时没时间编写英文文档, 如果你乐意为 Teaset 贡献力量, 欢迎 PR。

## 主题
[`{Theme}` 主题](./Theme.md)

## 基础组件
[`<Label />` 标签](./Label.md)

[`<Button />` 按钮](./Button.md)

[`<Checkbox />` 复选框](./Checkbox.md)

[`<Input />` 输入框](./Input.md)

[`<Select />` 选择框](./Select.md)

[`<Stepper />` 步进器](./Stepper.md)

[`<SearchInput />` 搜索输入框](./SearchInput.md)

[`<Badge />` 徽章](./Badge.md)

[`<Popover />` 气泡](./Popover.md)

## 复合组件
[`<NavigationBar />` 导航栏](./NavigationBar.md)

[`<ListRow />` 列表行](./ListRow.md)

[`<Carousel />` 走马灯](./Carousel.md)

[`<Projector />` 幻灯机](./Projector.md)

[`<SegmentedView />` 分段器](./SegmentedView.md)

[`<TabView />` 标签页](./TabView.md)

[`<TransformView />` 可变视图](./TransformView.md)

## 浮层
[`Overlay{}` 浮层](./Overlay.md)

[`Toast{}` 轻提示](./Toast.md)

[`ActionSheet{}` 操作选单](./ActionSheet.md)

[`ActionPopover{}` 操作气泡](./ActionPopover.md)

[`PullPicker{}` 上拉选择器](./PullPicker.md)

[`PopoverPicker{}` 气泡选择器](./PopoverPicker.md)

[`Menu{}` 菜单](./Menu.md)

[`ModalIndicator{}` 模态指示器](./ModalIndicator.md)

## 页面
[`<TeaNavigator />` 导航器](./TeaNavigator.md)

[`<BasePage />` 基础页面](./BasePage.md)

[`<NavigationPage />` 导航页面](./NavigationPage.md)

# License
MIT