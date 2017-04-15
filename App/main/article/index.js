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

class Article extends BaseComponent {

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
        <Column data={data} cont={cont} onOpenColumn={this.onOpenColumn} />
    );

    renderRecomm = data => (
        <View style={$.recomm}>

        </View>
    );

    onOpenColumn = column => {
        this.props.navigator.push({
            id: 2,
            name: 'Special',
            data: { column: column.slug }
        });
    };

    onOpenArticle = data => {
    };

    render() {
        const props = this.props;
        const article = props.article;
        const data = article.data;
        const contributed = article.contributed;

        if (article.startLoading || !data) {
            return (
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
        }

        if (data) {
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
                        {this.renderRecomm(data)}
                    </ScrollView>

                    {this.renderTopbar()}
                </View>
            );
        }
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
