import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity as Touch,
    Text,
    ScrollView,
    InteractionManager,
    FlatList,
    ActivityIndicator,
    ToastAndroid,
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from './action';
import {
    MaterialIcons as Icon,
    color,
    onePixel,
    devicewindow,
} from '../../common';

// # 评论
class Comment extends Component {

    componentDidMount() {
        InteractionManager.runAfterInteractions(_ => {
            if (this.props.data.id === this.props.comment.id) return;
            setTimeout(_ => {
                this.props.loadCommnetData(
                    this.props.data.id,
                );
            });
        });

        this.loading = false;
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.comment.loadingMore) {
            this.loading = false;
        }
    }

    // 顶端栏
    renderTopbar = () => (
        <View style={$.topbar}>
            <Touch
                activeOpacity={0.8}
                onPress={_ => this.props.navigator.pop()}
                >
                <Icon name={'arrow-back'} size={28} color={color} />
            </Touch>
        </View>
    );

    // 列表元素
    renderItem = ({item: i, index}) => (
        <Touch style={$.item} activeOpacity={0.6}>
            <View style={$.left}>
                <Image source={{ uri: i.author.avatar.image }} style={$.avatar} />
            </View>
            <View style={$.right}>
                <View style={$.row}>
                    <Text style={$.name}>{i.author.name}</Text>

                    <View style={$.likes}>
                        <Icon name='favorite-border' size={14} color={color} />
                        <Text style={$.like}>{`${i.likesCount}`}</Text>
                    </View>
                </View>

                {
                    !!i.inReplyToUser &&
                    <View style={[$.row, { padding: 5, flex: 1 }]}>
                        <Text style={{ fontWeight: 'bold', color: '#444' }}>回复：</Text>
                        <Image
                            source={{ uri: i.inReplyToUser.avatar.image }}
                            style={$.minAvatar} />
                        <Text>  {i.inReplyToUser.name}</Text>
                    </View>
                }

                <Text style={$.content}>{i.content.replace(/<[^>]+>/gi, '')}</Text>
            </View>
        </Touch>
    );

    onMore = event => {
        if (this.loading) return;

        const {
            contentSize: { height },        // 内容高度
            contentOffset: { y }            // 偏移量
        } = event.nativeEvent;

        const loadingMore = this.props.comment.loadingMore;

        // 加上设备的高度
        const Height = devicewindow.height - 75 + y;

        // 30 是范围
        if (Height >= height - 30 && Height <= height && !loadingMore && !this.loading) {
            this.loading = true;
            this.props.loadMoreCommentData();
        }
    }

    render() {
        const comment = this.props.comment;
        const { id, data, loading, msg } = comment;
        const _id = this.props.data.id;

        // 加载中
        if (loading || data === null || id !== _id) {
            return (
                <View style={$.contanier}>
                    {this.renderTopbar()}
                    <View style={[{ flex: 1 }, $.center]}>
                        <ActivityIndicator
                            animating={true}
                            size="small"
                            color={color}
                            />
                        <Text>加载中</Text>
                    </View>
                </View>
            );
        }

        return (
            <View style={$.contanier}>
                {this.renderTopbar()}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    removeClippedSubviews={true}
                    overScrollMode='never'
                    onScroll={this.onMore}
                    >
                    <FlatList
                        style={$.flatlist}
                        overScrollMode='never'
                        showsVerticalScrollIndicator={false}
                        data={data}
                        renderItem={this.renderItem}
                        removeClippedSubviews={true}
                        />
                    <View style={$.footer}>
                        {
                            msg === '加载中' &&
                            <ActivityIndicator
                                animating={true}
                                size="small"
                                color={color}
                                />
                        }
                        <Text>{msg}</Text>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default connect(
    state => ({ comment: state.comment }),
    actions
)(Comment);


const $ = StyleSheet.create({
    contanier: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    topbar: {
        height: 50,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        height: 35,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    flatlist: {
        backgroundColor: '#f6f6f6',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    minAvatar: {
        height: 20,
        width: 20,
        borderRadius: 20
    },
    item: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: onePixel,
        borderBottomColor: '#f3f3f3',
    },
    left: {
        padding: 15,
    },
    right: {
        flex: 1,
        padding: 15,
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


