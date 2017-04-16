import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    FlatList,
    TouchableOpacity as Touch,
    PixelRatio,
    Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from './action';
import {
    MaterialIcons as Icon,
    TabRefresh,
    color,
    TabLoadBar,
    TabTopbar,
    BaseComponent,
} from '../common';

class Column extends BaseComponent {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadColumnData(
            this.props.column.limit,
            this.props.column.page,
        );
    }

    renderItem = ({item: i, index}) => (
        i !== undefined &&
        <Touch
            style={$.touch}
            activeOpacity={0.8}
            onPress={_ => this.onOpen(i.slug)}
            >
            <View style={$.item}>
                <View style={$.avatar}>
                    <Image source={{ uri: i.avatar.image }} style={$.full} />
                </View>

                <View style={$.name}>
                    <Text style={{ color: '#444' }}>{i.name}</Text>
                </View>

                {
                    !!i.description &&
                    <View style={$.description}>
                        <Text>{i.description}</Text>
                    </View>
                }

                <View style={$.other}>
                    <View style={$.otherLeft}>
                        <Icon name='favorite-border' color='#f44' size={14} />
                        <Text style={$.otherText}>
                            {i.followersCount + ''}
                        </Text>
                    </View>
                    <View style={{ flex: 1 }} />
                    <View style={$.otherRight}>
                        <Icon name='subject' color='#3bf' size={14} />
                        <Text style={$.otherText}>
                            {i.postsCount + ''}
                        </Text>
                    </View>
                </View>
            </View>
        </Touch>
    );

    onOpen = column => {
        this.props.navigator.push({
            id: 2,
            name: 'Special',
            data: { column }
        });
    };

    render() {
        const props = this.props;
        const column = this.props.column;

        return (
            <View style={$.contanier}>
                <ScrollView
                    overScrollMode='never'
                    showsVerticalScrollIndicator={false}
                    onScroll={this.onScroll}
                    refreshControl={
                        <TabRefresh
                            refreshing={false}
                            onRefresh={_ =>
                                props.loadColumnData(column.limit, column.page)
                            }
                            />
                    }
                    >
                    <View style={{ flexDirection: 'row' }}>
                        <FlatList
                            style={$.flatlist}
                            overScrollMode='never'
                            showsVerticalScrollIndicator={false}
                            data={column.data.left}
                            renderItem={this.renderItem}
                            removeClippedSubviews={true}
                            />
                        <FlatList
                            style={[$.flatlist, { paddingLeft: 0 }]}
                            overScrollMode='never'
                            showsVerticalScrollIndicator={false}
                            data={column.data.right}
                            renderItem={this.renderItem}
                            removeClippedSubviews={true}
                            />
                    </View>
                </ScrollView>

                <View style={{ flex: 0 }}>
                    <TabTopbar
                        title='专栏 · 发现' iconName='near-me'
                        style={{ opacity: this.state.opacity }}
                        />
                    <TabLoadBar
                        show={column.loading.status}
                        title={column.loading.msg}
                        />
                </View>
            </View>
        );
    }
}

export default connect(
    state => ({ column: state.column }),
    actions,
)(Column);

const $ = StyleSheet.create({
    contanier: {
        flex: 1,
        backgroundColor: '#f6f6f6',
    },
    flatlist: {
        flex: 1,
        marginTop: 49,
        backgroundColor: '#f6f6f6',
        padding: 15,
    },
    touch: {
        backgroundColor: '#ccc',
        overflow: 'hidden',
        borderRadius: 2,
        marginVertical: 10,
    },
    item: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        borderColor: '#e6e6e6',
        borderBottomWidth: 1,
        borderRightWidth: 1 / PixelRatio.get(),
    },
    full: {
        width: '100%',
        height: '100%',
        borderRadius: 1,
    },
    avatar: {
        width: Dimensions.get('window').width / 2 - 24 | 0,
        height: Dimensions.get('window').width / 2 - 24 | 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#f5f5f5',
        borderWidth: 1 / PixelRatio.get(),
        borderBottomWidth: 1,
    },
    name: {
        backgroundColor: '#fff',
        padding: 10,
        width: '100%',
        alignItems: 'center',
    },
    description: {
        backgroundColor: 'rgba(245, 255, 245, 1)',
        padding: 15,
        width: '100%',
    },
    other: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
    },
    otherLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    otherRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    otherText: {
        top: -1,
        marginLeft: 2,
        fontSize: 14,
    }
})