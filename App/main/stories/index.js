import React from 'react';
import {
    StyleSheet,
    View, Text, Image,
    ScrollView,
    TouchableOpacity as Touch,
    PixelRatio,
    FlatList,
    InteractionManager,
    ListView,
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from './action';
import {
    TabTopbar,
    TabLoadBar,
    color,
    BaseComponent,
    TabRefresh,
    devicewindow,
} from '../common';

// # 文章 · 发现
class Stories extends BaseComponent {

    async componentDidMount() {
        await InteractionManager.runAfterInteractions();

        this.props.loadStories(
            this.props.stories.limit,
            this.props.page,
        );

        // 加载更多用的标志
        this.loading = false;
    }

    ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    componentWillReceiveProps(nextProps) {
        if (!nextProps.stories.loading.status) {
            this.loading = false;
        }
    }

    renderItem = ({ item }) => (
        item && item.column &&
        <Touch
            key={`stories-${item.id}`}
            style={{ overflow: 'hidden' }}
            activeOpacity={0.8}
            onPress={_ => this.onOpenArticle(item.slug)}
            >
            <View style={$.item}>
                {
                    // image 可能为空
                    !!item.image_url &&
                    <View style={$.headimg}>
                        <Image source={{ uri: item.image_url }} style={$.full} />
                    </View>
                }
                <View style={$.info}>
                    <View style={$.user}>
                        {
                            // image 可能为空
                            !!item.column.image_url &&
                            <Image source={{ uri: item.column.image_url }} style={$.userAvatar} />
                        }
                        <Text style={{ color: '#555', fontWeight: '500' }}>{item.column.name}</Text>
                    </View>
                    <View style={$.infoc}>
                        <Text style={$.title}>{item.title}</Text>
                        <Text style={$.summary} numberOfLines={4}>
                            {item.summary.replace(/\<(.*?)\>/g, '')}
                        </Text>
                    </View>
                </View>
            </View>
        </Touch>
    );

    onOpenArticle = id => {
        this.props.navigator.push({
            id: 1,
            name: 'Article',
            data: { id }
        });
    };

    // bug 重复触发 loadMoreSearchData
    onMore = event => {
        if (this.loading) return;

        const range = 30;
        const props = this.props;
        const stories = props.stories;
        const status = stories.loading.status;
        const {
            contentSize: { height },
            contentOffset: { y }
        } = event.nativeEvent;

        // 加上设备的高度
        const Height = devicewindow.height - 125 + y;

        // range 是范围
        if (Height >= height - range && Height <= height && !status && !this.loading) {
            this.loading = true;

            props.loadStories(
                stories.limit,
                stories.page,
            );
        }
    };

    render() {
        const props = this.props;
        const stories = this.props.stories;

        return (
            <View style={$.contanier}>
                <TabTopbar title='文章 · 发现' iconName='landscape' />
                <ListView
                    style={$.flatlist}
                    dataSource={this.ds.cloneWithRows(stories.data)}
                    renderRow={data => this.renderItem({ item: data })}
                    refreshControl={
                        <TabRefresh
                            refreshing={false}
                            onRefresh={_ =>
                                props.loadStories(stories.limit, 0, true)
                            }
                            />
                    }
                    // renderHeader={() => this.renderHeader(source)}
                    overScrollMode='never'
                    // showsHorizontalScrollIndicator={false}
                    // showsVerticalScrollIndicator={false}
                    initialListSize={15}
                    scrollRenderAheadDistance={500}
                    enableEmptySections={true}
                    // 滚动刷新
                    onEndReachedThreshold={1000}
                    // onEndReached={e => {
                    //     if (this.loadmore !== true) {
                    //         this.loadmore = true;
                    //         onMore().then(res => this.loadmore = false);
                    //     }
                    // } }
                    />
            </View>
        );
    }
}

export default connect(
    state => ({ stories: state.stories }),
    actions,
)(Stories);

const $ = StyleSheet.create({
    contanier: {
        flex: 1,
        backgroundColor: '#f6f6f6',
    },
    flatlist: {
        backgroundColor: '#ccc',
        // marginTop: 49,
    },
    item: {
        borderTopWidth: 1 / PixelRatio.get(),
        borderTopColor: 'rgba(1, 1, 1, 0.05)',
        backgroundColor: '#fbfbfb',
    },
    title: {
        color: '#333',
        fontSize: 18,
        lineHeight: 24,
    },
    summary: {
        lineHeight: 22,
        fontSize: 14,
        color: '#888',
    },
    headimg: {
        height: 180,
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(1, 1, 1, 0.04)',
    },
    full: {
        width: '100%',
        height: '100%',
    },
    info: {
    },
    infoc: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    user: {
        paddingVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    userAvatar: {
        width: 35,
        height: 35,
        borderRadius: 35,
        marginRight: 15,
    }
});