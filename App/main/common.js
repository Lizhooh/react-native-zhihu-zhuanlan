
/**
 * 公共组件集合
 */
import React from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Text,
} from 'react-native';

import _MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import _FontAwesome from 'react-native-vector-icons/FontAwesome';

export const MaterialIcons = _MaterialIcons;
export const FontAwesome = _FontAwesome;

const color = '#3bf';

// # tab 顶端栏
export const TabTopbar = ({ iconName, title, style }) => (
    <View
        style={{
            ...style,
            top: -1 * Dimensions.get('window').height + 55 + 20,
            height: 50,
            backgroundColor: color,
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: 20,
        }}
        >
        <_MaterialIcons
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

