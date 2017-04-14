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
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from './action';
import {
    color,
    MaterialIcons as Icon,
    BaseComponent,
    TabTopbar,
    devicewindow,
} from '../common';
import MyWebView from './_web';

class Article extends BaseComponent {

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

    componentWillMount() {
        InteractionManager.runAfterInteractions(_ => {
            this.props.loadArticleData(this.props.data.id);
        });
    }

    componentWillUnmount() {
        this.props.clearArticleData();
    }

    renderHeader = () => {
        const data = this.props.article.data;

        return (
            <View style={header.root}>{
                !!data.titleImage &&
                <Touch activeOpacity={0.8} style={header.sink}>
                    <Image
                        source={{ uri: data.titleImage }}
                        style={header.titleImage}
                        />
                </Touch>
            }

                <View style={header.title}>
                    <Text style={header.titleText}>
                        {data.title}
                    </Text>
                </View>

                <View style={header.author}>
                    <Image
                        source={{ uri: data.author.image }}
                        style={header.avatar}
                        />
                    <Text style={header.name}>
                        {data.author.name}
                    </Text>
                </View>
            </View>
        );
    }

    renderBody = () => {
        const data = this.props.article.data;

        return (
            <View style={$.body}>
                <MyWebView html={data.content} />
            </View>
        );
    }

    renderMore = () => {
        const data = this.props.article.data;

        return (
            <View style={$.more}>

            </View>
        );
    }

    renderRecomm = () => {
        return (
            <View style={$.recomm}>

            </View>
        );
    }

    render() {
        const props = this.props;
        const article = props.article;
        const data = article.data;

        if (article.startLoading || !data) {
            return (
                <View style={$.contanier}>
                    <View style={{ flex: 1 }} />
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
                        {this.renderHeader()}
                        {this.renderBody()}
                        {this.renderMore()}
                        {this.renderRecomm()}
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
});

const header = StyleSheet.create({
    root: {
        backgroundColor: '#fafafa',
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


