import React from 'react';
import {
    StyleSheet,
    View, Text, Image,
    TouchableOpacity as Touch,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { color } from '../../config'
import ImageProgress from 'react-native-image-progress';
import { fromNow } from '../../functions';

export default ({ item, onPress = () => { } }) => (
    <Touch
        style={$.item}
        activeOpacity={0.8}
        onPress={_ => onPress(item)}
        >
        <View>{
            !!item.titleImage &&
            <ImageProgress
                source={{ uri: item.titleImage }}
                style={$.titleImage}
                resizeMethod='resize'
                />
        }</View>
        <View>
            <Text style={$.title}>{item.title}</Text>
            <Text style={$.summary} numberOfLines={3}>
                {item.minContent}
            </Text>
            {/*底部的信息栏*/}
            <View style={$.bottom}>
                <View style={$.bottoml}>
                    <Image
                        source={{ uri: item.author.avatar.image }}
                        style={$.userImage}
                        resizeMethod='resize'
                        />
                    <Text>{item.author.name} · </Text>
                    <Text style={$.time}>{fromNow(item.publishedTime)}</Text>
                </View>
                <View style={$.bottomr}>
                    <Icon name='favorite-border' color={color} size={15} />
                    <Text style={$.span}>{`${item.likesCount}`}</Text>
                    <Icon name='speaker-notes' color={color} size={15} />
                    <Text style={$.span}>{`${item.commentsCount}`}</Text>
                </View>
            </View>
        </View>
    </Touch>
)

const $ = StyleSheet.create({
    root: {
        backgroundColor: '#f9f9f9',
        flex: 1,
    },
    item: {
        justifyContent: 'center',
    },
    titleImage: {
        height: 150,
        width: '100%',
    },
    title: {
        color: '#555',
        fontSize: 18,
        paddingHorizontal: 10,
        paddingVertical: 8,
        backgroundColor: '#fff',
        lineHeight: 28,
    },
    summary: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        lineHeight: 22,
    },
    userImage: {
        width: 30,
        height: 30,
        borderRadius: 30,
        marginRight: 8,
    },
    bottom: {
        flexDirection: 'row',
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    bottoml: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
    bottomr: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    span: {
        marginHorizontal: 3,
        marginRight: 5,
        top: -1,
        color: color,
        fontSize: 13,
    },
    footer: {
        height: 35,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    time: {
        fontSize: 12,
        color: '#888',
    }
});
