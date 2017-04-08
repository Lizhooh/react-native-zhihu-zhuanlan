
/**
 * 公共组件集合
 */
import React from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Text,
    ActivityIndicator,
} from 'react-native';

import _MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import _FontAwesome from 'react-native-vector-icons/FontAwesome';

export const MaterialIcons = _MaterialIcons;
export const FontAwesome = _FontAwesome;
export const color = 'rgba(255, 180, 50, 0.95)';
export const devicewindow = Dimensions.get('window');

// # tab 顶端栏
export const TabTopbar = ({ iconName, title, style }) => (
    <View
        style={{
            ...style,
            top: -1 * devicewindow.height + 55 + 20,
            height: 50,
            backgroundColor: color,
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: 20,
            position: 'absolute',
            left: 0, right: 0,
        }}
        >
        <MaterialIcons
            name={iconName}
            size={28}
            color={'#fff'}
            />
        <Text
            style={{
                color: '#fff',
                fontSize: 18,
                paddingHorizontal: 15,
            }}
            >
            {title}
        </Text>
    </View>
);

// # tab 加载栏
export const TabLoadBar = ({ show, title }) => (
    show &&
    <View
        style={{
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            padding: 10,
            top: -45,
            height: 45,
            position: 'absolute',
            left: 0, right: 0,
        }}
        >
        <ActivityIndicator
            animating={true}
            size="small"
            color={color}
            />
        <Text style={{ color: '#555' }}>
            {" " + title}
        </Text>
    </View>
)