// AlbumSheet.js

'use strict';

import React, {Component} from "react";
import PropTypes from 'prop-types';
import {StyleSheet, View, Image, Animated, Easing} from 'react-native';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

import Theme from 'teaset/themes/Theme';
import TransformView from '../TransformView/TransformView';

export default class AlbumSheet extends TransformView {

  static propTypes = {
    ...TransformView.propTypes,
    image: PropTypes.oneOfType([Image.propTypes.source, PropTypes.element]).isRequired,
    thumb: Image.propTypes.source,
    defaultPosition: PropTypes.oneOf(['center', 'left', 'right']),
    space: PropTypes.number,
    load: PropTypes.bool,
    onWillLoadImage: PropTypes.func,
    onLoadImageSuccess: PropTypes.func, //(width, height)
    onLoadImageFailure: PropTypes.func, //(error)
  };

  static defaultProps = {
    ...TransformView.defaultProps,
    maxScale: 3,
    minScale: 1,
    defaultPosition: 'center',
    space: 20,
    load: true,
  };

  constructor(props) {
    super(props);
    Object.assign(this.state, {
      position: props.defaultPosition,
      imageLoaded: false,
      thumbLoaded: false,
      actualWidth: 0,
      actualHeight: 0,
      fitWidth: 0,
      fitHeight: 0,
      viewWidth: 0,
      viewHeight: 0,
    });
  }

  componentDidMount() {
    this.loadImage(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.image != this.props.image || nextProps.load != this.props.load) {
      this.loadImage(nextProps);
    }
  }

  loadImage(props) {
    let {image, thumb, load, onWillLoadImage, onLoadImageSuccess, onLoadImageFailure} = props;
    let {imageLoaded, thumbLoaded} = this.state;

    if (!load) return;

    if (React.isValidElement(image)) {
      let {width, height} = this.getElementSize(props.image);
      this.imageSizeChange(width, height);
      this.setState({imageLoaded: true});
    } else {
      if (thumb && !thumbLoaded) {
        this.getImageSize(thumb, (width, height) => {
          if (!this.state.imageLoaded) {
            this.imageSizeChange(width, height);
          }
          this.setState({thumbLoaded: true});
        });
      }
      if (image && !imageLoaded) {
        onWillLoadImage && onWillLoadImage();
        this.getImageSize(image, (width, height) => {
          this.imageSizeChange(width, height);
          this.setState({imageLoaded: true});
          onLoadImageSuccess && onLoadImageSuccess(width, height);
        }, error => {
          onLoadImageFailure && onLoadImageFailure(error);
        });
      }
    }
  }

  getImageSize(source, success, failure) {
    if (typeof source === 'number') {
      let {width, height} = resolveAssetSource(source);
      success && success(width, height);
    } else if (source && typeof source === 'object' && source.uri) {
      //This func will doanload and cache image
      Image.getSize(source.uri,
        (width, height) => success && success(width, height),
        (error) => failure && failure(error)
      );
    } else {
      failure && failure('source error');
    }
  }

  getElementSize(element) {
    let width = 0, height = 0;
    if (React.isValidElement(element)) {
      let style = StyleSheet.flatten(element.props.style);
      if (style.width === null || style.width === undefined
        || style.height === null || style.height === undefined) {
        console.error('You need to specify the width and height style when the image is a element');
      } else {
        width = style.width;
        height = style.height;
      }
    }
    return {width, height};
  }

  getFitSize(actualWidth, actualHeight, viewWidth, viewHeight) {
    let fitWidth = 0, fitHeight = 0;

    if (actualWidth && actualHeight) {
      fitWidth = viewWidth;
      fitHeight = actualHeight * fitWidth / actualWidth;
      if (fitHeight > viewHeight) {
        fitHeight = viewHeight;
        fitWidth = actualWidth * fitHeight / actualHeight;
      }
    } else if (actualWidth) {
      fitWidth = viewWidth;
    } else if (actualHeight) {
      fitHeight = viewHeight;
    }

    return {fitWidth, fitHeight};
  }

  getScrollValue() {
    let {space} = this.props;
    let {fitWidth, viewWidth, scale} = this.state;
    let scaleWidth = fitWidth * scale._value; //image scale width
    let exceedWidth = scaleWidth > viewWidth ? scaleWidth - viewWidth : 0; 
    let leftX = -(viewWidth + space + exceedWidth / 2); //scroll to left position
    let rightX = viewWidth + space + exceedWidth / 2; //scroll to right position
    let centerLeftX = -exceedWidth / 2; //scroll from left to center position
    let centerRightX = exceedWidth / 2; //scroll from right to center position
    return {
      leftX,
      rightX,
      centerLeftX,
      centerRightX,
    };
  }

