import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity as Touch,
    PixelRatio,
    Animated,
    Easing,
} from 'react-native';
import { Icon } from './common';

/**
 * # TabsBar 组件
 */
export default TabsBar = ({
    goToPage,
    activeTab,
    tabs,
    iconName,           // icon 名称, Array
    iconColor,          // icon 默认颜色
    iconActiveColor,    // icon 激活颜色
}) => (
    <View style={styles.contanier}>{
        tabs.map((tab, i) => (
            <Touch
                key={`tabs-icon-${i}`}
                activeOpacity={1}
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
        flex: 1 ,
        justifyContent: 'center',
        alignItems: 'center',
    }
});