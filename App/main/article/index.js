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

class Article extends BaseComponent {

    componentDidMount() {
        InteractionManager.runAfterInteractions(_ => {
            setTimeout(_ => {
                this.props.loadArticleData(this.props.data.id);
            }, 100);
        });
    }

    componentWillUnmount() {
        InteractionManager.runAfterInteractions(_ => {
            setTimeout(_ => {
                this.props.clearArticleData();
            }, 100);
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
                    source={{ uri: data.author.avatar.image }}
                    style={header.avatar}
                    />
                <Text style={header.name}>
                    {data.author.name}
                </Text>
            </View>
        </View>
    );

    renderBody = data => (
        <View style={$.body}>
            <MyWebView html={data.content} />
        </View>
    );

    renderColumn = (data, cont) => (
        cont &&
        <View style={column.root} >
            <View style={column.header}>
                <Icon name='near-me' color={color} size={16} />
                <Text style={column.text}>专栏</Text>
            </View>
            <View style={column.body}>
                <Touch
                    style={$.center}
                    activeOpacity={0.6}
                    onPress={_ => this.onOpenColumn(cont.sourceColumn)}
                    >
                    <Image
                        source={{ uri: data.author.avatar.image }}
                        style={column.avatar}
                        />
                    <Text style={column.name}>
                        {cont.sourceColumn.name}
                    </Text>
                    <Text style={column.intro}>
                        {cont.sourceColumn.intro}
                    </Text>
                </Touch>
                <Touch style={column.btn} activeOpacity={0.6}>
                    <Text style={column.btnText}>
                        + 关注
                    </Text>
                </Touch>
            </View>
        </View>
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

const header = StyleSheet.create({
    root: {
        backgroundColor: '#f9f9f9',
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

const column = StyleSheet.create({
    root: {
        backgroundColor: '#f9f9f9',
        borderTopWidth: onePixel,
        borderTopColor: '#f3f3f3',
    },
    header: {
        padding: 15,
        backgroundColor: '#fff',
        flexDirection: 'row',
    },
    text: {
        marginLeft: 5,
        color: '#555',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 40,
    },
    body: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
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
    btn: {
        marginTop: 10,
        backgroundColor: color,
        borderRadius: 3,
        paddingVertical: 6,
        paddingHorizontal: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: '#fff',
        top: -1,
    },
});

