// Home.js

'use strict';

import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';

import {Theme, NavigationPage, NavigationBar, ListRow} from 'teaset';
import ThemeExample from './ThemeExample';
import LabelExample from './LabelExample';
import ButtonExample from './ButtonExample';
import CheckboxExample from './CheckboxExample';
import InputExample from './InputExample';
import SelectExample from './SelectExample';
import StepperExample from './StepperExample';
import SearchInputExample from './SearchInputExample';
import BadgeExample from './BadgeExample';
import PopoverExample from './PopoverExample';
import NavigationBarExample from './NavigationBarExample';
import ListRowExample from './ListRowExample';
import CarouselExample from './CarouselExample';
import ProjectorExample from './ProjectorExample';
import SegmentedBarExample from './SegmentedBarExample';
import SegmentedViewExample from './SegmentedViewExample';
import TabViewExample from './TabViewExample';
import TransformViewExample from './TransformViewExample';
import AlbumViewExample from './AlbumViewExample';
import WheelExample from './WheelExample';
import OverlayExample from './OverlayExample';
import ToastExample from './ToastExample';
import ActionSheetExample from './ActionSheetExample';
import ActionPopoverExample from './ActionPopoverExample';
import PullPickerExample from './PullPickerExample';
import PopoverPickerExample from './PopoverPickerExample';
import MenuExample from './MenuExample';
import DrawerExample from './DrawerExample';
import ModalIndicatorExample from './ModalIndicatorExample';

export default class Home extends NavigationPage {

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'Teaset Example',
  };

  renderPage() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={{height: 20}} />
        <ListRow title='Theme' detail='主题' onPress={() => this.navigator.push({view: <ThemeExample />})} topSeparator='full' />
        <ListRow title='Label' detail='标签' onPress={() => this.navigator.push({view: <LabelExample />})} />
        <ListRow title='Button' detail='按钮' onPress={() => this.navigator.push({view: <ButtonExample />})} />
        <ListRow title='Checkbox' detail='复选框' onPress={() => this.navigator.push({view: <CheckboxExample />})} />
        <ListRow title='Input' detail='输入框' onPress={() => this.navigator.push({view: <InputExample />})} />
        <ListRow title='Select' detail='选择框' onPress={() => this.navigator.push({view: <SelectExample />})} />
        <ListRow title='Stepper' detail='步进器' onPress={() => this.navigator.push({view: <StepperExample />})} />
        <ListRow title='SearchInput' detail='搜索输入框' onPress={() => this.navigator.push({view: <SearchInputExample />})} />
        <ListRow title='Badge' detail='徽章' onPress={() => this.navigator.push({view: <BadgeExample />})} />
        <ListRow title='Popover' detail='气泡' onPress={() => this.navigator.push({view: <PopoverExample />})} />
        <ListRow title='NavigationBar' detail='导航栏' onPress={() => this.navigator.push({view: <NavigationBarExample />})} />
        <ListRow title='ListRow' detail='列表行' onPress={() => this.navigator.push({view: <ListRowExample />})} />
        <ListRow title='Carousel' detail='走马灯' onPress={() => this.navigator.push({view: <CarouselExample />})} />
        <ListRow title='Projector' detail='幻灯机' onPress={() => this.navigator.push({view: <ProjectorExample />})} />
        <ListRow title='SegmentedBar' detail='分段工具条' onPress={() => this.navigator.push({view: <SegmentedBarExample />})} />
        <ListRow title='SegmentedView' detail='分段器' onPress={() => this.navigator.push({view: <SegmentedViewExample />})} />
        <ListRow title='TabView' detail='标签页' onPress={() => this.navigator.push({view: <TabViewExample />})} />
        <ListRow title='TransformView' detail='可变视图' onPress={() => this.navigator.push({view: <TransformViewExample />})} />
        <ListRow title='AlbumView' detail='相册视图' onPress={() => this.navigator.push({view: <AlbumViewExample />})} />
        <ListRow title='Wheel' detail='滚轮' onPress={() => this.navigator.push({view: <WheelExample />})} />
        <ListRow title='Overlay' detail='浮层' onPress={() => this.navigator.push({view: <OverlayExample />})} />
        <ListRow title='Toast' detail='轻提示' onPress={() => this.navigator.push({view: <ToastExample />})} />
        <ListRow title='ActionSheet' detail='操作选单' onPress={() => this.navigator.push({view: <ActionSheetExample />})} />
        <ListRow title='ActionPopover' detail='操作气泡' onPress={() => this.navigator.push({view: <ActionPopoverExample />})} />
        <ListRow title='PullPicker' detail='上拉选择器' onPress={() => this.navigator.push({view: <PullPickerExample />})} />
        <ListRow title='PopoverPicker' detail='气泡选择器' onPress={() => this.navigator.push({view: <PopoverPickerExample />})} />
        <ListRow title='Menu' detail='菜单' onPress={() => this.navigator.push({view: <MenuExample />})} />
        <ListRow title='Drawer' detail='抽屉' onPress={() => this.navigator.push({view: <DrawerExample />})} />
        <ListRow title='ModalIndicator' detail='模态指示器' onPress={() => this.navigator.push({view: <ModalIndicatorExample />})} bottomSeparator='full' />
        <View style={{height: Theme.screenInset.bottom}} />
      </ScrollView>
    );
  }

}
