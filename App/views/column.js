import React, { Component } from 'react';
import {
    StyleSheet,
    View, Text, Image,
    TouchableOpacity as Touch,
    InteractionManager,
    ListView,
    ToastAndroid as Toast,
} from 'react-native';
import { connect } from 'react-redux';
import { columnActions } from '../redux/actions';
import { Topbar, Refresh, StaticView } from '../components';
import { Topic, Header, Box } from '../components/column';

// # 专栏信息
class Column extends Component {

    constructor(props) {
        super(props);
        this.loading = false;
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = { ok: false };
    }

    async componentDidMount() {
        await this.props.init(this.props.data);
        await InteractionManager.runAfterInteractions();
        this.setState({ ok: true });
    }

    onMore = async e => {
        if (!this.loading) {
            this.loading = true;
            await this.props.more();
            this.loading = false;
        }
    }

    onRefresh = () => {
        this.props.init(this.props.data);
    }

    renderHeader = data => (
        <StaticView>
            <Header
                data={data}
                onPress={this.openAbout}
                onFollow={this.onFollow}
                />
        </StaticView>
    );

    renderBody = data => (
        <StaticView>
            <Topic data={data} onSelect={this.onSelect} />
        </StaticView>
    );

    onSelect = async name => {
        if (!this.loading) {
            this.loading = true;
            await this.props.select(name);
            this.loading = false;
        }
    }

    renderItem = (item, sid, cid) => (
        <Box key={item.slug + cid} item={item} onPress={this.openArticle} />
    );

    openArticle = item => {
        this.props.navigator.push({
            name: 'Article',
            data: item
        });
    }

    openAbout = () => {
        this.props.navigator.push({
            name: 'ColumnAbout',
            data: {
                name: this.props.data,
                init: this.props.aboutInit
            },
            animated: 'left',
        });
    }

    onFollow = () => {
        const { data } = this.props.state;
        this.props.follow(data);
        Toast.show('关注成功', Toast.LONG);
    }

    goTop = e => {
        this.listview.scrollTo(0);
    }

    render() {
        let { list, data, name } = this.props.state;
        const { ok } = this.state;

        if (this.props.data === name && !ok) {
            list = [];
        }
        else if (list.length !== 0 && data !== null && !ok) {
            list = [];
            data = null;
        }

        return (
            <View style={$.contanier}>
                <Topbar onBack={this.props.navigator.pop} icons={[
                    { name: 'change-history', onPress: this.goTop }
                ]} />
                <ListView
                    ref={r => this.listview = r}
                    dataSource={this.ds.cloneWithRows(list)}
                    renderRow={this.renderItem}
                    refreshControl={
                        <Refresh refreshing={!ok} onRefresh={this.onRefresh} />
                    }
                    renderHeader={() => (
                        <View>
                            {data && this.renderHeader(data)}
                            {data && this.renderBody(data)}
                        </View>
                    )}
                    overScrollMode='never'
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    initialListSize={15}
                    scrollRenderAheadDistance={500}
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
    state => ({ state: state.column }),
    columnActions,
)(Column);

const $ = StyleSheet.create({
    contanier: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
