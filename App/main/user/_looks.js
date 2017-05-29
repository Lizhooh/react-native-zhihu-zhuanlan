import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    FlatList,
    Text,
    Image,
    InteractionManager,
    TouchableOpacity as Touch,
    ActivityIndicator,
    ToastAndroid,
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from './action';
import {
    color,
    MaterialIcons as Icon,
    TabTopbar,
    onePixel,
    devicewindow,
} from '../common';

class Looks extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ok: false,

            // 加载更多
            limit: 6,
            page: 0,
            data: [],
            loading: false,
        };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(_ => {
            this.setState({ ok: true, page: this.state.page + 1 });
        });
    }

    renderTopbar = () => (
        <TabTopbar
            title='浏览过的文章'
            iconName='arrow-back'
            iconPress={_ => this.props.navigator.pop()}
            >
            <Touch style={$.topbar} onPress={event => this.props.userClaerAllLook()}>
                <Icon name='clear-all' size={28} color={color} />
            </Touch>
        </TabTopbar>
    );

    renderItem = ({item: i, index}) => (
        <Touch
            style={$.item}
            activeOpacity={0.75}
            onPress={event => this.onOpen(i)}
            >
            <View style={$.float}>
                <Text style={$.p} numberOfLines={1}>{i.title}</Text>
                <Text style={$.span} numberOfLines={2}>{i.summary.replace(/<[^>]+>/gim, '').substr(0, 100)}</Text>
                <View style={$.footer}>
                    <Image source={{ uri: i.author.avatar.image }} style={$.userimg} />
                    <Text style={$.name}>{i.author.name}</Text>
                    <Text style={$.time}>{i.time}</Text>
                </View>
            </View>
        </Touch>
    );

    onOpen = item => {
        this.props.navigator.push({
            id: 1,
            name: 'Article',
            data: { id: item.id }
        });
    }

    onMore = event => {
        if (this.state.loading) return;
        if (this.state.data.length >= this.props.looks.length) return;

        const range = 100;
        const props = this.props;
        const {
            contentSize: { height },
            contentOffset: { y }
        } = event.nativeEvent;

        // 加上设备的高度
        const Height = devicewindow.height - 0 + y;

        // range 是范围
        if (Height >= height - range && Height <= height && !this.state.loading) {
            this.setState({ page: this.state.page + 1, loading: true }, _ => {
                setTimeout(_ => {
                    this.setState({ loading: false });
                }, 50);
            });
        }
    }

    render() {
        const looks = this.props.looks;
        const { limit, page } = this.state;

        if (!this.state.ok) {
            return (
                <View style={$.contanier}>
                    {this.renderTopbar()}
                    <View style={[{ flex: 1 }, $.center]}>
                        <ActivityIndicator
                            animating={true}
                            size="small"
                            color={color}
                            />
                        <Text>加载中</Text>
                    </View>
                </View>
            );
        }

        return (
            <View style={$.contanier}>
                {this.renderTopbar()}
                <ScrollView
                    onScroll={this.onMore}
                    overScrollMode='never'
                    >
                    <FlatList
                        style={{ paddingVertical: 3 }}
                        overScrollMode='never'
                        data={looks.slice(0, limit * (page + 1))}
                        renderItem={this.renderItem}
                        />
                </ScrollView>
            </View>
        );
    }
}

export default connect(
    state => ({ looks: state.user.looks }),
    actions,
)(Looks);

const $ = StyleSheet.create({
    contanier: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    topbar: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flex: 1,
        paddingRight: 15,
    },
    item: {
        height: 115,
        backgroundColor: '#ccc',
    },
    img: {
        width: '100%',
        height: 115,
    },
    float: {
        justifyContent: 'flex-end',
        backgroundColor: '#fff',
        padding: 15,
        paddingVertical: 10,
    },
    p: {
        color: '#444',
        fontWeight: '600',
        fontSize: 18,
        marginVertical: 5,
    },
    span: {
        color: '#555',
        fontSize: 14,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    userimg: {
        width: 30,
        height: 30,
        borderRadius: 30,
    },
    name: {
        color: '#555',
        marginLeft: 8,
    },
    time: {
        color: '#555',
        flex: 1,
        textAlign: 'right',
        textAlignVertical: 'center',
        top: 1,
    },
    more: {
        height: 35,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
