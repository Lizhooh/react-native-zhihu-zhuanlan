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
                        <View style={$.header}>{
                            !!data.titleImage &&
                            <Touch activeOpacity={0.8} style={$.sink}>
                                <Image
                                    source={{ uri: data.titleImage }}
                                    style={$.titleImage}
                                    />
                            </Touch>
                        }

                            <View style={$.title}>
                                <Text style={$.titleText}>
                                    {data.title}
                                </Text>
                            </View>

                            <View style={$.author}>
                                <Image
                                    source={{ uri: data.author.image }}
                                    style={$.authorAvatar}
                                    />
                            </View>
                        </View>

                        <View style={$.body}>
                            <MyWebView html={data.content} />
                        </View>

                        <View style={$.more}>

                        </View>

                        <View style={$.recomm}>

                        </View>

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
    header: {
        backgroundColor: '#fff',
        paddingTop: 50,
    },
    author: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    title: {
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        fontSize: 24,
        color: '#444',
    },
    authorAvatar: {
        width: 40,
        height: 40,
        borderRadius: 40,
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
    }
});

