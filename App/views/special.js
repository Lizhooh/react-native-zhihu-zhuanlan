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

    renderItem = (item) => (
        <Touch
            key={item.slug}
            style={$.touch}
            activeOpacity={0.75}
            onPress={e => this.openColumn(item.slug)}
            >
            <View style={$.left}>
                <Image
                    source={{ uri: item.avatar.image }}
                    style={$.image}
                    resizeMethod='resize'
                    />
            </View>
            <View style={$.right}>
                <Text style={$.name}>{item.name}</Text>
                <Text style={$.description} numberOfLines={4}>
                    {item.description}
                </Text>
            </View>
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

    render() {
        const { list } = this.props.state;
        const { ok } = this.state;

        return (
            <View style={$.contanier}>
                <Topbar title='专栏 · 发现' icon='near-me' />
                <ListView
                    style={$.flatlist}
                    dataSource={this.ds.cloneWithRows(list)}
                    renderRow={this.renderItem}
                    refreshControl={
                        <Refresh
                            refreshing={!ok}
                            onRefresh={this.props.init}
                            />
                    }
                    overScrollMode='never'
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    initialListSize={15}
                    scrollRenderAheadDistance={500}
                    enableEmptySections={true}
                    // 滚动刷新
                    onEndReachedThreshold={1000}
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
        width: 60,
        height: 60,
        borderRadius: 1,
        backgroundColor: '#f3f3f3',
    },
    touch: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginTop: 3,
    },
    left: {
        padding: 10,
    },
    right: {
        flex: 1,
        padding: 10,
        paddingLeft: 0,
    },
    name: {
        fontSize: 16,
        color: '#444',
    },
    description: {
        fontSize: 13,
        color: '#888',
    }
})