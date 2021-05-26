# Teaset
[🇨🇳中文完整文档版](./docs/cn/README.md)

A UI library for react native, provides 20+ pure JS(ES6) components, focusing on content display and action control.

# Installation
```
npm install --save teaset
```

# Example
Clone teaset project from github (or download zip file):
```
git clone https://github.com/rilyu/teaset.git
cd teaset/example
npm install
```
To run example on iOS:
```
cd ios && pod install && cd ..
react-native run-ios
```
To run example on Android:
```
react-native run-android
```
**Tips: In the Android system, the animations is not smooth, switch to the release mode can be resolved.**

## iPhoneX
iPhoneX and iPhoneXS are fully supported after 0.6.0, and this option is **true** by default.

If SafeAreaView is used, please use ```Theme.set({fitIPhoneX: false})``` to manually turn off it.

## Redux
If you use Redux, you need to use the ```<TopView>``` package container (thanks [@Alexorz](https://github.com/Alexorz) ).

```
import { TopView } from 'teaset';

container => () => <Provider store={store}><TopView>{container}</TopView></Provider>
```

# Documentation
The document is being written, please refer to the example source code.

[Translation project](https://github.com/emersonlaurentino/teaset/projects/1)

# Screenshots

## Components
![](https://github.com/rilyu/teaset/blob/master/screenshots/00-Teaset1.png?raw=true) ![](https://github.com/rilyu/teaset/blob/master/screenshots/00-Teaset2.png?raw=true)

## Theme
![](https://github.com/rilyu/teaset/blob/master/screenshots/00a-Theme1.png?raw=true) ![](https://github.com/rilyu/teaset/blob/master/screenshots/00a-Theme2.png?raw=true)
![](https://github.com/rilyu/teaset/blob/master/screenshots/00a-Theme3.png?raw=true)

## Label
![](https://github.com/rilyu/teaset/blob/master/screenshots/01-Label.png?raw=true)

## Button
![](https://github.com/rilyu/teaset/blob/master/screenshots/02-Button.png?raw=true)

## Checkbox
![](https://github.com/rilyu/teaset/blob/master/screenshots/03-Checkbox.png?raw=true)

## Input
![](https://github.com/rilyu/teaset/blob/master/screenshots/04-Input.png?raw=true)

## Select
![](https://github.com/rilyu/teaset/blob/master/screenshots/05-Select1.png?raw=true) ![](https://github.com/rilyu/teaset/blob/master/screenshots/05-Select2.png?raw=true)
![](https://github.com/rilyu/teaset/blob/master/screenshots/05-Select3.png?raw=true)

## Stepper
![](https://github.com/rilyu/teaset/blob/master/screenshots/05a-Stepper.png?raw=true)

## SearchInput
![](https://github.com/rilyu/teaset/blob/master/screenshots/05b-SearchInput.png?raw=true)

## Badge
![](https://github.com/rilyu/teaset/blob/master/screenshots/06-Badge.png?raw=true)

## Popover
![](https://github.com/rilyu/teaset/blob/master/screenshots/07-Popover.png?raw=true)

## NavigationBar
![](https://github.com/rilyu/teaset/blob/master/screenshots/08-NavigationBar.png?raw=true)

## ListRow
![](https://github.com/rilyu/teaset/blob/master/screenshots/09-ListRow.png?raw=true)

## Carousel
![](https://github.com/rilyu/teaset/blob/master/screenshots/10-Carousel.png?raw=true)

## Projector
![](https://github.com/rilyu/teaset/blob/master/screenshots/11-Projector.png?raw=true)

## SegmentedBar
![](https://github.com/rilyu/teaset/blob/master/screenshots/11a-SegmentedBar1.png?raw=true) ![](https://github.com/rilyu/teaset/blob/master/screenshots/11a-SegmentedBar2.png?raw=true)
![](https://github.com/rilyu/teaset/blob/master/screenshots/11a-SegmentedBar3.png?raw=true)

## SegmentedView
![](https://github.com/rilyu/teaset/blob/master/screenshots/12-SegmentedView.png?raw=true)

## TabView
![](https://github.com/rilyu/teaset/blob/master/screenshots/13-TabView.png?raw=true) ![](https://github.com/rilyu/teaset/blob/master/screenshots/13-TabView2.png?raw=true)

## TransformView
![](https://github.com/rilyu/teaset/blob/master/screenshots/14-TransformView.png?raw=true)

## AlbumView
![](https://github.com/rilyu/teaset/blob/master/screenshots/14a-AlbumView1.png?raw=true) ![](https://github.com/rilyu/teaset/blob/master/screenshots/14a-AlbumView2.png?raw=true)

## Wheel
![](https://github.com/rilyu/teaset/blob/master/screenshots/14b-Wheel.png?raw=true)

## Overlay
![](https://github.com/rilyu/teaset/blob/master/screenshots/15-Overlay1.png?raw=true) ![](https://github.com/rilyu/teaset/blob/master/screenshots/15-Overlay2.png?raw=true)
![](https://github.com/rilyu/teaset/blob/master/screenshots/15-Overlay3.png?raw=true) ![](https://github.com/rilyu/teaset/blob/master/screenshots/15-Overlay6.png?raw=true)
![](https://github.com/rilyu/teaset/blob/master/screenshots/15-Overlay4.png?raw=true) ![](https://github.com/rilyu/teaset/blob/master/screenshots/15-Overlay5.png?raw=true)

## Toast
![](https://github.com/rilyu/teaset/blob/master/screenshots/16-Toast1.png?raw=true) ![](https://github.com/rilyu/teaset/blob/master/screenshots/16-Toast2.png?raw=true)
![](https://github.com/rilyu/teaset/blob/master/screenshots/16-Toast3.png?raw=true)

## ActionSheet
![](https://github.com/rilyu/teaset/blob/master/screenshots/17-ActionSheet.png?raw=true)

## ActionPopover
![](https://github.com/rilyu/teaset/blob/master/screenshots/18-ActionPopover.png?raw=true)

## PullPicker
![](https://github.com/rilyu/teaset/blob/master/screenshots/19-PullPicker.png?raw=true)

## PopoverPicker
![](https://github.com/rilyu/teaset/blob/master/screenshots/20-PopoverPicker.png?raw=true)

## Menu
![](https://github.com/rilyu/teaset/blob/master/screenshots/20a-Menu1.png?raw=true) ![](https://github.com/rilyu/teaset/blob/master/screenshots/20a-Menu2.png?raw=true)

## Drawer
![](https://github.com/rilyu/teaset/blob/master/screenshots/20b-Drawer1.png?raw=true) ![](https://github.com/rilyu/teaset/blob/master/screenshots/20b-Drawer2.png?raw=true)

## ModalIndicator
![](https://github.com/rilyu/teaset/blob/master/screenshots/21-ModalIndicator.png?raw=true)

# License
MIT