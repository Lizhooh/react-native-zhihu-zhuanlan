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

class Article extends BaseComponent {

    ok = false;

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

    renderTopbar = () => (
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
                />
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

    renderRecomm = data => (
        <Recomm data={data} onOpenArticle={this.onOpenArticle} />
    );

    onOpenAbout = column => {
        // 异步调到，防止卡顿
        setTimeout(_ => {
            this.props.navigator.push({
                id: 3,
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
        }, 0);
    };

    render() {
        const article = this.props.article;

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
        )

        // 栈空
        if (article.stack.length === 0) {
            return LoadingCompoent;
        }

        const {
            id,
            data,
            contributed
        } = article.stack[article.stack.length - 1];

        if ((article.loading.status ||         // 网络请求中显示 loading
            !data ||                           // 空数据，显示 loading
            id !== this.props.data.id) &&      // 缓存的数据，文章id不同时显示 loading
            !this.ok                           // 首次加载状态
        ) {
            return LoadingCompoent;
        }
        else {
            this.ok = true;
        }

        // 输出
        return (
            <View style={$.contanier}>
                <ScrollView
                    removeClippedSubviews={true}
                    overScrollMode='never'
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    onScroll={this.onScroll}
                    >
                    {this.renderHeader(data)}
                    {this.renderColumn(data, contributed)}
                    {this.renderBody(data)}
                    {this.renderRecomm(data.meta)}
                </ScrollView>

                {this.renderTopbar()}
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
    }
});
