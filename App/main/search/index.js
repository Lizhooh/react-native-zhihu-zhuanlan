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
} from '../common';
import { connect } from 'react-redux';
import * as actions from './action';

// # 搜索
class Search extends BaseComponent {

    constructor(props) {
        super(props);

        this.htmlStyle = {
            em: { color: color },
            b: { color: color }
        };
    }

    componentWillMount() {
        this.props.loadSearchData('学习');
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
                    <Text style={$.summary}>
                        {i.summary}
                    </Text>
                </View>
            </View>
        </Touch>
    );

    render() {
        const props = this.props;
        const search = this.props.search;

        return (
            <View style={$.contanier}>
                <ScrollView
                    overScrollMode='never'
                    showsVerticalScrollIndicator={false}
                    onScroll={this.onScroll}
                    refreshControl={
                        <TabRefresh
                            refreshing={false}
                            onRefresh={null}
                            />
                    }
                    >
                    <FlatList
                        style={$.flatlist}
                        overScrollMode='never'
                        showsVerticalScrollIndicator={false}
                        data={search.data}
                        renderItem={this.renderItem}
                        removeClippedSubviews={true}

                        />
                </ScrollView>
                <View style={{ flex: 0 }}>
                    <TabTopbar
                        title='搜索' iconName='search'
                        style={{ opacity: this.state.opacity }}
                        />
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
    flatlist: {
        flex: 1,
        marginTop: 49,
    },
    touch: {
        backgroundColor: '#ddd',
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
    },
    summary: {
        lineHeight: 20,
        fontSize: 14,
        color: '#777'
    }
});