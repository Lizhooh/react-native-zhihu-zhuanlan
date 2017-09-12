import React from 'react';
import {
    StyleSheet,
    View, Text,
    TouchableOpacity as Touch
} from 'react-native';
import { color } from '../config';
import Icon from 'react-native-vector-icons/MaterialIcons';

// 顶端栏
export default ({ title, onBack, icons = [], icon, reverse = true, myref = null, style, children }) => (
    <View style={[$.toolbar, reverse && $.reversebg, style]} ref={myref}>
        <Touch
            style={{ padding: 10 }}
            activeOpacity={1}
            onPress={onBack}>
            <Icon
                color={reverse ? color : '#fff'}
                name={icon || 'arrow-back'}
                size={25}
                // style={$.textshadow}
                />
        </Touch>
        {!!title &&
            <Text style={[$.titleText, reverse && $.reverse]}>
                {title}
            </Text>
        }
        {children}
        {icons.length > 0 &&
            <View style={$.right}>{
                icons.map((it, index) => (
                    <Touch
                        key={`right-icon-${index}`}
                        style={$.icon}
                        activeOpacity={0.7}
                        onPress={it.onPress}
                        >
                        <Icon
                            name={it.name}
                            size={20}
                            color={reverse ? color : '#fff'}
                            // style={$.textshadow}
                            />
                        {it.text !== null &&
                            <Text style={[$.text, reverse && $.reverse]}>
                                {it.text}
                            </Text>
                        }
                    </Touch>
                ))
            }</View>
        }
    </View>
);

const $ = StyleSheet.create({
    toolbar: {
        height: 65,
        paddingTop: 25,
        backgroundColor: color,
        alignItems: 'center',
        paddingHorizontal: 4,
        flexDirection: 'row',
    },
    titleText: {
        paddingHorizontal: 8,
        color: '#fff',
        fontSize: 18,
    },
    right: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    icon: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textshadow: {
        textShadowColor: 'rgba(1, 1, 1, 0.18)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 6,
    },
    text: {
        color: '#fff',
        marginLeft: 3,
        includeFontPadding: false,
        textAlignVertical: 'center',
        fontSize: 14,
        fontWeight: '500',
    },
    reverse: {
        color: color,
    },
    reversebg: {
        backgroundColor: '#fff',
    },
});
