# `{Theme}` 主题

Theme 是 Teaset 的组件样式定义对象, 用于定义 Teaset 组件的默认样式, 默认值见[ThemeDefault.js](/rilyu/teaset/blob/master/themes/ThemeDefault.js)。

Teaset 提供的大部分组件均支持通过 style 属性定义样式, 你可以通过代码修改 Teaset 组件的样式。基于 App 统一风格考虑, 建议通过重定义 Theme 对象的属性来修改 Teaset 组件的样式。

你可以在代码入口处或者任何位置设置 Theme 定义, 如果在 App 运行过程中修改 Theme 定义, 则需要重新加载已渲染的页面。

## Example

```
import {Theme} from 'teaset';

Theme.set({
  primaryColor: '#f55e5d',
  backButtonTitle: '返回',
});

```
