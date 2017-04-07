import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity as Touch,
    ScrollView,
    PixelRatio,
} from 'react-native';
import { Icon } from '../common';

const avatar = require('./img/avatar.jpg');

const listone = [
    { name: 'favorite', title: '我喜欢', text: '0篇', color: '#3b3' },
    { name: 'subject', title: '收藏集', text: '0个', color: '#39f' },
    { name: 'loyalty', title: '关注集', text: '0个', color: '#f44' },
    { name: 'remove-red-eye', title: '阅读过的文章', text: '0篇', color: '#f90' },
];

const listtwo = [
    { name: 'assignment-late', title: '意见反馈', text: null, color: '#bbb' },
    { name: 'settings', title: '设置', text: null, color: '#bbb' },
];

export default User = () => {
    return (
        <ScrollView
            style={$.contanier}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            >

            <View style={$.header}>
                <Image source={avatar} style={$.full} />
            </View>

            <View style={$.list}>{
                listone.map((i, index) => (
                    <Touch
                        activeOpacity={0.8}
                        style={$.item}
                        key={`user-list-${index}`}
                        >
                        <Icon
                            style={$.icon}
                            name={i.name}
                            color={i.color}
                            size={26}
                            />
                        <Text style={$.mid}>
                            {i.title}
                        </Text>
                        <Text style={$.text}>
                            {i.text}
                        </Text>
                    </Touch>
                ))
            }</View>

            <View style={[$.list, { marginTop: 0 }]}>{
                listtwo.map((i, index) => (
                    <Touch
                        activeOpacity={0.8}
                        style={$.item}
                        key={`user-list-${index}`}
                        >
                        <Icon
                            style={$.icon}
                            name={i.name}
                            color={i.color}
                            size={26}
                            />
                        <Text style={$.mid}>
                            {i.title}
                        </Text>
                        <Text style={$.text}>
                            {i.text}
                        </Text>
                    </Touch>
                ))
            }</View>

        </ScrollView>
    );
}

const $ = StyleSheet.create({
    contanier: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    header: {
        height: 200,
        overflow: 'hidden',
        paddingBottom: 3,
    },
    full: {
        width: '100%',
        height: '100%',
    },
    list: {
        backgroundColor: 'rgba(1, 1, 1, 0.15)',
        marginVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e6e6e6',
        borderTopColor: '#f3f3f3',
        borderTopWidth: 1,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: '#f4f4f4',
    },
    icon: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    mid: {
        flex: 1,
    },
    text: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        color: 'rgba(1, 1, 1, 0.4)',
    }
});