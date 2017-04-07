import React from 'react';
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
    Dimensions,
} from 'react-native';
import { MaterialIcons as Icon, TabTopbar } from '../common';

const data = require('./posts.json').map(i => ({ ...i, key: i.id }));

const renderItem = ({item: i, index}) => (
    <Touch
        key={`recomm-list-${index}`}
        activeOpacity={0.8}
        >
        <View style={$.item}>
            {
                i.image_url.length > 0 &&
                <View style={$.headimg}>
                    <Image source={{ uri: i.image_url }} style={$.full} />
                </View>
            }
            <View style={$.info}>
                <View style={$.user}>
                    <Image source={{ uri: i.column.image_url }} style={$.userAvatar} />
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

export default Recomm = () => (
    <View style={$.contanier}>
        <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    refreshing={false}
                    onRefresh={null}
                    tintColor="#39f"
                    title="Loading..."
                    titleColor="#39f"
                    colors={['#39f']}
                    progressBackgroundColor="#fff"
                    />
            }
            >
            <FlatList
                style={$.flatlist}
                showsVerticalScrollIndicator={false}
                data={data}
                renderItem={renderItem}
                />
        </ScrollView>

        <View style={{ flex: 0.0001 }}>
            <TabTopbar title='推荐' iconName='looks' />
        </View>
    </View>
);

const $ = StyleSheet.create({
    contanier: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: '#fff',
    },
    flatlist: {
        flex: 1,
        backgroundColor: '#ccc',
    },
    toolbar: {
        top: -1 * Dimensions.get('window').height + 55 + 20,
        height: 50,
        backgroundColor: '#3bf',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20,
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