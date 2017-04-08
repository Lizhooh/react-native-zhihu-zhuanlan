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
import {
    MaterialIcons as Icon,
    TabTopbar,
    TabLoadBar,
    color,
    BaseComponent,
} from '../common';
import { connect } from 'react-redux';
import * as actions from './action';

// # 推荐
class Recomm extends BaseComponent {

    constructor(props) {
        super(props);

        this.props.loadRecommData(
            this.props.recomm.limit,
            this.props.seed,
        );
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
                    onScroll={this.onScroll}
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
                        style={{ opacity: this.state.opacity }}
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