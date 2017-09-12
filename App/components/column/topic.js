import React, { Component } from 'react';
import {
    StyleSheet,
    View, Text,
    TouchableOpacity as Touch,
    ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { color } from '../../config'

export default class Topic extends Component {

    constructor(props) {
        super(props);

        this.state = {
            active: 0,
        }
    }

    onPress = (name, index) => {
        this.setState({ active: index + 1 });
        this.props.onSelect && this.props.onSelect(name);
    }

    render() {
        const { data } = this.props;
        const { active } = this.state;

        return (
            <View style={$.root}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    removeClippedSubviews={!true}
                    overScrollMode='never'
                    horizontal={true}
                    >
                    <Touch
                        style={[$.item, active === 0 && $.active]}
                        activeOpacity={0.7}
                        onPress={() => this.onPress('', -1)}
                        >
                        <Text style={$.text}>全部</Text>
                        <Icon name='subject' color='#fff' size={14} />
                        <Text style={$.text}>{`${data.postsCount}`}</Text>
                    </Touch>
                    {data.postTopics
                        .sort((a, b) => b.postsCount - a.postsCount)
                        .slice(0, 8)
                        .map((i, index) => (
                            <Touch
                                key={`body-${index}`}
                                style={[$.item, active === index + 1 && $.active]}
                                activeOpacity={0.6}
                                onPress={() => this.onPress(i.name, index)}
                                >
                                <Text style={$.text}>{i.name}</Text>
                                <Icon name='subject' color='#fff' size={14} />
                                <Text style={$.text}>{`${i.postsCount}`}</Text>
                            </Touch>
                        ))
                    }
                </ScrollView>
            </View>
        );
    }
}

const $ = StyleSheet.create({
    root: {
        padding: 10,
        backgroundColor: '#fff',
        // borderTopWidth: StyleSheet.hairlineWidth,
        // borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#ececec',
    },
    item: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        margin: 10,
        backgroundColor: 'rgba(1, 1, 1, 0.45)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2,
        flexDirection: 'row',
    },
    text: {
        fontSize: 14,
        top: -1,
        color: '#fff',
    },
    active: {
        backgroundColor: color,
    }
});