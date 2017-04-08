import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    RefreshControl,
    ScrollView,
    TouchableOpacity as Touch,
    PixelRatio,
    FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from './action';
import {
    MaterialIcons as Icon,
    TabTopbar,
    TabLoadBar,
    color,
} from '../common';

const data = require('./posts.json').map(i => ({ ...i, key: i.id }));

// # 推荐
class Recomm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            topbarOpacity: 1,
        };

        // 缓存值
        this.topbar = {
            start: 0,
            end: 0,
            y: 0,
            opacity: 1,
            S: 250,
        };

        this.props.loadRecommData(
            this.props.recomm.limit,
            this.props.seed,
        );
    }

    // 根据滚动条的变化，Topbar 的透明度会产生变化
    scrollViewOnScroll = event => {
        const { contentOffset: { y } } = event.nativeEvent;
        const topbar = this.topbar;
        const opacity = this.state.topbarOpacity;

        if (y < 10 && opacity < 1) {
            this.setState({ topbarOpacity: 1 });
        }
        // 方向向下
        else if (y - topbar.y > 0) {
            if (opacity > 0) {
                this.setState({ topbarOpacity: topbar.opacity - (y - topbar.start) / topbar.S });
            }
            topbar.end = topbar.y;
            topbar.y = y;
        }
        // 方向向上
        else if (y - topbar.y < -50) {
            if (opacity < 1) {
                this.setState({ topbarOpacity: (topbar.end - y) / topbar.S })
                topbar.opacity = (topbar.end - y) / topbar.S;
            }
            topbar.start = y;
            topbar.y = y;
        }
    }

    renderItem = ({item: i, index}) => (
        i && i.column &&
        <Touch
            style={{ overflow: 'hidden' }}
            key={`recomm-list-${index}`}
            activeOpacity={0.8}
            >
            <View style={$.item}>
                {
                    i.image_url !== null && i.image_url.length > 0 &&
                    <View style={$.headimg}>
                        <Image source={{ uri: i.image_url }} style={$.full} />
                    </View>
                }
                <View style={$.info}>
                    <View style={$.user}>
                        {
                            i.column.image_url !== null && i.column.image_url.length > 0 &&
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

    render() {
        const props = this.props;
        const recomm = this.props.recomm;
        return (
            <View style={$.contanier}>
                <ScrollView
                    overScrollMode='never'
                    showsVerticalScrollIndicator={false}
                    onScroll={this.scrollViewOnScroll}
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            onRefresh={_ => props.loadRecommData(recomm.limit, recomm.seed)}
                            tintColor={color}
                            title="Loading..."
                            titleColor={color}
                            colors={[color]}
                            progressBackgroundColor="#fff"
                            />
                    }
                    >
                    <FlatList
                        style={$.flatlist}
                        overScrollMode='never'
                        showsVerticalScrollIndicator={false}
                        data={recomm.data}
                        renderItem={this.renderItem}
                        removeClippedSubviews={true}
                        />
                </ScrollView>

                <View style={{ flex: 0 }}>
                    <TabTopbar
                        title='推荐' iconName='looks'
                        style={{ opacity: this.state.topbarOpacity }}
                        />
                    <TabLoadBar
                        show={recomm.loading.status}
                        title={recomm.loading.msg}
                        />
                </View>
            </View>
        );
    }
}

export default connect(
    state => ({ recomm: state.recomm, state: state }),
    actions,
)(Recomm);

const $ = StyleSheet.create({
    contanier: {
        flex: 1,
        backgroundColor: '#fff',
    },
    flatlist: {
        flex: 1,
        backgroundColor: '#ccc',
        marginTop: 49,
    },
    list: {
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