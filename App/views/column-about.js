import React, { Component } from 'react';
import {
    StyleSheet,
    View, Text, Image,
    ScrollView,
    TouchableOpacity as Touch,
    InteractionManager,
} from 'react-native';
import { color } from '../config';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Topbar, StaticView, Refresh } from '../components';

// 缓存数据
const cacheData = {
    data: null,
    name: '',
};

export default class Ablout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ok: false,
            data: null,
        };
    }

    async componentDidMount() {
        const { init, name } = this.props.data;
        let data = '';
        if (cacheData.data !== null && cacheData.name === name) {
            data = cacheData.data;
        }
        else {
            data = await init(name);
            cacheData.data = data;
            cacheData.name = name;
        }
        await InteractionManager.runAfterInteractions();
        this.setState({ ok: true, data });
    }

    renderItem = (list, name) => (
        list.map((i, index) => (
            <Touch
                key={`${name}-${index}`}
                style={[$.row, index !== 0 && $.clear]}
                activeOpacity={0.6}
                >
                <Image
                    source={{ uri: i.avatar.image }}
                    style={$.minavatar}
                    />
                <View style={$.left}>
                    <Text style={$.name}>{i.name}</Text>
                    <Text style={$.intro}>{i.description}</Text>

                    <View style={$.cets}>
                        <Icon name='mode-edit' size={12} color={'#aaa'} />
                        <Text style={$.edit}>{`${i.postsCount} 篇文章`} </Text>
                    </View>
                </View>
            </Touch>
        ))
    );

    renderView = ({data, authors}) => {
        const creator = authors.filter(i => i.role === 'creator');
        const other = authors.filter(i => i.role === 'other');
        const editor = authors.filter(i => i.role === 'editor');
        const postTopics = data.postTopics;

        return (
            <View collapsable={true}>
                <View>
                    <Text style={$.h2}>关于</Text>
                    <View style={$.row}>
                        <Image
                            source={{ uri: data.avatar.image }}
                            style={[$.bigavatar, $.right]}
                            />
                        <View style={$.left}>
                            <Text style={$.name}>{data.name}</Text>
                            <Text style={$.intro}>{data.intro}</Text>
                        </View>
                    </View>
                </View>

                <View>
                    <Text style={$.h2}>专栏介绍</Text>
                    <Text style={$.description}>{data.description}</Text>
                </View>

                <View>
                    <Text style={$.h2}>专栏话题</Text>
                    <View style={$.topics}>{
                        postTopics
                            .sort((a, b) => b.postsCount - a.postsCount)
                            .map((i, index) => (
                                <Touch key={`topics-${index}`} activeOpacity={0.6}>
                                    <Text style={$.topic}>
                                        {`${i.name}（${i.postsCount}）`}
                                    </Text>
                                </Touch>
                            ))
                    }</View>
                </View>

                <View>
                    {
                        creator.length > 0 &&
                        <View>
                            <Text style={$.h2}>创建</Text>
                            {this.renderItem(creator, 'creator')}
                        </View>
                    }

                    {
                        editor.length > 0 &&
                        <View>
                            <Text style={$.h2}>编辑</Text>
                            {this.renderItem(editor, 'editor')}
                        </View>
                    }

                    {
                        other.length > 0 &&
                        <View>
                            <Text style={$.h2}>作者</Text>
                            {this.renderItem(other, 'other')}
                        </View>
                    }
                </View>
                <View style={{ height: 20 }}></View>
            </View>
        );
    };

    render() {
        const { data, ok } = this.state;

        return (
            <View style={$.contanier}>
                <Topbar onBack={this.props.navigator.pop} />
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    overScrollMode={'never'}
                    removeClippedSubviews={true}
                    refreshControl={
                        <Refresh refreshing={!ok} />
                    }
                    >
                    {ok && data && this.renderView(data)}
                </ScrollView>
            </View >
        );
    }
}

const $ = StyleSheet.create({
    contanier: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    topbar: {
        height: 50,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    minavatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    bigavatar: {
        width: 80,
        height: 80,
        borderRadius: 80,
    },
    h2: {
        color: '#444',
        fontSize: 20,
        fontWeight: 'bold',
        margin: 15,
        marginVertical: 10,
    },
    row: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#f0f0f0',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#f0f0f0',
    },
    clear: {
        borderTopWidth: 0,
        borderTopColor: '#fff',
    },
    right: {
        padding: 10,
    },
    left: {
        padding: 5,
        paddingHorizontal: 12,
        flex: 1,
    },
    cets: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    name: {
        fontSize: 16,
        color: '#444',
        flex: 1,
        textAlignVertical: 'center',
    },
    intro: {
        fontSize: 14,
        color: '#888',
        flex: 1,
        textAlignVertical: 'center',
    },
    edit: {
        fontSize: 13,
        paddingHorizontal: 2,
        color: '#aaa',
    },
    description: {
        backgroundColor: '#fff',
        padding: 10,
        paddingHorizontal: 15,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#f0f0f0',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#f0f0f0',
        fontSize: 15,
    },
    topics: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    topic: {
        padding: 5,
        paddingHorizontal: 12,
        backgroundColor: '#fff',
        textAlignVertical: 'center',
        margin: 5,
        borderRadius: 5,
        fontSize: 14,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#f0f0f0',
    }
})
