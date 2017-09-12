import React, { Component } from 'react';
import {
    StyleSheet,
    View, Image, Text,
    TouchableOpacity as Touch,
    InteractionManager,
    ListView,
} from 'react-native';
import { connect } from 'react-redux';
import { articleCommentActions } from '../redux/actions';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Topbar, Refresh, StaticView } from '../components';
import { color } from '../config';
import { CommentBox } from '../components/article';

// # 评论
class Comment extends Component {

    constructor(props) {
        super(props);
        this.state = { ok: false }
        this.loading = false;
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    }

    async componentDidMount() {
        await InteractionManager.runAfterInteractions();
        await this.props.init(this.props.data.id);
        this.setState({ ok: true });
    }

    renderItem = (item) => (
        <StaticView>
            <CommentBox item={item} />
        </StaticView>
    )

    onMore = async event => {
        if (!this.loading) {
            this.loading = true;
            await this.props.more();
            this.loading = false;
        }
    }

    render() {
        let { id, data, loading, msg } = this.props.state;
        const { ok } = this.state;

        if (!ok) data = [];

        return (
            <View style={$.contanier}>
                <StaticView>
                    <Topbar onBack={this.props.navigator.pop}
                        title={`${this.props.data.n} 条评论`} />
                </StaticView>
                <ListView
                    style={$.flatlist}
                    dataSource={this.ds.cloneWithRows(data)}
                    renderRow={this.renderItem}
                    onEndReachedThreshold={500}
                    onEndReached={this.onMore}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
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
    state => ({ state: state.article_comment }),
    articleCommentActions
)(Comment);

const $ = StyleSheet.create({
    contanier: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    topbar: {
        backgroundColor: color,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        height: 65,
        paddingTop: 25,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        height: 35,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    flatlist: {
        backgroundColor: '#f6f6f6',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
