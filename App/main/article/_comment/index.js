import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity as Touch,
    Text,
    ScrollView,
    InteractionManager,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from './action';
import {
    MaterialIcons as Icon,
    color,
    onePixel,
} from '../../common';

class Comment extends Component {

    componentDidMount() {
        InteractionManager.runAfterInteractions(_ => {
            if (this.props.data.id === this.props.comment.id) return;
            setTimeout(_ => {
                this.props.loadCommnetData(
                    this.props.data.id,
                );
            });
        });
    }

    renderTopbar = () => (
        <View style={$.topbar}>
            <Touch
                activeOpacity={0.8}
                onPress={_ => this.props.navigator.pop()}
                >
                <Icon name={'arrow-back'} size={28} color={color} />
            </Touch>
        </View>
    );

    renderItem = ({item: i, index}) => (
        <Touch style={$.item} activeOpacity={0.6}>
            <View style={$.left}>
                <Image source={{ uri: i.author.avatar.image }} style={$.avatar} />
            </View>
            <View style={$.right}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={$.name}>{i.author.name}</Text>

                    <View style={$.likes}>
                        <Icon name='favorite-border' size={14} color={color} />
                        <Text style={$.like}>{`${i.likesCount}`}</Text>
                    </View>
                </View>
                <Text style={$.content}>{i.content.replace(/<[^>]+>/gi, '')}</Text>
            </View>
        </Touch>
    );

    render() {
        const comment = this.props.comment;
        const { id, data, loading, msg } = comment;
        const _id = this.props.data.id;

        if (loading || data === null || id !== _id) {
            return (
                <View style={$.contanier}>
                    {this.renderTopbar()}
                    <View style={[{ flex: 1 }, $.center]}>
                        <ActivityIndicator
                            animating={true}
                            size="small"
                            color={color}
                            />
                        <Text>加载中</Text>
                    </View>
                </View>
            );
        }

        return (
            <View style={$.contanier}>
                {this.renderTopbar()}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    removeClippedSubviews={true}
                    overScrollMode='never'
                    >
                    <FlatList
                        style={$.flatlist}
                        overScrollMode='never'
                        showsVerticalScrollIndicator={false}
                        data={data}
                        renderItem={this.renderItem}
                        removeClippedSubviews={true}
                        />
                    <View style={$.footer} >
                        <Text>{msg}</Text>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default connect(
    state => ({ comment: state.comment }),
    actions
)(Comment);


const $ = StyleSheet.create({
    contanier: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    topbar: {
        height: 50,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
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
    },
    flatlist: {
        backgroundColor: '#f6f6f6',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    item: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: onePixel,
        borderBottomColor: '#f3f3f3',
    },
    left: {
        padding: 15,
    },
    right: {
        flex: 1,
        padding: 15,
        paddingLeft: 0,
    },
    name: {
        fontSize: 16,
        color: '#444',
    },
    content: {
        color: '#777',
        fontSize: 14,
        flex: 1,
    },
    likes: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    like: {
        color: color,
        fontSize: 13,
        top: -1,
        marginLeft: 2,
    }
});


