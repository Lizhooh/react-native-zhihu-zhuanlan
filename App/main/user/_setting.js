import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity as Touch,
    ScrollView,
    Switch,
} from 'react-native';

import {
    color,
} from '../common';

export default class Setting extends Component {

    constructor(props) {
        super(props);

        this.state = {
            find: true,
        };
    }

    render() {

        return (
            <View style={$.contanier}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    removeClippedSubviews={false}
                    style={{ paddingVertical: 5 }}
                    >

                    <View style={$.row}>
                        <View style={$.left}>
                            <Text>应用缓存</Text>
                        </View>

                        <View style={$.right}>
                            <Text>4.00 KB</Text>
                        </View>
                    </View>

                    <View style={$.row}>
                        <View style={$.left}>
                            <Text>使用深度搜索引擎</Text>
                        </View>

                        <View style={$.right}>
                            <Switch value={this.state.find} onValueChange={event =>
                                this.setState({ find: !this.state.find })
                            } />
                        </View>
                    </View>

                </ScrollView>
            </View>
        );
    }
}

const $ = StyleSheet.create({
    contanier: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginVertical: 5,
        alignItems: 'center',
        height: 45,
    },
    left: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 12,
    },
    right: {
        paddingHorizontal: 15,
        paddingVertical: 12,
    }
});