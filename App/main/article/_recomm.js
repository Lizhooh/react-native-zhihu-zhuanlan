import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity as Touch,
} from 'react-native';
import {
    MaterialIcons as Icon,
    onePixel,
} from '../common';

// 格式化头像 url
const setAvatarImage = avatar => {
    return {
        ...avatar,
        image: avatar.template.replace(/\{id\}_\{size\}/g, `${avatar.id}_xl`),
    }
};

export default ({data, recomm, onOpenArticle}) => {

    const { previous, next } = data;
    const list = [previous, next].filter(i => !!i).map(i => {
        i.author.avatar = setAvatarImage(i.author.avatar);
        return i;
    });

    const renderView = list => {
        return list.map((i, index) => (
            <Touch
                style={$.item}
                key={`recomn-${index}`}
                activeOpacity={0.8}
                onPress={_ => onOpenArticle(i.slug)}
                >

                <View>{
                    !!i.titleImage &&
                    <Image source={{ uri: i.titleImage }} style={$.img} />
                }</View>

                <View style={$.float}>
                    <Text style={$.p} numberOfLines={1}>{i.title}</Text>
                    <Text style={$.span} numberOfLines={2}>{i.summary.replace(/<[^>]+>/gim, '').substr(0, 100)}</Text>
                    <View style={$.footer}>
                        <Image source={{ uri: i.author.avatar.image }} style={$.userimg} />
                        <Text style={$.name}>{i.author.name}</Text>
                        <Text style={$.time}>
                            {i.publishedTime.match(/\d{4}-\d{2}-\d{2}/g).join('')}
                        </Text>
                    </View>
                </View>

            </Touch>
        ));
    };

    return (
        <View style={$.contanier}>
            <View style={$.header}>
                <Text style={$.h2}>推荐阅读</Text>
            </View>
            {renderView(list)}
            {renderView(recomm)}
        </View>
    );
}

const $ = StyleSheet.create({
    contanier: {
        flex: 1,
    },
    header: {
        padding: 12,
        paddingHorizontal: 15,
        backgroundColor: '#f8f8f8',
    },
    h2: {
        fontSize: 18,
        color: '#555',
    },
    item: {
        marginTop: onePixel,
    },
    img: {
        width: '100%',
        height: 150,
    },
    float: {
        position: 'absolute',
        top: 0, bottom: 0,
        left: 0, right: 0,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(1, 1, 1, 0.45)',
        padding: 15,
    },
    p: {
        color: '#fff',
        fontSize: 18,
        marginVertical: 5,
    },
    span: {
        color: '#f2f2f2',
        fontSize: 14,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    userimg: {
        width: 30,
        height: 30,
        borderRadius: 30,
    },
    name: {
        color: '#fff',
        marginLeft: 8,
    },
    time: {
        color: '#fff',
        flex: 1,
        textAlign: 'right',
        textAlignVertical: 'center',
        top: 1,
    }
})