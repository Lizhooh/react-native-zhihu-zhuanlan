import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity as Touch,
    ScrollView,
    ActivityIndicator,
    InteractionManager,
    FlatList,
    ToastAndroid,
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from './action';
import {
    color,
    MaterialIcons as Icon,
    BaseComponent,
    TabTopbar,
    devicewindow,
    onePixel,
} from '../common';
import About from './about';

// # 专栏信息
class Special extends BaseComponent {

    // 使用： <Special.About />
    static About = About;

    componentDidMount() {
        InteractionManager.runAfterInteractions(_ => {
            setTimeout(_ => {
                this.props.loadSpecial(this.props.data.column);
            }, 30);
        });

        // 加载更多用的标志
        this.loading = false;
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.special.listLoading.status) {
            this.loading = false;
        }
    }

    // 清除数据
    componentWillUnmount() {
        InteractionManager.runAfterInteractions(_ => {
            setTimeout(_ => {
                this.props.clearSpecial();
            }, 30);
        });
    }

    // 渲染优化
    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.opacity !== nextState.opacity) return true;

        const special = this.props.special;
        const _special = nextProps.special;

        // 加载中
        if (special.loading.status === true) return true;

        // 加载更多的文章列表
        if (_special.listLoading.status != special.listLoading.status) return true;
        if (special.list.length != _special.list.length) return true;

        // 打开专栏介绍，**禁止**重新渲染此页面
        if (special.name === _special.name) return false;

        return true;
    }

    // bug 重复触发 loadMoreSearchData
    onMore = event => {
        if (this.loading) return;

        const range = 30;
        const props = this.props;
        const special = props.special;
        const status = special.listLoading.status;
        const {
            contentSize: { height },
            contentOffset: { y }
        } = event.nativeEvent;

        // 加上设备的高度
        const Height = devicewindow.height - 105 + y;

        // range 是范围
        if (Height >= height - range && Height <= height && !status && !this.loading) {
            this.loading = true;

            props.loadMoreSpecialList(
                special.name,
                special.limit,
                special.page,
            );
        }
    };

    // 顶端栏
    renderTopbar = () => (
        <TabTopbar
            iconName='arrow-back'
            iconPress={_ => {
                this.props.navigator.pop();
            } }
            />
    );

    // 头部内容
    renderHeader = data => (
        <View style={header.body}>
            <Touch
                style={$.center}
                activeOpacity={0.6}
                onPress={_ => this.onOpenAbout(this.props.data.column)}
                >
                <Image
                    source={{ uri: data.avatar.image }}
                    style={header.avatar}
                    />
                <Text style={header.name}>
                    {data.name}
                </Text>
                <View style={header.description}>
                    <Text>{data.description}</Text>
                </View>
            </Touch>
            <Touch style={header.btn} activeOpacity={0.6}>
                <Icon name='near-me' color={'#fff'} size={16} />
                <Text style={header.btnText}>
                    + 关注（{`${data.followersCount}`} 人）
                    </Text>
            </Touch>
        </View>
    );

    // 专题
    renderBody = data => (
        <View style={body.root}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                removeClippedSubviews={!true}
                overScrollMode='never'
                horizontal={true}
                >
                <Touch style={body.item} activeOpacity={0.7}>
                    <Text style={body.text}>全部</Text>
                    <Icon name='subject' color='#fff' size={14} />
                    <Text style={body.text}>{`${data.postsCount}`}</Text>
                </Touch>
                {
                    data.postTopics
                        .sort((a, b) => b.postsCount - a.postsCount)
                        .slice(0, 8)
                        .map((i, index) => (
                            <Touch
                                key={`body-${index}`}
                                style={body.item}
                                activeOpacity={0.6}
                                >
                                <Text style={body.text}>{i.name}</Text>
                                <Icon name='subject' color='#fff' size={14} />
                                <Text style={body.text}>{`${i.postsCount}`}</Text>
                            </Touch>
                        ))
                }
            </ScrollView>
        </View>
    );

    // 列表
    renderList = (lists, msg) => (
        <View collapsable={true}>
            <FlatList
                style={list.root}
                overScrollMode='never'
                showsVerticalScrollIndicator={false}
                data={lists}
                renderItem={this.renderItem}
                />
            <View style={list.footer}>
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
        </View>
    );

    // 列表元素
    renderItem = ({item: i, index}) => (
        <Touch
            style={list.item}
            activeOpacity={0.8}
            onPress={_ => this.onOpenArticle(i.slug)}
            >
            <View>{
                !!i.titleImage &&
                <Image
                    source={{ uri: i.titleImage }}
                    style={list.titleImage}
                    />
            }</View>
            <View>
                <Text style={list.title}>{i.title}</Text>
                <Text style={list.summary}>
                    {i.minContent}......
                </Text>
                {/*底部的信息栏*/}
                <View style={list.bottom}>
                    <View style={list.bottoml}>
                        <Image
                            source={{ uri: i.author.avatar.image }}
                            style={list.userImage}
                            />
                        <Text>{i.author.name}</Text>
                    </View>
                    <View style={list.bottomr}>
                        <Icon name='favorite-border' color={color} size={15} />
                        <Text style={list.span}>{`${i.likesCount}`}</Text>
                        <Icon name='speaker-notes' color={color} size={15} />
                        <Text style={list.span}>{`${i.commentsCount}`}</Text>
                    </View>
                </View>
            </View>
        </Touch>
    );

    // 打开文章
    onOpenArticle = id => {
        this.props.navigator.push({
            id: 1,
            name: 'Article',
            data: { id }
        });
    }

    // 打开关于
    onOpenAbout = column => {
        // 异步调到，防止卡顿
        setTimeout(_ => {
            this.props.navigator.push({
                id: 21,
                name: 'Special.About',
                data: { column }
            });
        }, 0);
    }

    render() {
        const special = this.props.special;
        const { data, list, listLoading: { msg } } = special;

        // 加载中
        if (special.startLoading && !data) {
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

        if (data) {
            return (
                <View style={$.contanier}>
                    {this.renderTopbar()}
                    <ScrollView
                        overScrollMode='never'
                        removeClippedSubviews={!true}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        onScroll={this.onMore}
                        >
                        {this.renderHeader(data)}
                        {this.renderBody(data)}
                        {this.renderList(list, msg)}
                    </ScrollView>
                </View>
            );
        }
    }
}

export default connect(
    state => ({ special: state.special }),
    actions,
)(Special);

const $ = StyleSheet.create({
    contanier: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const header = StyleSheet.create({
    text: {
        marginLeft: 5,
        color: '#555',
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

const body = StyleSheet.create({
    root: {
        padding: 10,
        backgroundColor: '#fff',
        borderTopWidth: onePixel,
        borderBottomWidth: onePixel,
        borderColor: '#ececec',
    },
    item: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        margin: 10,
        backgroundColor: 'rgba(1, 1, 1, 0.45)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2,
        flexDirection: 'row',
    },
    text: {
        fontSize: 14,
        top: -1,
        color: '#fff',
    }
});

const list = StyleSheet.create({
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
        paddingHorizontal: 15,
        paddingVertical: 6,
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
});