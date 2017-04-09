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
        const search = this.props.search;

        return (
            <View style={$.contanier}>
                <View style={{ flex: 1 }}>

                </View>
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
});