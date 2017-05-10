import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity as Touchs,
    ScrollView,
    Switch,
    Modal,
    TextInput,
    WebView,
} from 'react-native';
import {
    onePixel,
    color,
    MaterialIcons as Icon,
} from '../common';

const Touch = (props) => (
    <Touchs {...props} activeOpacity={0.7}>{props.children}</Touchs>
);

export default class Setting extends Component {

    constructor(props) {
        super(props);

        this.state = {
            find: true,
            modal: false,
        };
    }

    render() {

        return (
            <View style={$.contanier}>
                <ScrollView
                    overScrollMode='never'
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    removeClippedSubviews={false}
                    style={{ paddingVertical: 5 }}
                    >

                    <Touch style={$.row}>
                        <View style={$.left}>
                            <Text>数据缓存</Text>
                        </View>

                        <View style={$.right}>
                            <Text>4.00 KB </Text>
                        </View>
                    </Touch>


                    <Touch style={$.row}>
                        <View style={$.left}>
                            <Text>使用深度搜索引擎</Text>
                        </View>

                        <View style={$.right}>
                            <Switch value={this.state.find} onValueChange={event =>
                                this.setState({ find: !this.state.find })
                            } />
                        </View>
                    </Touch>


                    <Touch
                        style={$.row}
                        onPress={event => this.setState({ modal: true })}
                        >
                        <View style={$.left}>
                            <Text>反馈</Text>
                        </View>

                        <View style={$.right}>
                            <Icon name='chevron-right' size={24} color={'#ccc'} />
                        </View>
                    </Touch>


                    {/* 反馈信息 */}
                    <Modal
                        animationType={"fade"}
                        transparent={true}
                        visible={this.state.modal}
                        onRequestClose={e => { } }
                        >
                        <View style={$.modal}>
                            <Touch
                                style={{ position: 'absolute', top: 15, right: 15, }}
                                onPress={event => this.setState({ modal: false })}
                                >
                                <Icon name='close' size={30} color='#fff' />
                            </Touch>
                            <View style={$.modalbox}>
                                <TextInput
                                    style={$.inputemail}
                                    keyboardType='email-address'
                                    placeholder='你的邮箱'
                                    placeholderTextColor='#aaa'
                                    underlineColorAndroid='transparent'
                                    />
                                <TextInput
                                    style={$.inputcontent}
                                    blurOnSubmit={false}
                                    multiline={true}
                                    placeholderTextColor='#aaa'
                                    placeholder='反馈信息'
                                    underlineColorAndroid='transparent'
                                    />
                                <Touch style={$.sand}>
                                    <Text style={{ color: '#fff' }}>
                                        发送 · 反馈
                                        </Text>
                                </Touch>
                            </View>
                        </View>
                    </Modal>

                    <Touch style={$.row}>
                        <View style={$.left}>
                            <Text>关于</Text>
                        </View>

                        <View style={$.right}>
                            <Icon name='chevron-right' size={24} color={'#ccc'} />
                        </View>
                    </Touch>


                </ScrollView>
            </View>
        );
    }
}

const $ = StyleSheet.create({
    contanier: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginVertical: 5,
        alignItems: 'center',
        height: 45,
    },
    left: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 12,
    },
    right: {
        paddingHorizontal: 15,
        paddingVertical: 12,
    },
    modal: {
        backgroundColor: 'rgba(1, 1, 1, 0.5)',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalbox: {
        width: '80%',
        height: '50%',
        backgroundColor: '#fff',
        borderRadius: 2,
    },
    inputemail: {
        borderBottomWidth: onePixel,
        borderBottomColor: '#ccc',
        textAlignVertical: 'center',
        color: '#444',
    },
    inputcontent: {
        color: '#444',
        flex: 1,
        textAlignVertical: 'top'
    },
    sand: {
        padding: 10,
        backgroundColor: color,
        alignItems: 'center',
        borderRadius: 2,
    }
});