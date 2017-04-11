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
import Input from './input';

// # 搜索
class Search extends BaseComponent {

    constructor(props) {
        super(props);

        this.htmlStyle = {
            em: { color: color },
            b: { color: color }
        };

        this.loading = false;
        this.y = 0;
    }

    componentWillMount() {
        this.props.loadSearchData(this.props.search.keys);
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
            </View>
        </Touch>
    );

    // bug 重复触发 loadMoreSearchData
    onScroll = event => {
        const props = this.props;
        const search = props.search;
        const status = search.loading.status;
        const {
            contentSize: { height },
            contentOffset: { y }
        } = event.nativeEvent;

        const deviceHeight = devicewindow.height - 80;

        if ((y + deviceHeight + 50) >= height && !status && !this.loading) {
            this.loading = true;
            props.loadMoreSearchData(search.keys, search.page);
        }
    };

    onSubmit = (event, text) => {
        this.props.loadSearchData(text);
        this.scrollView.scrollTo({ x: 0, y: 0, animated: true });
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
                            <Icon
                                name={'search'}
                                size={28}
                                color={color}
                                />
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
                    refreshControl={
                        <TabRefresh
                            refreshing={false}
                            onRefresh={_ => {
                                props.loadSearchData(search.keys);
                                this.y = 0;
                            } } />
                    }
                    onScroll={this.onScroll}
                    >
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
    actions,
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
    }
});