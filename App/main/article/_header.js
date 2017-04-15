import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity as Touch,
} from 'react-native';

export default ({data}) => (
    <View style={$.root}>{
        !!data.titleImage &&
        <Touch activeOpacity={0.8} style={$.sink}>
            <Image
                source={{ uri: data.titleImage }}
                style={$.titleImage}
                />
        </Touch>
    }
        <View style={$.title}>
            <Text style={$.titleText}>
                {data.title}
            </Text>
        </View>

        <View style={$.author}>
            <Image
                source={{ uri: data.author.avatar.image }}
                style={$.avatar}
                />
            <Text style={$.name}>
                {data.author.name}
            </Text>
        </View>
    </View>
);

const $ = StyleSheet.create({
    root: {
        backgroundColor: '#f9f9f9',
        paddingTop: 50,
    },
    title: {
        padding: 6,
        paddingHorizontal: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        fontSize: 24,
        color: '#444',
        lineHeight: 36,
    },
    sink: {
        height: 240,
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    titleImage: {
        height: '100%',
        width: '100%',
    },
    author: {
        paddingBottom: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 40,
    },
    name: {
        marginLeft: 15,
        fontSize: 16,
        color: '#666',
    }
});
