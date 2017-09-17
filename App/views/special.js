import React, { Component } from 'react';
import {
    StyleSheet,
    View, Text, Image,
    TouchableOpacity as Touch,
    InteractionManager,
    ListView,
} from 'react-native';
import { connect } from 'react-redux';
import { specialActions } from '../redux/actions';
import { Refresh, Topbar, StaticView } from '../components';
import { color } from '../config';

// # 专栏 · 发现
class Special extends Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.loading = false;
        this.state = { ok: false };
    }

    async componentDidMount() {
        await InteractionManager.runAfterInteractions();
        await this.props.init();
        this.setState({ ok: true });
    }

    renderItem = (item, sid, cid) => (
        <Touch
            key={item.slug + cid}
            style={$.touch}
            activeOpacity={0.75}
            onPress={e => this.openColumn(item.slug)}
            >
            <View style={$.left}>
                <Image
                    source={{ uri: item.avatar.image }}
                    style={$.image} />
            </View>
            <View style={$.right}>
                <Text style={$.name}>{item.name}</Text>
                <Text style={$.description} numberOfLines={5}>
                    {item.description}
                </Text>
            </View>
            <Text style={$.follow}>
                {item.followersCount} 人关注
            </Text>
        </Touch>
    )

    onMore = async () => {
        if (!this.loading) {
            this.loading = true;
            await this.props.more();
            this.loading = false;
        }
    }

    openColumn = name => {
        this.props.navigator.push({
            name: 'Column',
            data: name,
        });
    }

    renderFooter = e => (
        <StaticView style={$.loadmore}>
            <Text>加载中...</Text>
        </StaticView>
    )

    render() {
        const { list } = this.props.state;
        const { ok } = this.state;

        return (
            <View style={$.contanier}>
                <Topbar title='专栏 · 发现' icon='near-me' />
                <ListView
                    contentContainerStyle={$.list}
                    dataSource={this.ds.cloneWithRows(list)}
                    renderRow={this.renderItem}
                    refreshControl={
                        <Refresh
                            refreshing={!ok}
                            onRefresh={this.props.init}
                            />
                    }
                    renderFooter={list.length > 0 ? this.renderFooter: () => {}}
                    overScrollMode='never'
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    // initialListSize={15}
                    scrollRenderAheadDistance={600}
                    enableEmptySections={true}
                    // 滚动刷新
                    onEndReachedThreshold={500}
                    onEndReached={this.onMore}
                    />
            </View>
        );
    }
}

export default connect(
    state => ({ state: state.special }),
    specialActions,
)(Special);

const $ = StyleSheet.create({
    contanier: {
        flex: 1,
        backgroundColor: '#f6f6f6',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    list: {
        paddingBottom: 10,
    },
    touch: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        // marginTop: StyleSheet.hairlineWidth,
        marginHorizontal: 10,
        marginTop: 10,
        borderBottomWidth: 1,
        borderRightWidth: StyleSheet.hairlineWidth,
        borderColor: '#eee',
    },
    left: {
        padding: 10,
    },
    right: {
        flex: 1,
        padding: 12,
        paddingLeft: 0,
    },
    name: {
        fontSize: 16,
        color: '#444',
    },
    description: {
        fontSize: 13,
        color: '#888',
        lineHeight: 22,
    },
    follow: {
        color: color,
        fontSize: 12,
        position: 'absolute',
        top: 0, right: 3,
    },
    loadmore: {
        height: 30,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        marginBottom: 0
    }
})