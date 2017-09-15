import React, { Component } from 'react';
import {
    StyleSheet,
    View, Text, Image,
    TouchableOpacity as Touch,
    InteractionManager,
    ListView,
} from 'react-native';
import { connect } from 'react-redux';
import { searchActions } from '../redux/actions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { color } from '../config';
import { Topbar, Refresh, StaticView } from '../components';
import { Box, Input } from '../components/search';

// # 搜索
class Search extends Component {

    constructor(props) {
        super(props);
        this.state = { ok: false };
        this.loading = false;
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    }

    async componentDidMount() {
        await InteractionManager.runAfterInteractions();
        await this.props.init(this.props.state.key);
        this.setState({ ok: true })
    }

    // 列表元素
    renderItem = (item, sid, cid) => (
        <Touch
            key={item.slug + cid}
            style={[$.touch, cid === 0 && { marginTop: 0 }]}
            activeOpacity={0.75}
            onPress={event => this.open(item)}
            >
            <View style={$.item}>
                <View style={$.header}>
                    <Text style={$.title} numberOfLines={1}>
                        {item.title}
                    </Text>
                </View>
                <View style={$.content}>
                    <Text style={$.summary} numberOfLines={3}>
                        {item.summary}
                    </Text>
                </View>
                <View style={$.super}>{
                    item.isArticle ?
                        <Icon name='landscape' color={color} size={16} /> :
                        <Icon name='near-me' color={color} size={16} />
                }</View>
            </View>
        </Touch>
    );

    // 确定搜索
    onSubmit = (event, text) => {
        this.props.init(text);
        this.listview.scrollTo({ x: 0, y: 0, animated: true });
    };

    // 打开文章/专栏
    open = item => {
        // id, column 都为空
        if (item.isArticle) {
            this.props.navigator.push({
                name: 'Article',
                data: item,
                animated: 'top',
            });
        }
        else {
            this.props.navigator.push({
                name: 'Column',
                data: item.column,
            });
        }
    };

    renderHeader = () => (
        <View style={$.result}>{
            !!this.props.state.count &&
            <View style={{ flexDirection: 'row' }}>
                <Icon name={'done-all'} size={16} color={color} />
                <Text style={{ top: -1, marginHorizontal: 5 }}>
                    搜索结果：{this.props.state.count} 个
                </Text>
            </View>
        }</View>
    )

    onMore = async () => {
        if (!this.loading) {
            this.loading = true;
            await this.props.more();
            this.loading = false;
        }
    }

    render() {
        const { list } = this.props.state;
        const { ok } = this.state;

        return (
            <View style={$.contanier}>
                <StaticView>
                    <Topbar title='' icon='search'>
                        <Input onSubmit={this.onSubmit} />
                    </Topbar>
                </StaticView>
                <ListView
                    ref={r => this.listview = r}
                    overScrollMode='never'
                    style={$.flatlist}
                    dataSource={this.ds.cloneWithRows(list)}
                    renderRow={this.renderItem}
                    onEndReachedThreshold={500}
                    onEndReached={this.onMore}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    // initialListSize={12}
                    renderHeader={this.renderHeader}
                    enableEmptySections={true}
                    scrollRenderAheadDistance={600}
                    refreshControl={
                        <Refresh refreshing={!ok} />
                    }
                    />
            </View>
        );
    }
}

export default connect(
    state => ({ state: state.search }),
    searchActions,
)(Search);

const $ = StyleSheet.create({
    contanier: {
        flex: 1,
        backgroundColor: '#f6f6f6',
    },
    topbar: {
        height: 50,
        flexDirection: 'row',
        backgroundColor: '#fff',
    },
    result: {
        backgroundColor: '#fff',
        padding: 20,
        paddingHorizontal: 21,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    search: {
        backgroundColor: '#fff',
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flatlist: {
        flex: 1,
    },
    touch: {
        backgroundColor: '#e6e6e6',
        marginTop: 10,
    },
    item: {
        backgroundColor: '#fff',
        padding: 20,
        paddingTop: 10,
        borderColor: '#eaeaea',
        borderBottomWidth: 1,
    },
    header: {
        paddingVertical: 10,
        paddingTop: 3,
    },
    title: {
        fontSize: 17,
        color: '#444',
        lineHeight: 26,
    },
    content: {
        backgroundColor: 'rgba(245, 245, 255, 1)',
        padding: 10,
        flexDirection: 'row',
    },
    summary: {
        lineHeight: 22,
        fontSize: 14,
        color: '#777',
        flex: 1,
    },
    summaryImage: {
        width: 80,
        height: 80,
        borderRadius: 2,
        marginRight: 10,
    },
    super: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 6, top: 5,
    }
});
