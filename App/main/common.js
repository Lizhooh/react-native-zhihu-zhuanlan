
/**
 * 公共组件集合
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Text,
    ActivityIndicator,
    RefreshControl,
    TouchableOpacity as Touch,
    PixelRatio,
} from 'react-native';

import _MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import _FontAwesome from 'react-native-vector-icons/FontAwesome';

export const MaterialIcons = _MaterialIcons;
export const FontAwesome = _FontAwesome;
export const color = 'rgba(255, 180, 50, 1)';
// export const color = 'rgba(30, 155, 255, 1)';
export const devicewindow = Dimensions.get('window');
export const onePixel = 1 / PixelRatio.get();

// # tab 顶端栏
export const TabTopbar = ({ iconName, iconPress, title, style, children }) => (
    <View
        style={{
            top: -1 * devicewindow.height + 50 + 25,
            height: 50,
            backgroundColor: '#fff',
            alignItems: 'center',
            flexDirection: 'row',
            position: 'absolute',
            left: 0, right: 0,
            ...style,
        }}
        >
        <View
            style={{ backgroundColor: '#e6e6e6' }}
            >
            <Touch
                activeOpacity={0.6}
                style={{
                    backgroundColor: '#fff',
                    height: 50,
                    width: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onPress={iconPress}
                >
                <MaterialIcons
                    name={iconName}
                    size={28}
                    color={color}
                    />
            </Touch>
        </View>

        {
            !!title &&
            <Text
                style={{
                    color: color,
                    fontSize: 18,
                    paddingHorizontal: 15,
                }}
                >
                {title}
            </Text>
        }

        {children}
    </View>
);

// # tab 加载栏
export const TabLoadBar = ({ show, title }) => (
    show &&
    <View
        style={{
            backgroundColor: 'rgba(1, 1, 1, 0.35)',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            padding: 10,
            top: -40,
            height: 40,
            position: 'absolute',
            left: 0, right: 0,
        }}
        >
        <ActivityIndicator
            animating={true}
            size="small"
            color={'#fff'}
            />
        <Text style={{ color: '#fff' }}>
            {" " + title}
        </Text>
    </View>
);

// # tab 刷新器
export const TabRefresh = (props) => (
    <RefreshControl
        refreshing={false}
        onRefresh={null}
        tintColor={color}
        title="Loading..."
        titleColor={color}
        colors={[color]}
        progressBackgroundColor="#fff"
        {...props}
        />
);

// # 特殊基类，有一个根据滚动条变化的 state opacity
export class BaseComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            opacity: 1,
        };

        // 缓存值
        this.topbar = {
            start: 0,
            end: 0,
            y: 0,
            opacity: 1,
            S: 300,
        };
    }

    // 根据滚动条的变化，Topbar 的透明度会产生变化
    onScroll = event => {
        const { contentOffset: { y } } = event.nativeEvent;
        const topbar = this.topbar;
        const opacity = this.state.opacity;

        if (y < 3 && opacity < 1) {
            this.setState({ opacity: 1 });
        }
        // 方向向下
        else if (y - topbar.y > 10) {
            if (opacity > 0) {
                this.setState({ opacity: topbar.opacity - (y - topbar.start) / topbar.S });
            }
            topbar.end = topbar.y;
            topbar.y = y;
        }
        // 方向向上
        else if (y - topbar.y < -10) {
            if (opacity < 1) {
                this.setState({ opacity: (topbar.end - y) / topbar.S })
                topbar.opacity = (topbar.end - y) / topbar.S;
            }
            topbar.start = y;
            topbar.y = y;
        }
    }
}