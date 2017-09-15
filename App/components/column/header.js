import React from 'react';
import {
    StyleSheet,
    View, Text, Image,
    TouchableOpacity as Touch,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { color } from '../../config'

export default ({ data, onPress, onFollow }) => (
    <View style={$.body}>
        <Touch
            style={$.center}
            activeOpacity={0.6}
            onPress={onPress}
            >
            <Image
                source={{ uri: data.avatar.image }}
                style={$.avatar}
                resizeMethod='resize'
                />
            <Text style={$.name}>{data.name}</Text>
            <View style={$.description}>
                <Text>{data.description}</Text>
            </View>
        </Touch>
        <Touch style={$.btn} activeOpacity={0.6}
            onPress={onFollow}
            >
            <Icon name='near-me' color={'#fff'} size={16} />
            <Text style={$.btnText}>
                + 关注（{`${data.followersCount}`} 人）
            </Text>
        </Touch>
    </View>
);

const $ = StyleSheet.create({
    text: {
        marginLeft: 5,
        color: '#555',
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    body: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        // borderTopWidth: 1,
        // borderTopColor: '#ddd',
    },
    name: {
        marginTop: 10,
        color: '#444',
        fontSize: 16,
    },
    intro: {
        marginTop: 10,
        color: '#777',
    },
    description: {
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 2,
        justifyContent: 'center',
    },
    btn: {
        marginTop: 10,
        backgroundColor: color,
        borderRadius: 3,
        paddingVertical: 6,
        paddingHorizontal: 18,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    btnText: {
        color: '#fff',
        top: -1,
    },
});