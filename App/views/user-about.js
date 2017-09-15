import React, { Component } from 'react';
import {
    StyleSheet,
    View, Text, Image,
    TouchableOpacity as Touch,
    Linking,
    WebView,
} from 'react-native';
import { Topbar } from '../components';
import { author } from '../config';

export default class UserAbout extends Component {

    constructor(props) {
        super(props);
    }

    onPress = e => {
        Linking.openURL(author.link).catch(err => {
            console.error(err);
        })
    }

    render() {
        const HTML = this.props.data;

        return (
            <View style={$.container}>
                <Topbar title='关于' onBack={this.props.navigator.pop} />
                <View style={$.header}>
                    <WebView source={{ html: HTML }}
                        domStorageEnabled={true}
                        />
                </View>
                <Touch style={$.body}
                    onPress={this.onPress}
                    activeOpacity={0.75}
                    >
                    <Image
                        source={{ uri: author.avatar }}
                        resizeMethod='resize'
                        style={$.avatar}
                        />
                    <Text style={$.text}>
                        作者：Lizhooh
                    </Text>
                    <Text style={$.text}>当前版本：v1.1.0 bate</Text>
                    <Text style={$.text}>邮箱：lizhoohs@foxmail.com</Text>
                </Touch>
            </View>
        );
    }
}

const $ = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        width: '100%',
        height: 360,
    },
    body: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 1,
        padding: 20,
    },
    text: {
        fontSize: 15,
        marginTop: 4,
    },
    avatar: {
        height: 35,
        width: 35,
        borderRadius: 35,
    }
})