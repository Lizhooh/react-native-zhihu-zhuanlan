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

class Special extends BaseComponent {

    componentDidMount() {
        InteractionManager.runAfterInteractions(_ => {
            setTimeout(_ => {
                this.props.loadSpecialData(this.props.data.column);
            }, 100);
        });
    }

    componentWillUnmount() {
        InteractionManager.runAfterInteractions(_ => {
            setTimeout(_ => {
                this.props.clearSpecialData();
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
        <View style={header.root}>
            <View style={header.body}>
                <Touch style={$.center} activeOpacity={0.6}>
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
        </View>
    );

    renderBody = data => (
        <View style={body.root}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                overScrollMode='never'
                horizontal={true}
                >
                <Touch style={body.item} activeOpacity={0.7}>
                    <Text style={body.text}>全部</Text>
                    <Icon name='subject' color='#fff' size={14} />
                    <Text style={body.text}>{`${data.postsCount}`}</Text>
                </Touch>
                {
                    data.postTopics.map((i, index) => (
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

    renderList = list => {
        return <FlatList
            style={{ flex: 1 }}
            overScrollMode='never'
            showsVerticalScrollIndicator={false}
            data={list}
            renderItem={this.renderItem}
            removeClippedSubviews={true}
            />
    };

    renderItem = ({item: i, index}) => (
        !!i &&
        <View style={list.item}>
            <View>{
                !!i.titleImage &&
                <Image
                    source={{ uri: i.titleImage }}
                    style={list.titleImage}
                    />
            }</View>
            <View>
                <Text style={list.title}>{i.title}</Text>
            </View>
        </View>
    );

    render() {
        const props = this.props;
        const special = props.special;
        const data = special.data;
        const list = special.list;

        if (special.startLoading && !data) {
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
                        overScrollMode='never'
                        removeClippedSubviews={true}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        onScroll={this.onScroll}
                        >
                        {this.renderHeader(data)}
                        {this.renderBody(data)}
                        {this.renderList(list)}
                    </ScrollView>

                    {this.renderTopbar()}
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
    }
});

const header = StyleSheet.create({
    root: {
        paddingTop: 50,
    },
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
    item: {
        justifyContent: 'center',
        marginVertical: 10,
    },
    titleImage: {
        height: 150,
        width: '100%',
    },
    title: {
        color: '#555',
        fontSize: 18,
    }
});