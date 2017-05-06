import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity as Touch,
    PixelRatio,
    FlatList,
    InteractionManager,
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

class Stories extends BaseComponent {

    componentDidMount() {
        InteractionManager.runAfterInteractions(_ => {
            setTimeout(_ => {
                this.props.loadStories(
                    this.props.stories.limit,
                    this.props.page,
                );
            });
        });

        this.loading = false;
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.stories.loading.status) {
            this.loading = false;
        }
    }

    renderItem = ({item: i, index}) => (
        i && i.column &&
        <Touch
            style={{ overflow: 'hidden' }}
            activeOpacity={0.8}
            onPress={_ => this.onOpenArticle(i.slug)}
            >
            <View style={$.item}>
                {
                    // image 可能为空
                    !!i.image_url &&
                    <View style={$.headimg}>
                        <Image source={{ uri: i.image_url }} style={$.full} />
                    </View>
                }
                <View style={$.info}>
                    <View style={$.user}>
                        {
                            // image 可能为空
                            !!i.column.image_url &&
                            <Image source={{ uri: i.column.image_url }} style={$.userAvatar} />
                        }
                        <Text style={{ color: '#555', fontWeight: '500' }}>{i.column.name}</Text>
                    </View>
                    <View style={$.infoc}>
                        <Text style={$.title}>{i.title}</Text>
                        <Text style={$.summary}>
                            {i.summary.replace(/\<(.*?)\>/g, '')}
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
                <ScrollView
                    overScrollMode='never'
                    showsVerticalScrollIndicator={false}
                    onScroll={this.onMore}
                    refreshControl={
                        <TabRefresh
                            refreshing={false}
                            onRefresh={_ =>
                                props.loadStories(stories.limit, 0, true)
                            }
                            />
                    }
                    >
                    <FlatList
                        style={$.flatlist}
                        overScrollMode='never'
                        showsVerticalScrollIndicator={false}
                        data={stories.data}
                        renderItem={this.renderItem}
                        removeClippedSubviews={true}
                        />
                </ScrollView>

                <View style={{ flex: 0 }}>
                    <TabLoadBar
                        show={stories.loading.status}
                        title={stories.loading.msg}
                        />
                </View>
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
        flex: 1,
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