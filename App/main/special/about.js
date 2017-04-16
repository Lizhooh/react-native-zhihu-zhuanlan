import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity as Touch,
    InteractionManager,
    ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from './action';
import {
    color,
    MaterialIcons as Icon,
    onePixel,
} from '../common';

const commonScrollViewProps = {
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
    overScrollMode: 'never',
    removeClippedSubviews: true,
};

class Ablout extends Component {

    componentDidMount() {
        InteractionManager.runAfterInteractions(_ => {
            setTimeout(_ => {
                this.props.loadSpecialAbloutData(this.props.data.column);
            }, 30);
        })
    }

    renderTopbar = () => (
        <View style={$.topbar}>
            <Touch
                activeOpacity={0.8}
                onPress={_ => this.props.navigator.pop()}
                >
                <Icon name={'arrow-back'} size={28} color={color} />
            </Touch>
        </View>
    );

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
            data &&
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
        const special = this.props.special;
        const about = special.about;
        const data = this.props.data;

        if (
            special.loading.status ||           // 网络请求中时，显示 loading
            !about ||                           // 空数据时，显示 loading
            special.aboutName !== data.column   // 缓存的数据，专栏名称不同时显示 loading
        ) {
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
                <ScrollView {...commonScrollViewProps}>
                    {this.renderView(about)}
                </ScrollView>
            </View>
        );
    }
}

export default connect(
    state => ({ special: state.special }),
    actions
)(Ablout);

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
        borderTopWidth: onePixel,
        borderTopColor: '#f0f0f0',
        borderBottomWidth: onePixel,
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
        borderTopWidth: onePixel,
        borderTopColor: '#f0f0f0',
        borderBottomWidth: onePixel,
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
        borderWidth: onePixel,
        borderColor: '#f0f0f0',
    }
})
