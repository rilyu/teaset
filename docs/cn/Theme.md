# `{Theme}` 主题

Theme 是 Teaset 的组件样式定义对象, 用于定义 Teaset 组件的默认样式。

Teaset 提供的大部分组件均支持通过 style 属性定义样式, 可以通过代码修改 Teaset 组件的样式。基于 App 统一风格考虑, 建议通过重定义 Theme 对象的属性来修改 Teaset 组件的样式。

Teaset 提供 default 、 black 、 violet 三种配色方案, 默认值见[ThemeDefault.js](/themes/ThemeDefault.js)、[ThemeBlack.js](/themes/ThemeBlack.js)、[ThemeViolet.js](/themes/ThemeViolet.js), 可以自定义完整的配色方案, 也可使用上述一种方案并修改部分默认值。

建议在代码入口处设置 Theme 定义, 如果在 App 运行过程中修改 Theme 定义, 则需要重新加载已渲染的页面。

## Example
修改配色方案
```
import {Theme} from 'teaset';

Theme.set(Theme.themes.black);

```

修改部分默认值
```
import {Theme} from 'teaset';

Theme.set({
  primaryColor: '#f55e5d',
  backButtonTitle: '返回',
});

```

## Screenshots
![](https://github.com/rilyu/teaset/blob/master/screenshots/00a-Theme2.png?raw=true) ![](https://github.com/rilyu/teaset/blob/master/screenshots/00a-Theme3.png?raw=true)
