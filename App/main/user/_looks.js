import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    FlatList,
    Text,
    Image,
    InteractionManager,
    TouchableOpacity as Touch,
    ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from './action';
import {
    color,
    MaterialIcons as Icon,
    TabTopbar,
    onePixel,
} from '../common';

class Looks extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ok: false,
        };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(_ => {
            this.setState({ ok: true });
        });
    }

    renderTopbar = () => (
        <TabTopbar
            title='浏览过的文章'
            iconName='arrow-back'
            iconPress={_ => this.props.navigator.pop()}
            />
    );

    renderItem = ({item: i, index}) => (
        <Touch
            style={$.item}
            activeOpacity={0.75}
            onPress={null}
            >
            <View style={$.float}>
                <Text style={$.p} numberOfLines={1}>{i.title}</Text>
                <Text style={$.span} numberOfLines={2}>{i.summary.replace(/<[^>]+>/gim, '').substr(0, 100)}</Text>
                <View style={$.footer}>
                    <Image source={{ uri: i.author.avatar.image }} style={$.userimg} />
                    <Text style={$.name}>{i.author.name}</Text>
                    <Text style={$.time}>{i.time}</Text>
                </View>
            </View>
        </Touch>
    );

    render() {
        const looks = this.props.looks;

        if (!this.state.ok) {
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
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    overScrollMode='never'
                    >
                    <FlatList
                        overScrollMode='never'
                        showsVerticalScrollIndicator={false}
                        data={looks}
                        renderItem={this.renderItem}
                        removeClippedSubviews={true}
                        />
                </ScrollView>
            </View>
        );
    }
}

export default connect(
    state => ({ looks: state.user.looks }),
    actions,
)(Looks);

const $ = StyleSheet.create({
    contanier: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        height: 115,
        marginVertical: onePixel,
        backgroundColor: '#ccc',
    },
    img: {
        width: '100%',
        height: 115,
    },
    float: {
        justifyContent: 'flex-end',
        backgroundColor: '#fff',
        padding: 15,
        paddingVertical: 10,
    },
    p: {
        color: '#444',
        fontWeight: '600',
        fontSize: 18,
        marginVertical: 5,
    },
    span: {
        color: '#555',
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
        color: '#555',
        marginLeft: 8,
    },
    time: {
        color: '#555',
        flex: 1,
        textAlign: 'right',
        textAlignVertical: 'center',
        top: 1,
    }
});