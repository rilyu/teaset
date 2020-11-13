declare module 'teaset' {
    import {
        ImageStyle,
        ScrollViewProps,
        StyleProp,
        TextInputProps,
        TextStyle,
        TouchableOpacityProps,
        ViewStyle,
        ViewProps,
        ImageSourcePropType
    } from 'react-native'
    import { Component } from 'react'

    interface BaseOverlay extends ViewProps {
        show?: (overlayView: JSX.Element) => number
        hide?: (key: number) => void
        transformRoot?: (transform, animated: boolean, animatesOnly?: boolean) => void
        restoreRoot?: (animated: boolean, animatesOnly?: boolean) => void
    }

    type Bounds = {
        x: number
        y: number
        width: number
        height: number
    }

    interface IOverlayViewProps {
        style?: StyleProp<ViewStyle>
        modal?: boolean
        animated?: boolean
        overlayOpacity?: number
        overlayPointerEvents?: PointerEvent
        autoKeyboardInsets?: boolean
        closeOnHardwareBackPress?: boolean //android only
        onAppearCompleted?: () => void
        onDisappearCompleted?: () => void
        onCloseRequest?: () => void //(overlayView)
        onHardwareBackPress?: () => void // android only
    }

    interface IOverlayPopViewProps extends IOverlayViewProps {
        type?: 'zoomOut' | 'zoomIn' | 'custom'
        containerStyle?: StyleProp<ViewStyle>
        customBounds?: Bounds
    }

    interface IOverlayPopoverViewProps extends IOverlayViewProps {
        popoverStyle?: StyleProp<ViewStyle>
        fromBounds?: Bounds
        direction?: 'down' | 'up' | 'right' | 'left'
        autoDirection?: boolean //down -> up, or right -> left
        directionInsets?: number
        align?: 'start' | 'center' | 'end'
        alignInsets?: number
        showArrow?: boolean
        //??
        paddingCorner?: any
    }

    interface IOverlayPullViewProps extends IOverlayViewProps {
        side?: 'top' | 'bottom' | 'left' | 'right'
        containerStyle?: StyleProp<ViewStyle>
        rootTransform?: 'none' | 'translate' | 'scale' | Array<Bounds>
    }

    export class OverlayView extends Component<IOverlayViewProps, any> {}
    export class OverlayPopoverView extends Component<IOverlayPopoverViewProps, any> {}
    export class OverlayPopView extends Component<IOverlayPopViewProps, any> {}
    export class OverlayPullView extends Component<IOverlayPullViewProps, any> {}

    export class BaseOverlay {
        static View: typeof OverlayView
        static PullView: typeof OverlayPullView
        static PopView: typeof OverlayPopView
        static PopoverView: typeof OverlayPopoverView
        static hide: (key: number) => void
        static transformRoot: (transform, animated: boolean, animatesOnly?: boolean) => void
        static restoreRoot: (animated: boolean, animatesOnly?: boolean) => void
    }

    export class Overlay extends BaseOverlay {
        static show: (overlayView: JSX.Element) => number
    }

    // export const Overlay: Overlay;

    export type IActionSheetItemProps = {
        title: string | JSX.Element | number
        onPress?: () => void
        disabled?: boolean
        titleStyle?: StyleProp<TextStyle>
    }

    type ActionPopoverProps = BaseOverlay & {
        show: (fromBounds?, items?: Array<any>, options?: any) => number
    }

    export const ActionPopover: ActionPopoverProps

    type ActionSheetProps = BaseOverlay & {
        show: (items?: Array<IActionSheetItemProps>, cancelItem?, options?: any) => number
    }

    export const ActionSheet: ActionSheetProps

    type IToastViewProps = IOverlayViewProps & {
        text: JSX.Element | string | number
        icon: JSX.Element | { uri: string } | number | 'none' | 'success' | 'fail' | 'smile' | 'sad' | 'info' | 'stop'
        position: 'top' | 'bottom' | 'center'
    }

    export class ToastView extends Component<IToastViewProps, any> {}

    interface IToastProps extends IOverlayViewProps {}

    export class Toast extends Overlay {
        static ToastView: typeof ToastView
        static defaultDuration: string
        static defaultPosition: string
        static messageDefaultDuration: string
        static messageDefaultPosition: string
        static show: (options) => number
        static message: (text: string, options?, position?) => number
        static success: (text: string, options?, position?) => number
        static fail: (text: string, options?, position?) => number
        static smile: (text, options?, position?) => number
        static sad: (text: string, options?, position?) => number
        static info: (text: string, options?, position?) => number
        static stop: (text: string, options?, position?) => number
    }

    export interface AlertButton {
        text?: string
        onPress?: (value: any) => void
        //default为蓝色,cancel为蓝色加粗,destructive为红色
        style?: 'default' | 'cancel' | 'destructive'
        //文字颜色，将会覆盖style的颜色样式
        textColor?: string
        //文本样式，将会覆盖style的颜色样式
        textStyle?: StyleProp<TextStyle>
    }

    interface AlertOptions {
        /** @platform android/ios,默认值:false,(注意,RN的Alert组件，android下该值为true) */
        cancelable?: boolean
        /** @platform android/ios */
        onDismiss?: () => void
        /** 点击按钮后自动关闭,默认值:false */
        autoClose?: boolean
        /** Overlay.PopView的相关属性 */
        overlay?: IOverlayPopViewProps
    }

    export interface AlertStatic {
        alert: (
            title: string,
            message?: string | JSX.Element | Number,
            buttons?: AlertButton[],
            options?: AlertOptions
        ) => void
        edit: (title: string, inuptProps: TextInputProps, buttons?: AlertButton[], options?: AlertOptions) => void
        hide: () => void
    }

    export const Alert: AlertStatic
    export type Alert = AlertStatic

    interface IAlertViewProps extends ViewProps {
        style?: StyleProp<ViewStyle>
        title: string
        message?: string | JSX.Element | Number
        buttons?: AlertButton[]
        onButtonPress?: () => void
    }

    export class AlertView extends Component<IAlertViewProps, any> {}

    type BadgeTypes = 'capsule' | 'square' | 'dot'

    interface IBadgeProps extends ViewProps {
        type?: BadgeTypes
        count?: string | number
        countStyle?: StyleProp<TextStyle>
        maxCount?: number
    }

    export class Badge extends Component<IBadgeProps, any> {}

    interface IBasePageProps extends ViewProps {
        //转场效果
        scene?: any
        //自动插入键盘占用空间
        autoKeyboardInsets?: boolean
        //插入键盘占用空间顶部偏移，用于底部有固定占用空间(如TabNavigator)的页面
        keyboardTopInsets?: number
    }

    export class BasePage extends Component<IBasePageProps, any> {}

    type ButtonTypes = 'default' | 'primary' | 'secondary' | 'danger' | 'link'

    type ButtonSizes = 'xl' | 'lg' | 'md' | 'sm' | 'xs'

    interface IButtonProps extends TouchableOpacityProps {
        type?: ButtonTypes
        size?: ButtonSizes
        title: JSX.Element | string | number
        titleStyle?: TextStyle
    }

    export class Button extends Component<IButtonProps, any> {}

    interface IDashLineProps extends ViewProps {
        style?: StyleProp<ViewStyle>
        dashGap: number
        dashLength: number
        dashThickness: number
        dashColor: string
        dashStyle?: StyleProp<ViewStyle>
    }

    export class DashLine extends Component<IDashLineProps, any> {
        static defaultProps: Pick<IDashLineProps, 'dashGap'> &
            Pick<IDashLineProps, 'dashLength'> &
            Pick<IDashLineProps, 'dashThickness'> &
            Pick<IDashLineProps, 'dashColor'>
    }

    interface ICarouselProps extends ScrollViewProps {
        //是否开启轮播
        carousel?: boolean
        //每页停留时间
        interval?: number
        //轮播方向
        direction?: 'forward' | 'backward'
        //起始页面编号，从0开始
        startIndex?: number
        //是否循环
        cycle?: boolean
        control?: boolean | JSX.Element
        //(index, total) 页面改变时调用
        onChange?: (index: number, total: number) => any
    }

    interface ControlProps {
        dot?: JSX.Element
        activeDot?: JSX.Element
        style?: ViewStyle
    }
    class CarouselControl extends Component<ControlProps, any> {}

    export class Carousel extends Component<ICarouselProps, any> {
        static Control: typeof CarouselControl
    }

    interface ICheckboxProps extends TouchableOpacityProps {
        checked: boolean
        defaultChecked?: boolean
        size?: 'lg' | 'md' | 'sm'
        title?: JSX.Element | string | number
        titleStyle?: StyleProp<TextStyle>
        checkedIcon?: JSX.Element | { uri: string } | number
        checkedIconStyle?: StyleProp<ImageStyle>
        uncheckedIcon?: JSX.Element | { uri: string } | number
        uncheckedIconStyle?: StyleProp<ImageStyle>
        onChange?: any
    }

    export class Checkbox extends Component<ICheckboxProps, any> {}

    export interface IDrawerProps extends IOverlayViewProps {}

    export class Drawer extends Overlay {
        static DrawerView: typeof OverlayPullView
        static open: (
            view,
            side?: string,
            rootTransform?: string,
            options?: any
        ) => { key: number; close: (animated: boolean) => void }
    }

    interface IInputProps extends TextInputProps {
        size?: 'lg' | 'md' | 'sm'
        disabled?: boolean
    }

    export class Input extends Component<IInputProps> {}

    export interface IKeyboardSpaceProps {
        topInsets: number
    }

    export class KeyboardSpace extends Component<IKeyboardSpaceProps> {}

    type LabelTypes = 'default' | 'title' | 'detail' | 'danger'

    type LabelSizes = 'xl' | 'lg' | 'md' | 'sm' | 'xs'

    interface ILabelProps extends TextStyle {
        style?: StyleProp<TextStyle>
        type?: LabelTypes
        size?: LabelSizes
        text: string | number
    }

    export class Label extends Component<ILabelProps, any> {}

    interface IListRowProps extends ISwipeTouchableOpacityProps {
        required?: boolean
        requiredStyle?: StyleProp<TextStyle>
        title: JSX.Element | string | number
        detail?: JSX.Element | string | number
        titleStyle?: StyleProp<TextStyle>
        detailStyle?: StyleProp<TextStyle>
        detailMultiLine?: boolean //是否支持多行内容
        icon?: JSX.Element | { uri: string } | number
        accessory?: JSX.Element | { uri: string } | number | 'none' | 'auto' | 'empty' | 'check' | 'indicator'
        topSeparator?: JSX.Element | 'none' | 'full' | 'indent'
        bottomSeparator?: JSX.Element | 'none' | 'full' | 'indent'
        titlePlace?: 'none' | 'left' | 'top'
        swipeActions?: Array<JSX.Element>
    }

    export class ListRow extends Component<IListRowProps, any> {
        static defaultProps: Partial<IListRowProps>
    }

    export interface IMenuViewProps extends IOverlayPopoverViewProps {
        items: Array<{
            title: JSX.Element | string | number
            icon: JSX.Element | { uri: string } | string | number | 'none' | 'empty'
            onPress: () => void
        }>
        shadow: boolean
    }

    export class MenuView extends Component<IMenuViewProps, any> {}

    export interface IMenuItemProps {
        title: JSX.Element | string | number
        icon: JSX.Element | { uri: string } | string | number | 'none' | 'empty'
    }

    export class MenuItem extends Component<IMenuItemProps> {}

    export class Menu extends BaseOverlay {
        static MenuView: typeof MenuView
        static show: (fromBounds?, items?: Array<any>, options?: any) => typeof MenuView
    }

    export interface IModalIndicatorViewProps extends IOverlayViewProps {
        text?: JSX.Element | string | number
        position?: 'top' | 'bottom' | 'center'
        size?: 'small' | 'large' | number
        color?: string
    }

    export class ModalIndicatorView extends Component<IModalIndicatorViewProps> {}

    export class ModalIndicator extends BaseOverlay {
        static IndicatorView: typeof ModalIndicatorView
        static show: (text: string) => typeof ModalIndicatorView
        static hide: () => void
    }

    export interface INavigationTitleProps extends TextStyle {
        text: string | number
    }

    class NavigationTitle extends Component<INavigationTitleProps> {
        static contextTypes: {
            tintColor: string
        }
    }

    export interface INavigationButtonProps extends TouchableOpacityProps {}

    class NavigationButton extends Component<INavigationButtonProps> {}

    export interface INavigationBackButtonProps extends INavigationButtonProps {
        title?: string | JSX.Element
        icon?: any
    }

    class NavigationBackButton extends Component<INavigationBackButtonProps> {}

    export interface INavigationIconButtonProps extends INavigationButtonProps {
        icon: any
    }

    class NavigationIconButton extends Component<INavigationIconButtonProps> {}

    export interface INavigationLinkButtonProps extends INavigationButtonProps {
        title: string | JSX.Element
    }

    class NavigationLinkButton extends Component<INavigationLinkButtonProps> {}

    export interface INavigationBarProps extends Partial<ViewStyle> {
        style?: StyleProp<ViewStyle>
        type?: 'auto' | 'ios' | 'android'
        title: string | JSX.Element
        titleStyle?: StyleProp<TextStyle>
        leftView?: JSX.Element
        rightView?: JSX.Element
        tintColor?: string //bar tint color, default tint color leftView and rightView, set to null for no tint color
        background?: JSX.Element
        hidden?: boolean //bar hidden
        animated?: boolean //hide or show bar with animation
        statusBarStyle?: 'default' | 'light-content' | 'dark-content' //status bar style (iOS only)
        statusBarColor?: string //status bar color, default: style.backgroundColor
        statusBarHidden?: boolean //status bar hidden
        statusBarInsets?: boolean //auto add space for iOS status bar
    }

    export class NavigationBar extends Component<INavigationBarProps> {
        static Title: typeof NavigationTitle
        static Button: typeof NavigationButton
        static LinkButton: typeof NavigationLinkButton
        static IconButton: typeof NavigationIconButton
        static BackButton: typeof NavigationBackButton
    }

    interface INavigationPageProps extends IBasePageProps {
        title?: string
        showBackButton?: boolean
        navigationBarInsets?: boolean
    }

    export class NavigationPage extends Component<INavigationPageProps> {}

    type PopoverArrows =
        | 'none'
        | 'topLeft'
        | 'top'
        | 'topRight'
        | 'rightTop'
        | 'right'
        | 'rightBottom'
        | 'bottomRight'
        | 'bottom'
        | 'bottomLeft'
        | 'leftBottom'
        | 'left'
        | 'leftTop'

    interface IPopoverProps {
        arrow?: PopoverArrows
        paddingCorner?: number
    }

    export class Popover extends Component<IPopoverProps & ViewProps, any> {}

    export class PopoverPickerItem extends Component<
        TouchableOpacityProps & {
            title: JSX.Element | string | number
            selected: boolean
        }
    > {}

    interface IPopoverPickerViewProps extends IOverlayPopoverViewProps {
        items: Array<any>
        selectedIndex: number
        getItemText?: (item, index) => string
        shadow?: boolean
        onSelected: (item, index) => any
    }

    export class PopoverPickerView extends Component<IPopoverPickerViewProps> {}

    export class PopoverPicker extends BaseOverlay {
        static PopoverPickerView: typeof PopoverPickerView
        static show: (
            fromBounds?,
            items?,
            selectedIndex?: number,
            onSelected?,
            options?: any
        ) => typeof PopoverPickerView
    }

    export class Projector extends Component<
        {
            index: number
            slideStyle?: StyleProp<ViewStyle>
        } & ViewProps
    > {}

    export class PullPickerView extends Component<
        IOverlayPullViewProps & {
            title?: string
            items?: Array<any>
            selectedIndex?: number
            getItemText?: (item, index) => string
            onSelected?: (item, index) => any
        }
    > {}

    export class PullPickerItem extends Component<IListRowProps & { selected?: boolean }> {}

    export class PullPicker extends BaseOverlay {
        static PullPickerView: typeof PullPickerView
        static show: (
            title?: string,
            items?: any[],
            selectedIndex?: number,
            onSelected?: (item, index) => any,
            options?: any
        ) => typeof PullPickerView
    }

    interface ISearchInputProps extends IInputProps {
        style?: StyleProp<TextStyle>
        inputStyle?: TextInputProps
        iconSize?: number
        disabled?: boolean
    }

    export class SearchInput extends Component<ISearchInputProps> {}

    interface ISegmentedItemProps extends ViewProps {
        title: JSX.Element | string | number
        titleStyle?: StyleProp<TextStyle>
        activeTitleStyle?: StyleProp<TextStyle>
        active?: boolean
        badge?: JSX.Element | string | number
        onAddWidth?: (width) => any
    }

    export class SegmentedItem extends Component<ISegmentedItemProps> {}

    interface ISegmentedBarProps extends ViewProps {
        justifyItem?: 'fixed' | 'scrollable'
        indicatorType?: 'none' | 'boxWidth' | 'itemWidth' | 'customWidth'
        indicatorPosition?: 'top' | 'bottom'
        indicatorLineColor?: string
        indicatorWidth?: number
        indicatorLineWidth?: number
        indicatorPositionPadding?: number
        animated?: boolean
        autoScroll?: boolean
        activeIndex?: number //if use this prop, you need update this value from onChange event
        onChange?: (index) => any //(index)
    }

    export class SegmentedBar extends Component<ISegmentedBarProps> {
        static Item: typeof SegmentedItem
    }

    export interface ISegmentedSheetProps extends ViewProps {
        title: JSX.Element | string | Number
        titleStyle?: StyleProp<TextStyle>
        activeTitleStyle?: StyleProp<TextStyle>
        badge?: JSX.Element | string | Number
    }

    export class SegmentedSheet extends Component<ISegmentedSheetProps> {}

    interface ISegmentedViewProps extends ViewProps {
        type?: 'projector' | 'carousel'
        barPosition?: 'top' | 'bottom'
        //SegmentedBar
        barStyle?: StyleProp<ViewStyle>
        justifyItem?: 'fixed' | 'scrollable'
        indicatorType?: 'none' | 'boxWidth' | 'itemWidth'
        indicatorPosition?: 'top' | 'bottom'
        indicatorLineColor?: string
        indicatorLineWidth?: number
        indicatorPositionPadding?: number
        animated?: boolean
        autoScroll?: boolean
        activeIndex?: number
        onChange?: (index) => any //(index)
    }

    export class SegmentedView extends Component<ISegmentedViewProps> {
        static Sheet: typeof SegmentedSheet
    }

    interface ISelectProps extends ViewProps {
        size?: 'lg' | 'md' | 'sm'
        value?: any
        valueStyle?: StyleProp<TextStyle>
        items?: Array<any>
        getItemValue?: (item, index) => any //(item, index) 选择项值，item=items[index]，为空时直接使用item
        getItemText?: (item, index) => any //(item, index) return display text of item, item=items[index], use item when it's null
        pickerType?: 'auto' | 'pull' | 'popover'
        pickerTitle?: string //PullPicker only
        editable?: boolean
        icon?: JSX.Element | { uri: string } | number | 'none' | 'default'
        iconTintColor?: string //set to null for no tint color
        placeholder?: string
        placeholderTextColor?: string
        onSelected?: (item, index) => any //(item, index)
    }

    export class Select extends Component<ISelectProps> {}

    interface IStepperProps extends ViewProps {
        defaultValue?: number
        value?: number
        step?: number
        max?: number
        min?: number
        valueWrapperStyle?: StyleProp<ViewStyle>
        valueStyle?: StyleProp<TextStyle>
        valueFormat?: (value) => any //(value)
        subButton?: JSX.Element | string
        addButton?: JSX.Element | string
        showSeparator?: boolean
        disabled?: boolean
        editable?: boolean
        onChange?: (value: number) => any //(value)
        onTextPress?: () => any
    }

    export class Stepper extends Component<IStepperProps> {}

    interface ITabButtonProps extends ViewProps {
        title: JSX.Element | string | number
        titleStyle?: StyleProp<TextStyle>
        activeTitleStyle?: StyleProp<TextStyle>
        icon?: JSX.Element | { uri: string } | number
        activeIcon?: JSX.Element | { uri: string } | number
        active?: boolean
        iconContainerStyle?: StyleProp<ViewStyle>
        badge?: JSX.Element | number
    }

    export class TabButton extends Component<ITabButtonProps> {}

    interface ITabSheetProps extends ViewProps {
        type?: 'sheet' | 'button'
        title: JSX.Element | string | number
        icon?: JSX.Element | { uri: string } | number
        activeIcon?: JSX.Element | { uri: string } | number
        iconContainerStyle?: StyleProp<ViewStyle>
        badge?: JSX.Element | number
        onPress?: any
    }

    export class TabSheet extends Component<ITabSheetProps> {}

    export class TabView extends Component<
        ViewProps & {
            type?: 'projector' | 'carousel'
            barStyle?: StyleProp<ViewStyle>
            activeIndex?: number
            onChange?: (index) => any //(index)
        }
    > {
        static Sheet: typeof TabSheet
        static Button: typeof TabButton
    }

    interface ITransformViewProps extends ViewProps {
        containerStyle?: StyleProp<ViewStyle>
        maxScale?: number
        minScale?: number
        inertial?: boolean
        magnetic?: boolean
        tension?: boolean
        onWillTransform?: (translateX, translateY, scale) => any //(translateX, translateY, scale)
        onTransforming?: (translateX, translateY, scale) => any //(translateX, translateY, scale)
        onDidTransform?: (translateX, translateY, scale) => any //(translateX, translateY, scale)
        onWillInertialMove?: (translateX, translateY, newX, newY) => boolean //(translateX, translateY, newX, newY), return ture or false
        onDidInertialMove?: (translateX, translateY, newX, newY) => any //(translateX, translateY, newX, newY)
        onWillMagnetic?: (translateX, translateY, scale, newX, newY, newScale) => boolean //(translateX, translateY, scale, newX, newY, newScale), return ture or false
        onDidMagnetic?: (translateX, translateY, scale) => any //(translateX, translateY, scale)
        onPress?: (event) => any //(event)
        onLongPress?: (event) => any //(event)
    }

    export class TransformView extends Component<ITransformViewProps> {}

    export interface IWheelItemProps extends ViewProps {
        index: number
        itemHeight: number
        wheelHeight: number
        currentPosition?: any //instanceOf(Animated)
    }

    export class WheelItem extends Component<IWheelItemProps> {}

    interface IWheelProps extends ViewProps {
        items: JSX.Element | string[] | number[]
        itemStyle?: StyleProp<TextStyle>
        holeStyle?: StyleProp<ViewStyle> //height is required
        maskStyle?: StyleProp<ViewStyle>
        holeLine?: JSX.Element | number
        index?: number
        defaultIndex?: number
        onChange?: (index) => any //(index)
    }
    export class Wheel extends Component<IWheelProps, any> {}

    interface ISwipeTouchableOpacityProps extends TouchableOpacityProps {
        swipeable?: boolean
        swipeWidth?: number
        onSwipeStsChange?: any
    }

    export class SwipeTouchableOpacity extends Component<ISwipeTouchableOpacityProps, any> {}

    interface AlbumViewProps extends ViewProps {
        images: ImageSourcePropType
        thumbs?: any[]
        defaultIndex?: number
        index?: number
        maxScale?: number
        space?: number
        control?: boolean | JSX.Element
        onWillChange?: (index: number, oldindex: number) => void //(index, oldIndex)
        onChange?: (index: number, oldindex: number) => void //(index, oldIndex)
        onPress?: (index: number, event: any) => void //(index, event)
        onLongPress?: (index: number, event: any) => void //(index, event)
        onWillLoadImage?: (index: number) => void //(index)
        onLoadImageSuccess?: (index: number, width: number, height: number) => void //(index, width, height)
        onLoadImageFailure?: (index: number, error: any) => void //(index, error)
    }

    export class AlbumView extends Component<AlbumViewProps> {}

    //#region theme
    export interface ThemeConfig {
        //General
        screenColor: string
        primaryColor: string
        secondaryColor: string
        defaultColor: string
        defaultTextColor: string
        pageColor: string
        pixelSize: number

        //Label - color
        labelTextColor: string
        labelTextTitleColor: string
        labelTextDetailColor: string
        labelTextDangerColor: string
        //Label - font size
        labelFontSizeXL: number
        labelFontSizeLG: number
        labelFontSizeMD: number
        labelFontSizeSM: number
        labelFontSizeXS: number
        labelTitleScale: number //29, 22, 15, 11, 9
        labelDetailScale: number //23, 18, 13, 9, 7
        labelDangerScale: number

        //Button - background color
        btnColor: string
        btnPrimaryColor: string
        btnSecondaryColor: string
        btnDangerColor: string
        btnLinkColor: string
        //Button - title color
        btnTitleColor: string
        btnPrimaryTitleColor: string
        btnSecondaryTitleColor: string
        btnDangerTitleColor: string
        btnLinkTitleColor: string
        //Button - border color
        btnBorderColor: string
        btnPrimaryBorderColor: string
        btnSecondaryBorderColor: string
        btnDangerBorderColor: string
        btnLinkBorderColor: string
        //Button - border width
        btnBorderWidth: number
        //Button - border radius
        btnBorderRadiusXL: number
        btnBorderRadiusLG: number
        btnBorderRadiusMD: number
        btnBorderRadiusSM: number
        btnBorderRadiusXS: number
        //Button - font size
        btnFontSizeXL: number
        btnFontSizeLG: number
        btnFontSizeMD: number
        btnFontSizeSM: number
        btnFontSizeXS: number
        //Button - padding vertical
        btnPaddingVerticalXL: number
        btnPaddingVerticalLG: number
        btnPaddingVerticalMD: number
        btnPaddingVerticalSM: number
        btnPaddingVerticalXS: number
        //Button - padding horizontal
        btnPaddingHorizontalXL: number
        btnPaddingHorizontalLG: number
        btnPaddingHorizontalMD: number
        btnPaddingHorizontalSM: number
        btnPaddingHorizontalXS: number
        //Button - disabled opacity
        btnDisabledOpacity: number

        //Checkbox
        cbTitleColor: string
        cbFontSizeLG: number
        cbFontSizeMD: number
        cbFontSizeSM: number
        cbTitlePaddingLeftLG: number
        cbTitlePaddingLeftMD: number
        cbTitlePaddingLeftSM: number
        cbCheckedTintColor: string
        cbUncheckedTintColor: string
        cbIconSizeLG: number
        cbIconSizeMD: number
        cbIconSizeSM: number
        cbDisabledOpacity: number

        //Input
        inputColor: string
        inputTextColor: string
        inputPlaceholderTextColor: string
        inputBorderColor: string
        inputBorderWidth: number
        //Input - border radius
        inputBorderRadiusLG: number
        inputBorderRadiusMD: number
        inputBorderRadiusSM: number
        //Input - font size
        inputFontSizeLG: number
        inputFontSizeMD: number
        inputFontSizeSM: number
        //Input - padding vertical
        inputPaddingVerticalLG: number
        inputPaddingVerticalMD: number
        inputPaddingVerticalSM: number
        //Input - padding horizontal
        inputPaddingHorizontalLG: number
        inputPaddingHorizontalMD: number
        inputPaddingHorizontalSM: number
        //Input - height
        inputHeightLG: number
        inputHeightMD: number
        inputHeightSM: number
        //Input - disabled opacity
        inputDisabledOpacity: number

        //Select
        selectColor: string
        selectTextColor: string
        selectPlaceholderTextColor: string
        selectBorderColor: string
        selectBorderWidth: number
        //Select - border radius
        selectBorderRadiusLG: number
        selectBorderRadiusMD: number
        selectBorderRadiusSM: number
        //Select - font size
        selectFontSizeLG: number
        selectFontSizeMD: number
        selectFontSizeSM: number
        //Select - padding vertical
        selectPaddingTopLG: number
        selectPaddingTopMD: number
        selectPaddingTopSM: number
        selectPaddingBottomLG: number
        selectPaddingBottomMD: number
        selectPaddingBottomSM: number
        //Select - padding horizontal
        selectPaddingLeftLG: number
        selectPaddingLeftMD: number
        selectPaddingLeftSM: number
        selectPaddingRightLG: number //include icon size
        selectPaddingRightMD: number //include icon size
        selectPaddingRightSM: number //include icon size
        //Select - height
        selectHeightLG: number
        selectHeightMD: number
        selectHeightSM: number
        //Select - icon
        selectIconSizeLG: number
        selectIconSizeMD: number
        selectIconSizeSM: number
        selectIconTintColor: string
        //Select - disabled opacity
        selectDisabledOpacity: number

        //Stepper
        stepperColor: string
        stepperBorderColor: string
        stepperBorderWidth: number
        stepperBorderRadius: number
        stepperTextColor: string
        stepperFontSize: number
        stepperBtnTextColor: string
        stepperBtnFontSize: number
        stepperValueMinWidth: number
        stepperValuePaddingHorizontal: number
        stepperButtonWidth: number
        stepperButtonHeight: number
        stepperDisabledOpacity: number

        //SearchInput
        siColor: string
        siTextColor: string
        siPlaceholderTextColor: string
        siBorderColor: string
        siBorderWidth: number
        siBorderRadius: number
        siFontSize: number
        siPaddingVertical: number
        siPaddingHorizontal: number
        siHeight: number
        siIconSize: number
        siDisabledOpacity: number

        //Badge
        badgeSize: number
        badgeDotSize: number
        badgePadding: number
        badgeColor: string
        badgeBorderColor: string
        badgeBorderWidth: number
        badgeTextColor: string
        badgeFontSize: number

        //Popover
        popoverColor: string
        popoverBorderColor: string
        popoverBorderRadius: number
        popoverBorderWidth: number
        popoverPaddingCorner: number

        //NavigationBar
        navType: 'ios' | 'auto' | 'android' //'auto', 'ios', 'android'
        navStatusBarStyle: 'default' | 'light-content' //'default', 'light-content'
        navBarContentHeight: number
        navColor: string
        navTintColor: string
        navTitleColor: string
        navTitleFontSize: number
        navButtonFontSize: number
        navSeparatorColor: string
        navSeparatorLineWidth: number

        //SegmentedBar
        sbColor: string
        sbHeight: number
        sbBtnPaddingTop: number
        sbBtnPaddingBottom: number
        sbBtnPaddingLeft: number
        sbBtnPaddingRight: number
        sbBtnTitleColor: string
        sbBtnTextFontSize: number
        sbBtnActiveTitleColor: string
        sbBtnActiveTextFontSize: number
        sbIndicatorLineColor: string
        sbIndicatorLineWidth: number
        sbIndicatorPositionPadding: number

        //SegmentedView

        //TabView
        tvBarColor: string
        tvBarHeight: number
        tvBarPaddingTop: number
        tvBarPaddingBottom: number
        tvBarSeparatorWidth: number
        tvBarSeparatorColor: string
        tvBarBtnWidth: number
        tvBarBtnIconSize: number
        tvBarBtnIconTintColor: string
        tvBarBtnIconActiveTintColor: string
        tvBarBtnTitleColor: string
        tvBarBtnTextFontSize: number
        tvBarBtnActiveTitleColor: string
        tvBarBtnActiveTextFontSize: number

        //ListRow
        rowColor: string
        rowMinHeight: number
        rowPaddingLeft: number
        rowPaddingRight: number
        rowPaddingTop: number
        rowPaddingBottom: number
        rowIconWidth: number
        rowIconHeight: number
        rowIconPaddingRight: number
        rowAccessoryWidth: number
        rowAccessoryHeight: number
        rowAccessoryPaddingLeft: number
        rowAccessoryCheckColor: string
        rowAccessoryIndicatorColor: string
        rowSeparatorColor: string
        rowSeparatorLineWidth: number
        rowPaddingTitleDetail: number
        rowDetailLineHeight: number
        rowActionButtonColor: string
        rowActionButtonDangerColor: string
        rowActionButtonTitleColor: string
        rowActionButtonDangerTitleColor: string
        rowActionButtonTitleFontSize: number
        rowActionButtonPaddingHorizontal: number

        //Carousel
        carouselDotSize: number
        carouselDotUseSize: number
        carouselDotColor: string
        carouselActiveDotColor: string

        //Wheel
        wheelColor: string
        wheelFontSize: number
        wheelTextColor: string
        wheelHoleHeight: number
        wheelHoleLineWidth: number
        wheelHoleLineColor: string
        wheelMaskColor: string
        wheelMaskOpacity: number

        //Overlay
        overlayOpacity: number
        overlayRootScale: number

        //Toast
        toastColor: string
        toastPaddingLeft: number
        toastPaddingRight: number
        toastPaddingTop: number
        toastPaddingBottom: number
        toastBorderRadius: number
        toastIconTintColor: string
        toastIconWidth: number
        toastIconHeight: number
        toastIconPaddingTop: number
        toastIconPaddingBottom: number
        toastTextColor: string
        toastFontSize: number
        toastScreenPaddingLeft: number
        toastScreenPaddingRight: number
        toastScreenPaddingTop: number
        toastScreenPaddingBottom: number

        //ActionSheet
        asItemDisabledOpacity: number
        asItemMinHeight: number
        asItemPaddingLeft: number
        asItemPaddingRight: number
        asItemPaddingTop: number
        asItemPaddingBottom: number
        asItemColor: string
        asItemSeparatorColor: string
        asItemSeparatorLineWidth: number
        asItemTitleColor: string
        asItemTitleAlign: string
        asItemFontSize: number
        asCancelItemColor: string
        asCancelItemSeparatorColor: string
        asCancelItemSeparatorLineWidth: number
        asCancelItemTitleColor: string
        asCancelItemTitleAlign: string
        asCancelItemFontSize: number

        //ActionPopover
        apColor: string
        apPaddingVertical: number
        apPaddingHorizontal: number
        apBorderRadius: number
        apDirectionInsets: number
        apItemTitleColor: string
        apItemFontSize: number
        apItemPaddingVertical: number
        apItemPaddingHorizontal: number
        apSeparatorColor: string
        apSeparatorWidth: number

        //PullPicker
        pupColor: string
        pupMaxHeight: number
        pupHeaderColor: string
        pupHeaderPaddingLeft: number
        pupHeaderPaddingRight: number
        pupHeaderPaddingTop: number
        pupHeaderPaddingBottom: number
        pupHeaderTitleColor: string
        pupHeaderFontSize: number
        pupHeaderFontWeight: number
        pupHeaderSeparatorColor: string
        pupHeaderSeparatorHeight: number
        pupItemColor: string
        pupSeparatorColor: string

        //PopoverPicker
        poppColor: string
        poppShadowColor: string
        poppMinWidth: number
        poppMaxWidth: number
        poppMinHeight: number
        poppMaxHeight: number
        poppDirectionInsets: number
        poppItemColor: string
        poppItemPaddingLeft: number
        poppItemPaddingRight: number
        poppItemPaddingTop: number
        poppItemPaddingBottom: number
        poppItemTitleColor: string
        poppItemFontSize: number
        poppItemSeparatorWidth: number
        poppItemSeparatorColor: string
        poppAccessoryWidth: number
        poppAccessoryHeight: number
        poppAccessoryPaddingLeft: number
        poppAccessoryCheckColor: string

        //Menu
        menuColor: string
        menuShadowColor: string
        menuDirectionInsets: number
        menuItemColor: string
        menuItemPaddingLeft: number
        menuItemPaddingRight: number
        menuItemPaddingTop: number
        menuItemPaddingBottom: number
        menuItemTitleColor: string
        menuItemFontSize: number
        menuItemSeparatorWidth: number
        menuItemSeparatorColor: string
        menuItemIconWidth: number
        menuItemIconHeight: number
        menuItemIconColor: string
        menuItemIconPaddingRight: number

        //ModalIndicator
        miIndicatorColor: string
        miTextColor: string
        miFontSize: number
        miTextPaddingTop: number
        miScreenPaddingLeft: number
        miScreenPaddingRight: number
        miScreenPaddingTop: number
        miScreenPaddingBottom: number

        //NavigationPage
        backButtonTitle: string
    }

    export type ThemeConfigPartial = Partial<ThemeConfig>

    export type Themes = {
        default: ThemeConfigPartial
        black: ThemeConfigPartial
        violet: ThemeConfigPartial
    }
    export const Theme: {
        themes: {
            default: ThemeConfig
            black: ThemeConfig
            violet: ThemeConfig
        }
        set: (theme: ThemeConfigPartial) => void
        isPad: boolean
        isIPhoneX: boolean
        fitIPhoneX: boolean
        isLandscape: boolean
        statusBarHeight: number
        screenInset: {
            top: number
            left: number
            right: number
            bottom: number
        }
        //设计宽度,默认为iphone6的375
        designWidth: number
        //设计高度,默认为iphone6的1334
        designHeight: number
        deviceWidth: number
        deviceHeight: number
        px2dp: (w: number) => number
        onePix: number
        fontSizeAndColor: (size: number, color: string) => { fontSize: number; color: string }
    } & ThemeConfigPartial
    //#endregion

    export const BackHandler: any
}
