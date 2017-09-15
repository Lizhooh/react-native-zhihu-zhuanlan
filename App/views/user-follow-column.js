import React, { Component } from 'react';
import {
    StyleSheet,
    View, Text, Image,
    TouchableOpacity as Touch,
    ListView,
    InteractionManager,
} from 'react-native';
import { Topbar, Refresh, StaticView } from '../components';
import { color } from '../config';

export default class UserFollowColumn extends Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.loading = false;
        this.state = {
            limit: 10,
            offset: 10,
            data: this.props.data,
            list: this.props.data.slice(0, 10),
        };
    }

    renderItem = (item, sid, cid) => (
        <Touch activeOpacity={0.75} style={$.touch}
            onPress={() => this.openColumn(item)}
            >
            <View style={$.left}>
                <Image source={{ uri: item.avatar }} style={$.avatar}
                    resizeMethod='resize'
                    />
            </View>
            <View style={$.right}>
                <Text style={$.title}>{item.title}</Text>
                <Text style={$.intro}>{item.intro}</Text>
                <Text style={$.follow}>{item.follow} 人关注</Text>
            </View>
        </Touch>
    )

    openColumn = item => {
        this.props.navigator.push({
            name: 'Column',
            data: item.id,
        });
    }

    onMore = async e => {
        if (!this.loading) {
            this.loading = true;
            this.setState(state => ({
                offset: state.limit + state.offset,
                list: state.data.slice(0, state.limit + state.offset),
            }), () => {
                this.loading = false;
            });
        }
    }

    render() {
        const { list } = this.state;

        return (
            <View style={$.container}>
                <StaticView>
                    <Topbar title='关注的专栏' onBack={this.props.navigator.pop} />
                </StaticView>

                <ListView
                    ref={r => this.listview = r}
                    dataSource={this.ds.cloneWithRows(list)}
                    renderRow={this.renderItem}
                    // overScrollMode='never'
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    initialListSize={15}
                    scrollRenderAheadDistance={500}
                    enableEmptySections={true}
                    // 滚动刷新
                    // onEndReachedThreshold={1000}
                    onEndReached={this.onMore}
                    />
            </View>
        );
    }
}

const $ = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f6f6',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 40,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'rgba(1, 1, 1, 0.08)',
    },
    touch: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginTop: StyleSheet.hairlineWidth,
    },
    left: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    right: {
        flex: 1,
        padding: 10,
        paddingLeft: 0,
    },
    follow: {
        fontSize: 12,
        color: color,
        textAlign: 'center',
        position: 'absolute',
        top: 5, right: 5,
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        color: '#555',
    },
    intro: {
        color: '#888',
    }
});