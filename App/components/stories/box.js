import React, { Component } from 'react';
import {
    StyleSheet,
    View, Text, Image,
    TouchableOpacity as Touch,
} from 'react-native';
import ImageProgress from 'react-native-image-progress';
import { fromNow } from '../../functions';

export default class Box extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.item.id === this.props.item.id;
    }

    render() {
        const { item, onPress = () => { } } = this.props;

        return (
            <View style={$.view}>
                <Touch style={$.item}
                    activeOpacity={0.8}
                    onPress={_ => onPress(item)}
                    >
                    {// 配图，可能为空
                        !!item.image_url &&
                        <View style={$.headimg}>
                            <ImageProgress
                                source={{ uri: item.image_url }}
                                style={$.full}
                                resizeMethod='resize'
                                />
                        </View>
                    }
                    <View style={$.info}>
                        <View style={$.user}>
                            {// 头像，可能为空
                                item.column && !!item.column.image_url &&
                                <Image
                                    source={{ uri: item.column.image_url }}
                                    style={$.userAvatar}
                                    resizeMethod='resize'
                                    />
                            }
                            {// 作者名，可能为空
                                item.column && item.column.name &&
                                <Text style={$.userName}>
                                    {item.column && item.column.name}
                                </Text>
                            }
                        </View>
                        <View style={$.infoc}>
                            <Text style={$.title}>{item.title}
                                <Text style={$.time}> {fromNow(item.publishedTime)}</Text>
                            </Text>
                            <Text style={$.summary} numberOfLines={3}>
                                {item.summary.replace(/\<(.*?)\>/g, '')}
                            </Text>
                        </View>
                    </View>
                </Touch>
            </View>
        );
    }
}

const $ = StyleSheet.create({
    view: {
        backgroundColor: '#cfcfcf',
    },
    item: {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: 'rgba(1, 1, 1, 0.05)',
        backgroundColor: '#fbfbfb',
    },
    title: {
        color: '#333',
        fontSize: 18,
        lineHeight: 24,
    },
    time: {
        fontSize: 12,
        color: '#888',
    },
    summary: {
        lineHeight: 22,
        fontSize: 14,
        color: '#888',
    },
    headimg: {
        height: 180,
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
    },
    full: {
        width: '100%',
        height: '100%',
    },
    infoc: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    user: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    userAvatar: {
        width: 35,
        height: 35,
        borderRadius: 35,
        marginRight: 15,
        marginVertical: 5,
    },
    userName: {
        color: '#555',
        fontWeight: '500'
    }
})