import React from 'react';
import {
    StyleSheet,
    View, Text, Image,
    TouchableOpacity as Touch,
} from 'react-native';
import { StaticView } from '..';
import { color } from '../../config';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default ({ item }) => (
    <StaticView style={$.view}>
        <Touch style={$.item}
            activeOpacity={0.7}
            key={`comment-${item.id}`}
            >
            <View style={$.left}>
                <Image source={{ uri: item.author.avatar.image }}
                    style={$.avatar}
                    resizeMethod='resize'
                    />
            </View>
            <View style={$.right}>
                <View style={$.row}>
                    <Text style={$.name}>{item.author.name}</Text>
                    {
                        // <View style={$.likes}>
                        //     <Icon name='favorite-border' size={14} color={color} />
                        //     <Text style={$.like}>{`${item.likesCount}`}</Text>
                        // </View>
                    }
                </View>
                {
                    !!item.inReplyToUser &&
                    <View style={[$.row, { padding: 5, flex: 1 }]}>
                        <Text style={{ fontWeight: 'bold', color: '#444' }}>回复：</Text>
                        {
                            <Image
                                source={{ uri: item.inReplyToUser.avatar.image }}
                                style={$.minAvatar}
                                resizeMethod='resize'
                                />
                        }
                        <Text>{item.inReplyToUser.name}</Text>
                    </View>
                }
                <Text style={$.content}>{item.content.replace(/<[^>]+>/gi, '')}</Text>
            </View>
        </Touch>
    </StaticView>
)

const $ = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    view: {
        backgroundColor: '#ddd',
    },
    avatar: {
        width: 45,
        height: 45,
        borderRadius: 45,
    },
    minAvatar: {
        height: 20,
        width: 20,
        borderRadius: 20,
        marginRight: 5,
    },
    item: {
        backgroundColor: '#fafafa',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#efefef',
    },
    left: {
        padding: 10,
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    right: {
        flex: 1,
        padding: 13,
        paddingLeft: 0,
    },
    name: {
        fontSize: 16,
        color: '#444',
    },
    content: {
        color: '#777',
        fontSize: 14,
        flex: 1,
        lineHeight: 24,
    },
    likes: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    like: {
        color: color,
        fontSize: 13,
        top: -1,
        marginLeft: 2,
    }
});
