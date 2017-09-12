import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity as Touch,
    ListView,
} from 'react-native';
import { connect } from 'react-redux';
import { storiesActions } from '../redux/actions';
import { Refresh, Topbar, StaticView } from '../components';
import { Box } from '../components/stories';

// # 文章 · 发现
class Stories extends Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.loading = false;
        this.state = { ok: false };
    }

    async componentDidMount() {
        await this.props.init();
        this.setState({ ok: true });
    }

    renderItem = (item, sid, cid) => (
        <Box key={item.slug + cid} item={item} onPress={this.openArticle} />
    );

    openArticle = item => {
        this.props.navigator.push({
            name: 'Article',
            data: item,
            animated: 'top',
        });
    };

    onMore = async () => {
        if (!this.loading) {
            this.loading = true;
            await this.props.more();
            this.loading = false;
        }
    }

    render() {
        const { ok } = this.state;
        const { list = []} = this.props.state;

        return (
            <View style={$.contanier}>
                <StaticView>
                    <Topbar title='文章 · 发现' icon='landscape' />
                </StaticView>
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
    state => ({ state: state.stories }),
    storiesActions,
)(Stories);

const $ = StyleSheet.create({
    contanier: {
        flex: 1,
        backgroundColor: '#f6f6f6',
    }
});

