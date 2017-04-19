import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity as Touch,
    ScrollView,
    InteractionManager,
    ToastAndroid,
    ActivityIndicator,
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
import MyWebView from './_web';
import Column from './_column';
import Header from './_header';
import Recomm from './_recomm';
import Comment from './_comment';

const last = (arr) => arr[arr.length - 1];

class Article extends BaseComponent {

    static Comment = Comment;

    constructor(props) {
        super(props);

        this.ok = false;     // 用来标志着是否已成功渲染过数据
        this.cacheId = null; // 缓存数据
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(_ => {
            setTimeout(_ => {
                this.props.loadArticleData(this.props.data.id);
            }, 30);
        });
    }

    componentWillUnmount() {
        InteractionManager.runAfterInteractions(_ => {
            setTimeout(_ => {
                this.props.clearArticleData();
            }, 30);
        });
    }

    // 渲染优化
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.article.loading.status === true) return true;

        const stack = this.props.article.stack;
        const _stack = nextProps.article.stack;
        const id = last(stack) && last(stack).id;
        const _id = last(_stack) && last(_stack).id;

        if (this.state.opacity !== nextState.opacity) return true;

        // 解决多个文章页面存在时，会渲染不在栈顶的文章页面的问题
        if (!!this.cacheId && this.cacheId !== _id) return false;

        // 打开文章里专栏介绍，禁止重新渲染此页面
        if (id === _id) return false;

        return true;
    }

    renderTopbar = ({commentsCount = 0, likesCount = 0} = {}, id) => (
        <View style={{ flex: 0 }}>
            <TabTopbar
                iconName='arrow-back'
                style={{
                    opacity: this.state.opacity,
                    top: -1 * devicewindow.height + 25,
                }}
                iconPress={_ => {
                    this.props.navigator.pop();
                } }
                >
                <View style={$.topbarRight}>
                    <Touch style={$.row} activeOpacity={0.6}
                        onPress={_ => this.onOpenComment(id)}
                        >
                        <Icon style={$.span} name='image-aspect-ratio' color={color} size={26} />
                        <Text style={$.spanText}>{`${commentsCount}`}</Text>
                    </Touch>

                    <Touch style={$.row} activeOpacity={0.6}>
                        <Icon style={$.span} name='favorite-border' color={color} size={26} />
                        <Text style={$.spanText}>{`${likesCount}`}</Text>
                    </Touch>

                    <Touch style={$.row} activeOpacity={0.6}>
                        <Icon style={$.span} name='share' color={color} size={26} />
                    </Touch>
                </View>
            </TabTopbar>
        </View>
    );

    renderHeader = data => (
        <Header data={data} />
    );

    renderBody = data => (
        <View style={$.body}>
            <MyWebView html={data.content} />
        </View>
    );

    renderColumn = (data, cont) => (
        cont &&
        <Column data={data} cont={cont} onOpenColumn={this.onOpenAbout} />
    );

    renderRecomm = (data, recomm) => (
        <Recomm data={data} recomm={recomm}
            onOpenArticle={this.onOpenArticle} />
    );

    onOpenAbout = column => {
        // 异步调到，防止卡顿
        setTimeout(_ => {
            this.props.navigator.push({
                id: 21,
                name: 'Special.About',
                data: { column }
            });
        }, 0);
    };

    onOpenArticle = id => {
        setTimeout(_ => {
            this.props.navigator.push({
                id: 1,
                name: 'Article',
                data: { id }
            });
        });
    };

    onOpenComment = id => {
        setTimeout(_ => {
            this.props.navigator.push({
                id: 11,
                name: 'Article.Comment',
                data: { id }
            });
        });
    };

    render() {
        const article = this.props.article;
        const stack = article.stack;
        const _id = this.props.data.id;

        const LoadingCompoent = (
            <View style={$.contanier}>
                <View style={[{ flex: 1 }, $.center]}>
                    <ActivityIndicator
                        animating={true}
                        size="small"
                        color={color}
                        />
                    <Text>加载中</Text>
                </View>
                {this.renderTopbar()}
            </View>
        );

        // 栈空
        if (stack.length === 0) {
            return LoadingCompoent;
        }

        const {
            id,
            data,
            contributed,
            recomm,
        } = last(stack);

        // 网络请求中显示 loading，网络请求发生在导航动画完成后
        // 空数据，显示 loading
        // 首次加载状态 ok = false
        if ((article.loading.status || !data || id !== _id) && !this.ok) {
            return LoadingCompoent;
        }
        else {
            // 首次加载完成
            this.ok = true;
            // 缓存当前 ID
            this.cacheId = id;
        }

        // 输出
        return (
            <View style={$.contanier}>
                <ScrollView
                    ref={s => this.scrollView = s}
                    removeClippedSubviews={true}
                    overScrollMode='never'
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    onScroll={this.onScroll}
                    >
                    {this.renderHeader(data)}
                    {this.renderColumn(data, contributed)}
                    {this.renderBody(data)}
                    {this.renderRecomm(data.meta, recomm)}
                </ScrollView>

                {this.renderTopbar(data, id)}
            </View>
        );
    }
}

export default connect(
    state => ({
        article: state.article,
    }),
    actions,
)(Article);

const $ = StyleSheet.create({
    contanier: {
        flex: 1,
        backgroundColor: '#fff',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    span: {
        margin: 4,
    },
    spanText: {
        color: color,
        top: -1,
    },
    topbarRight: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        height: 50,
    }
});
