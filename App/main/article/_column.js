import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity as Touch,
} from 'react-native';
import {
    color,
    MaterialIcons as Icon,
    onePixel
} from '../common';

export default ({ data, cont, onOpenColumn }) => (
    <View style={column.root} >
        <View style={column.header}>
            <Icon name='near-me' color={color} size={16} />
            <Text style={column.text}>专栏</Text>
        </View>
        <View style={column.body}>
            <Touch
                style={column.center}
                activeOpacity={0.6}
                onPress={_ => onOpenColumn(cont.sourceColumn)}
                >
                <Image
                    source={{ uri: data.author.avatar.image }}
                    style={column.avatar}
                    />
                <Text style={column.name}>
                    {cont.sourceColumn.name}
                </Text>
                <Text style={column.intro}>
                    {cont.sourceColumn.intro}
                </Text>
            </Touch>
            <Touch style={column.btn} activeOpacity={0.6}>
                <Text style={column.btnText}>
                    + 关注
                </Text>
            </Touch>
        </View>
    </View>
);

const column = StyleSheet.create({
    root: {
        backgroundColor: '#f9f9f9',
        borderTopWidth: onePixel,
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

