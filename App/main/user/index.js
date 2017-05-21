import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity as Touch,
    ScrollView,
    PixelRatio,
    DrawerLayoutAndroid,
    InteractionManager,
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from './action';
import {
    MaterialIcons as Icon,
    devicewindow,
    color,
    onePixel,
} from '../common';

import _looks from './_looks';

const avatar = require('./img/avatar.jpg');
const { listone, listtwo } = require('./config.json');

import Setting from './_setting';

// # 用户信息
class User extends Component {

    static Looks = _looks;

    componentDidMount() {
        InteractionManager.runAfterInteractions(_ => {
            this.props.initUser();
        });
    }

    renderTopbar = () => (
        <View style={$.topbar}>
            <Touch
                activeOpacity={0.8}
                onPress={_ => this.drawer.closeDrawer()}
                >
                <Icon name={'arrow-back'} size={28} color={color} />
            </Touch>
        </View>
    );

    // 设置
    renderNavigationView = () => (
        <View style={$.setting}>
            {this.renderTopbar()}
            <Setting />
        </View>
    );

    onOpen = (event, i) => {
        if (i.name === 'remove-red-eye') {
            this.props.navigator.push({
                id: 33,
                name: 'User.Looks',
            });
        }
    }

    render() {
        const props = this.props;
        const user = props.user;

        return (
            <DrawerLayoutAndroid
                ref={drawer => this.drawer = drawer}
                drawerWidth={devicewindow.width}
                drawerPosition={DrawerLayoutAndroid.positions.Right}
                renderNavigationView={this.renderNavigationView}
                drawerLockMode={'locked-closed'}
                keyboardDismissMode='on-drag'
                >
                <ScrollView
                    style={$.contanier}
                    overScrollMode='never'
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    >

                    {/* 图片 */}
                    <View style={$.header}>
                        <Image source={avatar} style={$.full} />
                    </View>

                    {/* 用户浏览信息 */}
                    <View style={$.list}>{
                        listone.map((i, index) => (
                            <Touch
                                activeOpacity={0.8}
                                style={$.item}
                                key={`user-list-${index}`}
                                onPress={event => this.onOpen(event, i)}
                                >
                                <Icon style={$.icon} name={i.name} color={i.color} size={26} />
                                <Text style={$.mid}>{i.title}</Text>
                                <Text style={$.text}>
                                    {i.name === 'remove-red-eye' && `${user.looks.length}`}
                                    {i.text}
                                </Text>
                            </Touch>
                        ))
                    }</View>

                    {/* 反馈与设置 */}
                    <View style={[$.list, { marginTop: 0 }]}>{
                        listtwo.map((i, index) => (
                            <Touch
                                activeOpacity={0.8}
                                style={$.item}
                                key={`user-list-${index}`}
                                onPress={_ => index === 0 && this.drawer.openDrawer()}
                                >
                                <Icon style={$.icon} name={i.name} color={i.color} size={26} />
                                <Text style={$.mid}>{i.title}</Text>
                                <Text style={$.text}>{i.text}</Text>
                            </Touch>
                        ))
                    }</View>
                </ScrollView>
            </DrawerLayoutAndroid>
        );
    }
}

export default connect(
    state => ({ user: state.user }),
    actions,
)(User);

const $ = StyleSheet.create({
    contanier: {
        flex: 1,
        backgroundColor: '#f6f6f6',
    },
    header: {
        height: 200,
        overflow: 'hidden',
        paddingBottom: 3,
    },
    full: {
        width: '100%',
        height: '100%',
    },
    list: {
        backgroundColor: 'rgba(1, 1, 1, 0.15)',
        marginVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e6e6e6',
        borderTopColor: '#f3f3f3',
        borderTopWidth: 1,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomWidth: onePixel,
        borderBottomColor: '#f4f4f4',
    },
    icon: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    mid: {
        flex: 1,
    },
    text: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        color: 'rgba(1, 1, 1, 0.4)',
    },
    topbar: {
        height: 50,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    setting: {
        backgroundColor: '#f6f6f6',
        flex: 1,
    },
});