  scrollTo(toPosition, animated = true, valueCallback = null) {
    let {position, translateX, translateY} = this.state;
    let {leftX, rightX, centerLeftX, centerRightX} = this.getScrollValue();

    let valueX = 0;
    if (toPosition === 'left') valueX = leftX;
    else if (toPosition === 'right') valueX = rightX;
    else {
      if (position == 'left') valueX = centerLeftX;
      else valueX = centerRightX;
    }

    let valueY = translateY._value;
    let {y, height} = this.contentLayout;
    if (height > this.viewLayout.height) {
      if (y > 0) {
        valueY = translateY._value - y;
      }
      else if ((y + height) <  this.viewLayout.height) {
        valueY = translateY._value + (this.viewLayout.height - (y + height));
      }
    }

    if (valueCallback) {
      valueCallback(translateX, valueX);
      valueCallback(translateY, valueY);
    } else {
      if (animated) {
        Animated.parallel([
          Animated.timing(translateX, {
            toValue: valueX,
            easing: Easing.elastic(0),
            duration: 200,
          }),
          Animated.timing(translateY, {
            toValue: valueY,
            easing: Easing.elastic(0),
            duration: 200,
          }),          
        ]).start();
      } else {
        translateX.setValue(valueX);
        translateY.setValue(valueY);
      }
    }

    this.setState({position: toPosition});
  }

  scrollX(x, animated = true) {
    let {position, translateX} = this.state;
    let {leftX, rightX} = this.getScrollValue();

    let toValue = 0;
    if (position === 'left') toValue = leftX;
    else if (position === 'right') toValue = rightX;
    toValue += x;

    if (animated) {
      Animated.timing(translateX, {
        toValue: toValue,
        easing: Easing.elastic(0),
        duration: 200,
      }).start();
    } else {
      translateX.setValue(toValue);
    }
  }

  restoreImage() {
    let {space} = this.props;
    let {position, viewWidth, translateX, translateY, scale} = this.state;

    scale.setValue(1);
    translateY.setValue(0);
    switch (position) {
      case 'left': translateX.setValue(-(viewWidth + space)); break;
      case 'right': translateX.setValue(viewWidth + space); break;
      default: translateX.setValue(0);
    }
  }

  layoutChange(width, height) {
    let {actualWidth, actualHeight, fitWidth, fitHeight, viewWidth, viewHeight} = this.state;
    let needRestoreImage = false;
    viewWidth = width;
    viewHeight = height;
    if (actualWidth && actualHeight) {
      let fitSize = this.getFitSize(actualWidth, actualHeight, viewWidth, viewHeight);
      fitWidth = fitSize.fitWidth;
      fitHeight = fitSize.fitHeight;
      needRestoreImage = true;
    }
    this.setState({actualWidth, actualHeight, fitWidth, fitHeight, viewWidth, viewHeight}, () => {
      needRestoreImage && this.restoreImage();
    });
  }

  imageSizeChange(width, height) {
    let {actualWidth, actualHeight, fitWidth, fitHeight, viewWidth, viewHeight} = this.state;
    let needRestoreImage = false;
    actualWidth = width;
    actualHeight = height;
    if (viewWidth && viewHeight) {
      let fitSize = this.getFitSize(actualWidth, actualHeight, viewWidth, viewHeight);
      fitWidth = fitSize.fitWidth;
      fitHeight = fitSize.fitHeight;
      needRestoreImage = true;
    }
    this.setState({actualWidth, actualHeight, fitWidth, fitHeight, viewWidth, viewHeight}, () => {
      needRestoreImage && this.restoreImage();
    });
  }

  buildProps() {
    let {style, image, thumb, load, children, onLayout, ...others} = this.props;
    let {position, imageLoaded, thumbLoaded, fitWidth, fitHeight} = this.state;

    style = [{backgroundColor: 'rgba(0, 0, 0, 0)'}].concat(style);

    let childrenStyle = {width: fitWidth, height: fitHeight};
    if (React.isValidElement(image)) {
      children = React.cloneElement(image, {style: childrenStyle});
    } else {
      if (imageLoaded || !thumb) {
        children = <Image style={childrenStyle} resizeMode='contain' source={image} />;
      } else {
        children = <Image style={childrenStyle} resizeMode='contain' source={thumb} />;
      }
    }

    let saveOnLayout = onLayout;
    onLayout = e => {
      let {width, height} = e.nativeEvent.layout;
      this.layoutChange(width, height);
      saveOnLayout && saveOnLayout(e);
    };

    this.props = {style, image, thumb, load, children, onLayout, ...others};
    super.buildProps();
  }

}
