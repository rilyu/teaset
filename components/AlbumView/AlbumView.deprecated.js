// AlbumView.js

'use strict';

import React, {Component} from "react";
import PropTypes from 'prop-types';
import {StyleSheet, View, Image, Animated, ViewPropTypes} from 'react-native';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

import Theme from 'teaset/themes/Theme';
import TransformView from '../TransformView/TransformView';
import CarouselControl from '../Carousel/CarouselControl';

export default class AlbumView extends Component {

  static propTypes = {
    ...ViewPropTypes,
    images: PropTypes.arrayOf(Image.propTypes.source).isRequired,
    thumbs: PropTypes.arrayOf(Image.propTypes.source),
    defaultIndex: PropTypes.number,
    index: PropTypes.number,
    maxScale: PropTypes.number,
    space: PropTypes.number,
    control: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
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

  static Control = CarouselControl;

  constructor(props) {
    super(props);
    let index = props.index || props.index === 0 ? props.index : props.defaultIndex;
    this.state = {
      layout: {x: 0, y: 0, width: 0, height: 0},
      index: index,
      imageInfos: this.initImageInfos(props.images),
      leftIndex: index - 1,
      rightIndex: index + 1,
      leftTranslateX: new Animated.Value(0),
      rightTranslateX: new Animated.Value(0),
      directionFactor: 0, //-1 prev  1 next
    };
  }

  componentDidMount() {
    this.preloadImage(this.state.index);
  }

  componentWillReceiveProps(nextProps) {
    let {imageInfos, index} = this.state;
    if ((nextProps.index || nextProps.index === 0) && nextProps.index != this.props.index) {
      index = nextProps.index;
    }
    if (nextProps.images.length != this.props.images.length) {
      imageInfos = this.initImageInfos(nextProps.images);
    }
    this.preloadImage(index);
    this.setState({index, imageInfos}, () => this.checkLeftRight());
  }

  initImageInfos(images) {
    let layouts = [];
    for (let i = 0; i < images.length; ++i) {
      layouts.push({
        loadStatus: 0, //0: none  1: thumb loaded  2: image loaded  (-1: load failure)
        width: 1,
        height: 1,
        translateY: 0,
        scale: 1,
      });
    }
    return layouts;
  }

  getImageSize(source, success, failure) {
    if (typeof source === 'number') {
      let {width, height} = resolveAssetSource(source);
      success && success(width, height);
    } else if (source && typeof source === 'object' && source.uri) {
      Image.getSize(source.uri,
        (width, height) => success && success(width, height),
        (error) => failure && failure(error)
      );
    } else {
      failure && failure('source error');
    }
  }

  getImageSizeInfo(index) {
    let {layout} = this.state;
    let imageInfo = this.state.imageInfos[index];

    let initWidth = layout.width;
    let initHeight = imageInfo.height * initWidth / imageInfo.width;
    if (initHeight > layout.height) {
      initHeight = layout.height;
      initWidth = imageInfo.width * initHeight / imageInfo.height;
    }

    return {
      width: imageInfo.width,
      height: imageInfo.height,
      initWidth,
      initHeight,
      scaleWidth: initWidth * imageInfo.scale,
      scaleHeight: initHeight * imageInfo.scale,
    }
  }

  loadImage(index) {
    let {images, thumbs, onWillLoadImage, onLoadImageSuccess, onLoadImageFailure} = this.props;
    let {imageInfos} = this.state;
    let imageInfo = imageInfos[index];

    if (index < 0 || index >= images.length) {
      return;
    }

    if (imageInfo.loadStatus === 0 && thumbs instanceof Array && thumbs.length > index) {
      this.getImageSize(thumbs[index], (width, height) => {
        if (imageInfo.loadStatus === 0) {
          imageInfo.loadStatus = 1;
          imageInfo.width = width;
          imageInfo.height = height;
          this.setState({imageInfos});
        }
      });
    }
    if (imageInfo.loadStatus !== 2) {
      onWillLoadImage && onWillLoadImage(index);
      this.getImageSize(images[index], (width, height) => {
        imageInfo.loadStatus = 2;
        imageInfo.width = width;
        imageInfo.height = height;
        this.setState({imageInfos});
        onLoadImageSuccess && onLoadImageSuccess(index, width, height);
      }, error => {
        onLoadImageFailure && onLoadImageFailure(index, error);
      });
    }    
  }

  preloadImage(index) {
    this.loadImage(index);
    this.loadImage(index - 1);
    this.loadImage(index + 1);
  }

  checkStopScroll(noDelay) {
    if (!this.scrollParam) return;

    let {onChange} = this.props;
    let {newIndex, directionFactor, lrAnimated, lrValue, tvValue} = this.scrollParam;
    this.scrollParam = null;

    lrAnimated.stopAnimation();
    this.refs.transformView.state.translateX.stopAnimation();
    lrAnimated.setValue(lrValue);
    this.refs.transformView.state.translateX.setValue(tvValue);

    this.preloadImage(newIndex);
    let {index} = this.state;
    this.setState({index: newIndex, directionFactor}, () => {
      onChange && onChange(newIndex, index);
      noDelay ? this.checkLeftRight() : setTimeout(() => this.checkLeftRight(), 200);
    });
  }

  scrollToImage(newIndex) {
    let {images, space} = this.props;
    let {index} = this.state;
    let {width} = this.state.layout;

    if (newIndex < 0 || newIndex >= images.length || newIndex == index) {
      return;
    }

    let directionFactor = newIndex < index ? -1 : 1;
    let lrAnimated = newIndex < index ? this.state.leftTranslateX : this.state.rightTranslateX;
    let lrValue = -(width + space) * directionFactor;
    let distance = lrValue - lrAnimated._value;
    let tvValue = this.refs.transformView.state.translateX._value + distance;

    this.scrollParam = {
      newIndex,
      directionFactor,
      lrAnimated,
      lrValue,
      tvValue,
    };

    Animated.parallel([
      Animated.spring(lrAnimated, {
        toValue: lrValue,
        friction: 9,
      }),
      Animated.spring(this.refs.transformView.state.translateX, {
        toValue: tvValue,
        friction: 9,
      }),
    ]).start(e => this.checkStopScroll(false));
    // let the animation stop faster
    lrAnimated.addListener(e => {
      if (Math.abs(e.value - lrValue) <= 1) {
        lrAnimated.stopAnimation();
        this.refs.transformView.state.translateX.stopAnimation();
        lrAnimated.removeAllListeners();
      }
    });

  }

  // for CarouselControl, no scroll
  scrollToPage(newIndex) {
    let {images, onChange} = this.props;
    let {index} = this.state;

    if (newIndex < 0 || newIndex >= images.length || newIndex == index) {
      return;
    }

    let directionFactor = newIndex < index ? -1 : 1;
    this.preloadImage(newIndex);
    this.setState({index: newIndex, directionFactor}, () => {
      onChange && onChange(newIndex, index);
      setTimeout(() => this.checkLeftRight(), 200);
    });
  }

  checkLeftRight() {
    let {index, imageInfos, leftIndex, rightIndex, leftTranslateX, rightTranslateX, directionFactor} = this.state;

    if (leftIndex != index - 1 || rightIndex != index + 1) {
      let {width} = this.state.layout;
      let {scaleWidth} = this.getImageSizeInfo(index);
      let imageInfo = imageInfos[index];
      let tx = scaleWidth > width ? (scaleWidth - width) / 2 * directionFactor : 0;
      this.refs.transformView.state.translateX.setValue(tx);
      this.refs.transformView.state.translateY.setValue(imageInfo.translateY);
      this.refs.transformView.state.scale.setValue(imageInfo.scale);
      this.saveScale = imageInfo.scale;

      leftTranslateX.setValue(0);
      rightTranslateX.setValue(0);
      this.setState({leftIndex: index - 1, rightIndex: index + 1});
    }
  }

  onTransforming(translateX, translateY, scale) {
    let saveScale = this.saveScale;
    this.saveScale = scale;
    if (scale < 1 || (saveScale && scale < saveScale)) {
      return;
    }

    let {x, y, width, height} = this.refs.transformView.contentLayout;
    let ltx = translateX, rtx = translateX;
    if (width > this.state.layout.width) {
      ltx = x;
      rtx = x + (width - this.state.layout.width);
    }

    this.state.leftTranslateX.setValue(ltx);
    this.state.rightTranslateX.setValue(rtx);
  }

  onDidTransform(translateX, translateY, scale) {
    this.saveScale = scale;
    let {index, imageInfos} = this.state;
    imageInfos[index].translateY = translateY;
    imageInfos[index].scale = scale;
    this.setState({imageInfos});
  }

  onWillMagnetic(translateX, translateY, scale, newX, newY, newScale) {
    let {images, space} = this.props;
    let {index} = this.state;

    let {x, y, width, height} = this.refs.transformView.contentLayout;
    let ltx = translateX, rtx = translateX;
    if (width > this.state.layout.width) {
      ltx = x;
      rtx = x + (width - this.state.layout.width);
    }
    let triggerWidth = this.state.layout.width / 3;

    if (scale < 1) {
      return true;
    } else if ((ltx < triggerWidth && rtx > -triggerWidth)
      || (ltx >= triggerWidth && index === 0)
      || (rtx <= -triggerWidth && index === images.length - 1)) {
      // scroll to current image
      let distance = newX - translateX;
      let newltx = ltx + distance;
      let newrtx = rtx + distance;
      Animated.parallel([
        Animated.spring(this.state.leftTranslateX, {
          toValue: newltx,
          friction: 9,
        }),
        Animated.spring(this.state.rightTranslateX, {
          toValue: newrtx,
          friction: 9,
        }),      
      ]).start();
      return true;
    }

    this.scrollToImage(ltx >= triggerWidth ? index - 1 : index + 1);

    return false;
  }

  renderLeftImage() {
    let {images, thumbs, space} = this.props;
    let {leftIndex, imageInfos, leftTranslateX} = this.state;
    if (leftIndex < 0 || leftIndex >= images.length) return null;

    let {loadStatus, translateY, scale} = imageInfos[leftIndex];
    let {width, height} = this.state.layout;
    let {scaleWidth} = this.getImageSizeInfo(leftIndex);
    let cy = height / 2;
    let top = -cy * scale + translateY + cy;
    let viewStyle = {
      position: 'absolute',
      left: -(width + space),
      top: 0,
      width,
      height,
    };
    let imageStyle = {
      position: 'absolute',
      top: top,
      right: 0,
      width: scaleWidth > width ? scaleWidth : width,
      height: height * scale,
      transform: [{translateX: leftTranslateX}],
    };
    let imageSource;
    switch (loadStatus) {
      case 1: imageSource = thumbs[leftIndex]; break;
      case 2: imageSource = images[leftIndex]; break;
      default: imageSource = null;
    }

    return (
      <View style={viewStyle}>
        <Animated.Image style={imageStyle} resizeMode='contain' pointerEvents='none' source={imageSource} key={'l' + leftIndex} />        
      </View>
    );
  }

  renderRightImage() {
    let {images, thumbs, space} = this.props;
    let {rightIndex, imageInfos, rightTranslateX} = this.state;
    if (rightIndex < 0 || rightIndex >= images.length) return null;

    let {loadStatus, translateY, scale} = imageInfos[rightIndex];
    let {width, height} = this.state.layout;
    let {scaleWidth} = this.getImageSizeInfo(rightIndex);
    let cy = height / 2;
    let top = -cy * scale + translateY + cy;
    let viewStyle = {
      position: 'absolute',
      left: width + space,
      top: 0,
      width,
      height,
    };
    let imageStyle = {
      position: 'absolute',
      top: top,
      left: 0,
      width: scaleWidth > width ? scaleWidth : width,
      height: height * scale,
      transform: [{translateX: rightTranslateX}],
    };
    let imageSource;
    switch (loadStatus) {
      case 1: imageSource = thumbs[rightIndex]; break;
      case 2: imageSource = images[rightIndex]; break;
      default: imageSource = null;
    }

    return (
      <View style={viewStyle}>
        <Animated.Image style={imageStyle} resizeMode='contain' pointerEvents='none' source={imageSource} key={'r' + rightIndex} />        
      </View>
    );
  }

  renderImage() {
    let {images, thumbs, space, maxScale, onPress, onLongPress} = this.props;
    let {index, imageInfos} = this.state;
    let {loadStatus, width, height} = imageInfos[index];

    let {initWidth, initHeight} = this.getImageSizeInfo(index);
    let imageSource;
    switch (loadStatus) {
      case 1: imageSource = thumbs[index]; break;
      case 2: imageSource = images[index]; break;
      default: imageSource = null;
    }
    return (
      <TransformView
        style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}
        minScale={1}
        maxScale={maxScale}
        magnetic={true}
        tension={false}
        onWillTransform={() => this.checkStopScroll(true)}
        onTransforming={(translateX, translateY, scale) => this.onTransforming(translateX, translateY, scale)}
        onDidTransform={(translateX, translateY, scale) => this.onDidTransform(translateX, translateY, scale)}
        onWillMagnetic={(translateX, translateY, scale, newX, newY, newScale) => this.onWillMagnetic(translateX, translateY, scale, newX, newY, newScale)}
        onPress={e => onPress && onPress(index, e)}
        onLongPress={e => onLongPress && onLongPress(index, e)}
        ref='transformView'
      >
        <Image
          style={{width: initWidth, height: initHeight}}
          resizeMode='contain'
          source={imageSource}
          onLoadEnd={() => this.checkLeftRight()}
          key={index}
          />
      </TransformView>
    );
  }

  render() {
    let {images, thumbs, defaultIndex, index, maxScale, space, control, children, onLayout, onChange, ...others} = this.props;

    if (React.isValidElement(control)) {
      control = React.cloneElement(control, {index: this.state.index, total: images.length, carousel: this});
    } else if (control) {
      control = <this.constructor.Control index={this.state.index} total={images.length} carousel={this} />
    }

    return (
      <View
        onLayout={e => {
          this.setState({layout: e.nativeEvent.layout});
          onLayout && onLayout(e);
        }}
        {...others}
      >
        {this.renderImage()}
        {this.renderLeftImage()}
        {this.renderRightImage()}
        {control}
      </View>
    );
  }

}
