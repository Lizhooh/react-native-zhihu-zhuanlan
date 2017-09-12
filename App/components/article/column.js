import React from 'react';
import {
    StyleSheet,
    View, Image, Text,
    TouchableOpacity as Touch,
} from 'react-native';
import { color } from '../../config';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default ({ data, cont = {}, onPress }) => (
    <View style={$.root} >
        <View style={$.header}>
            <Icon name='near-me' color={color} size={16} />
            <Text style={$.text}>专栏</Text>
        </View>
        <View style={$.body}>
            <Touch
                style={$.center}
                activeOpacity={0.6}
                onPress={_ => onPress && onPress(cont.sourceColumn.slug)}
                >
                <Image
                    source={{ uri: data.author.avatar.image }}
                    style={$.avatar}
                    />
                <Text style={$.name}>{cont.sourceColumn.name}</Text>
                <Text style={$.intro}>{cont.sourceColumn.intro}</Text>
            </Touch>
            <Touch style={$.btn} activeOpacity={0.6}>
                <Text style={$.btnText}>+ 关注</Text>
            </Touch>
        </View>
    </View>
);

const $ = StyleSheet.create({
    root: {
        backgroundColor: '#f9f9f9',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#f3f3f3',
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        padding: 15,
        backgroundColor: '#fff',
        flexDirection: 'row',
    },
    text: {
        marginLeft: 5,
        color: '#555',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 40,
    },
    body: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
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
    btn: {
        marginTop: 10,
        backgroundColor: color,
        borderRadius: 3,
        paddingVertical: 6,
        paddingHorizontal: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: '#fff',
        top: -1,
    },
});

