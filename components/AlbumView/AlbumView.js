// AlbumView.js

'use strict';

import React, {Component} from "react";
import PropTypes from 'prop-types';
import {StyleSheet, View, Image, Animated, ViewPropTypes} from 'react-native';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

import Theme from 'teaset/themes/Theme';
import AlbumSheet from './AlbumSheet';
import CarouselControl from '../Carousel/CarouselControl';

export default class AlbumView extends Component {

  static propTypes = {
    ...ViewPropTypes,
    images: PropTypes.arrayOf(PropTypes.oneOfType([Image.propTypes.source, PropTypes.element])).isRequired,
    thumbs: PropTypes.arrayOf(Image.propTypes.source),
    defaultIndex: PropTypes.number,
    index: PropTypes.number,
    maxScale: PropTypes.number,
    space: PropTypes.number,
    control: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
    onWillChange: PropTypes.func, //(index, oldIndex)
    onChange: PropTypes.func, //(index, oldIndex)
    onPress: PropTypes.func, //(index, event)
    onLongPress: PropTypes.func, //(index, event)
    onWillLoadImage: PropTypes.func, //(index)
    onLoadImageSuccess: PropTypes.func, //(index, width, height)
    onLoadImageFailure: PropTypes.func, //(index, error)
  };

  static defaultProps = {
    ...View.defaultProps,
    defaultIndex: 0,
    maxScale: 3,
    space: 20,
    control: false,
  };

  static Sheet = AlbumSheet;
  static Control = CarouselControl;

  constructor(props) {
    super(props);
    this.animateActions = [];
    this.layout = {x: 0, y: 0, width: 0, height: 0};
    let index = props.index || props.index === 0 ? props.index : props.defaultIndex;
    this.state = {
      index: index,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.index || nextProps.index === 0) && nextProps.index != this.props.index) {
      this.changeIndex(nextProps.index);
    }
  }

  needLoad(index) {
    return index >= this.state.index - 1 && index <= this.state.index + 1;
  }

  changeIndex(newIndex) {
    let {index} = this.state;
    if (newIndex == index) return;

    this.props.onWillChange && this.props.onWillChange(index, newIndex);
    this.setState({index: newIndex});

    let sheet = this.refs['sheet' + index];
    let nextSheet = this.refs['sheet' + newIndex];
    let toPosition = newIndex > index ? 'left' : 'right';

    this.animateActions = [];
    sheet && sheet.scrollTo(toPosition, true, (variable, toValue) => {
      this.animateActions.push({variable, toValue})
    });
    nextSheet && nextSheet.scrollTo('center', true, (variable, toValue) => {
      this.animateActions.push({variable, toValue})
    });
    if (this.animateActions.length === 0) return;

    Animated.parallel(this.animateActions.map((item, index) =>
      Animated.spring(item.variable, {toValue: item.toValue, friction: 9})
    )).start(e => {
      this.props.onChange && this.props.onChange(newIndex, index);
    });

  }

  checkStopScroll() {
    this.animateActions.map((item, index) => {
      item.variable.stopAnimation();
      item.variable.setValue(item.toValue);
    });
    this.animateActions = [];
  }

  checkScroll(translateX) {
    let {images} = this.props;
    let {index} = this.state;

    let {x, y, width, height} = this.refs['sheet' + index].contentLayout;
    let ltx = translateX, rtx = translateX;
    if (width > this.layout.width) {
      ltx = x;
      rtx = x + (width - this.layout.width);
    }
    let triggerWidth = this.layout.width / 3;

    if ((ltx < triggerWidth && rtx > -triggerWidth)
      || (ltx >= triggerWidth && index === 0)
      || (rtx <= -triggerWidth && index === images.length - 1)) {
      index > 0 && this.refs['sheet' + (index - 1)].scrollX(0, true);
      index < (images.length - 1) && this.refs['sheet' + (index + 1)].scrollX(0, true);
      return true;
    }

    this.changeIndex(ltx >= triggerWidth ? index - 1 : index + 1);

    return false;
  }

  // for CarouselControl
  scrollToPage(newIndex) {
    this.changeIndex(newIndex);
  }

  onTransforming(translateX, translateY, scale) {
    let saveScale = this.saveScale;
    this.saveScale = scale;
    if (scale < 1 || (saveScale && scale < saveScale)) {
      return;
    }

    let {images} = this.props;
    let {index} = this.state;
    let {x, y, width, height} = this.refs['sheet' + index].contentLayout;
    let ltx = translateX, rtx = translateX;
    if (width > this.layout.width) {
      ltx = x;
      rtx = x + (width - this.layout.width);
    }

    index > 0 && this.refs['sheet' + (index - 1)].scrollX(ltx, false);
    index < (images.length - 1) && this.refs['sheet' + (index + 1)].scrollX(rtx, false);
  }

  onWillInertialMove(translateX, translateY, newX, newY) {
    return this.checkScroll(newX);
  }

  onWillMagnetic(translateX, translateY, scale, newX, newY, newScale) {
    return scale < 1 || this.checkScroll(translateX);
  }

  renderImage(index) {
    let {images, thumbs, maxScale, space, onPress, onLongPress, onWillLoadImage, onLoadImageSuccess, onLoadImageFailure} = this.props;

    let position = 'center';
    if (index < this.state.index) position = 'left';
    else if (index > this.state.index) position = 'right';

    return (
      <AlbumSheet
        style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}
        pointerEvents={index === this.state.index ? 'auto' : 'none'}
        minScale={1}
        maxScale={maxScale}
        magnetic={true}
        tension={false}
        image={images[index]}
        thumb={thumbs instanceof Array && thumbs.length > index ? thumbs[index] : null}
        defaultPosition={position}
        space={space}
        load={index >= this.state.index - 1 && index <= this.state.index + 1}
        onWillTransform={() => this.checkStopScroll()}
        onTransforming={(translateX, translateY, scale) => this.onTransforming(translateX, translateY, scale)}
        onWillInertialMove={(translateX, translateY, newX, newY) => this.onWillInertialMove(translateX, translateY, newX, newY)}
        onWillMagnetic={(translateX, translateY, scale, newX, newY, newScale) => this.onWillMagnetic(translateX, translateY, scale, newX, newY, newScale)}
        onPress={e => onPress && onPress(index, e)}
        onLongPress={e => onLongPress && onLongPress(index, e)}
        onWillLoadImage={() => onWillLoadImage && onWillLoadImage(index)}
        onLoadImageSuccess={(width, height) => onLoadImageSuccess && onLoadImageSuccess(index, width, height)}
        onLoadImageFailure={error => onLoadImageFailure && onLoadImageFailure(index, error)}
        ref={'sheet' + index}
        key={'sheet' + index}
        />
    );
  }

  render() {
    let {images, thumbs, defaultIndex, index, maxScale, space, control, children, onLayout, onWillChange, onChange, onPress, onLongPress, onWillLoadImage, onLoadImageSuccess, onLoadImageFailure, ...others} = this.props;

    if (React.isValidElement(control)) {
      control = React.cloneElement(control, {index: this.state.index, total: images.length, carousel: this});
    } else if (control) {
      control = <this.constructor.Control style={{paddingBottom: Theme.screenInset.bottom}} index={this.state.index} total={images.length} carousel={this} />
    }

    return (
      <View
        onLayout={e => {
          this.layout = e.nativeEvent.layout;
          onLayout && onLayout(e);
        }}
        {...others}
      >
        {images.map((item, index) => this.renderImage(index))}
        {control}
      </View>
    );
  }

}
