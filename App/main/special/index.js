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

class Special extends BaseComponent {

    componentWillMount() {
        InteractionManager.runAfterInteractions(_ => {
            this.props.loadSpecialData(this.props.data.column);
        });
    }

    componentWillUnmount() {
        InteractionManager.runAfterInteractions(_ => {
            this.props.clearSpecialData();
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

