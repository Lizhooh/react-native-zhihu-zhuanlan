import React from 'react';
import {
    StyleSheet,
    View, Text, Image,
    TouchableOpacity as Touch,
} from 'react-native';
import Column from './column';

export default ({title, data, cont = {}, openColumn }) => (
    <View style={$.root}>
        <View style={$.title}>
            <Text style={$.titleText}>{title}</Text>
        </View>
        {data.author &&
            <View collapsable={true}>
                <View style={$.author}>
                    <Image
                        source={{ uri: data.author.avatar.image }}
                        style={$.avatar}
                        />
                    <View style={{ flex: 1 }}>
                        <Text style={$.name}>
                            {data.author.name}
                        </Text>
                        <Text style={$.intro} numberOfLines={1}>
                            {cont.sourceColumn && cont.sourceColumn.intro}
                        </Text>
                    </View>
                </View>
                {cont.sourceColumn &&
                    <Column cont={cont} data={data} onPress={openColumn} />
                }
            </View>
        }
    </View>
);

const $ = StyleSheet.create({
    root: {
        backgroundColor: '#f9f9f9',
    },
    title: {
        backgroundColor: '#fcfcfc',
        padding: 8,
        paddingBottom: 10,
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
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 45,
        height: 45,
        borderRadius: 45,
    },
    name: {
        marginLeft: 10,
        fontSize: 16,
        color: '#333',
        fontWeight: '600',
        paddingRight: 10,
    },
    intro: {
        marginTop: 4,
        color: '#777',
        marginLeft: 10,
        paddingRight: 10,
    },
});
