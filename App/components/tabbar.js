import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity as Touch,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { color } from '../config';

/**
 * # TabBar 组件
 */
export default ({
    goToPage,           // 自动提供的 props
    activeTab,          // 自动提供的 props
    tabs,               // 自动提供的 props
    iconName,           // icon 名称, Array
    iconColor,          // icon 默认颜色
    iconActiveColor = color,    // icon 激活颜色
}) => (
        <View style={styles.contanier}>{
            tabs.map((tab, i) => (
                <Touch
                    key={`tabs-icon-${i}`}
                    activeOpacity={0.7}
                    onPress={event => goToPage(i)}
                    style={styles.tab}
                    >
                    <Icon
                        name={iconName[i]}
                        size={28}
                        color={activeTab === i ? iconActiveColor : iconColor}
                        />
                </Touch>
            ))
        }
        </View>
    );

const styles = StyleSheet.create({
    contanier: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        elevation: 10,
    },
    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});