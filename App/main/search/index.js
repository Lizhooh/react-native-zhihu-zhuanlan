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
import {
    MaterialIcons as Icon,
    TabTopbar,
    TabLoadBar,
    color,
    BaseComponent,
    TabRefresh,
    devicewindow,
} from '../common';
import { connect } from 'react-redux';
import * as actions from './action';
import Input from './_input';

// # 搜索
class Search extends BaseComponent {

    constructor(props) {
        super(props);

        this.loading = false;
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(_ => {
            setTimeout(_ => {
                this.props.loadSearch(this.props.search.keys);
            });
        });
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.search.loading.status) {
            this.loading = false;
        }
    }

    renderItem = ({item: i, index}) => (
        <Touch
            style={[$.touch, index === 0 && { marginTop: 0 }]}
            activeOpacity={0.8}
            onPress={event => this.onOpen(i)}
            >
            <View style={$.item}>
                <View
                    style={$.header}
                    >
                    <Text style={$.title}>
                        {i.title}
                    </Text>
                </View>
                <View style={$.content}>
                    {
                        i.image &&
                        <Image source={{ uri: i.image }} style={$.summaryImage} />
                    }
                    <Text style={$.summary}>
                        {i.summary}
                    </Text>
                </View>

                <View style={$.super}>{
                    i.id ?
                        <Icon name='landscape' color={color} size={16} /> :
                        <Icon name='near-me' color={color} size={16} />
                }</View>
            </View>
        </Touch>
    );

    // bug 重复触发 loadMoreSearchData
    onMove = event => {
        if(this.loading) return;

        const range = 30;
        const props = this.props;
        const search = props.search;
        const status = search.loading.status;
        const {
            contentSize: { height },
            contentOffset: { y }
        } = event.nativeEvent;

        // 加上设备的高度
        const Height = devicewindow.height - 125 + y;

        // range 是范围
        if (Height >= height - range && Height <= height && !status && !this.loading) {
            this.loading = true;
            props.loadSearch(search.keys, search.page);
        }
    };

    onSubmit = (event, text) => {
        this.props.loadSearch(text);
        this.scrollView.scrollTo({ x: 0, y: 0, animated: true });
    };

    onOpen = item => {
        // id, column 都为空
        if (!!item.column) {
            this.props.navigator.push({
                id: 2,
                name: 'Special',
                data: { column: item.column }
            });
        }
        else {
            this.props.navigator.push({
                id: 1,
                name: 'Article',
                data: { id: item.id }
            });
        }
    };

    render() {
        const props = this.props;
        const search = this.props.search;

        return (
            <View style={$.contanier}>
                <View style={$.topbar}>
                    <View style={{ backgroundColor: '#e6e6e6' }}>
                        <Touch
                            activeOpacity={0.6}
                            style={$.search}
                            onPress={event => {
                                this.onSubmit(event, search.keys);
                            } }
                            >
                            <Icon name={'search'} size={28} color={color} />
                        </Touch>
                    </View>
                    <Input
                        onSubmit={this.onSubmit}
                        />
                </View>

                <ScrollView
                    ref={s => this.scrollView = s}
                    overScrollMode='never'
                    showsVerticalScrollIndicator={false}
                    removeClippedSubviews={true}
                    onScroll={this.onMove}
                    refreshControl={
                        <TabRefresh
                            refreshing={false}
                            onRefresh={_ => {
                                props.loadSearch(search.keys, 0, true);
                            } } />
                    }
                    >

                    <View style={$.result}>{
                        !!search.count &&
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name={'done-all'} size={16} color={color} />
                            <Text style={{ top: -1, marginHorizontal: 5 }}>
                                搜索：{search.count}
                            </Text>
                        </View>
                    }</View>

                    <FlatList
                        style={$.flatlist}
                        overScrollMode='never'
                        showsVerticalScrollIndicator={false}
                        data={search.data}
                        renderItem={this.renderItem}
                        />

                </ScrollView>

                <View style={{ flex: 0 }}>
                    <TabLoadBar
                        show={search.loading.status}
                        title={search.loading.msg}
                        />
                </View>
            </View>
        );
    }
}

export default connect(
    state => ({ search: state.search }),
    { ...actions },
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
        lineHeight: 20,
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