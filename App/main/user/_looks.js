import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    FlatList,
    Text,
    Image,
    InteractionManager
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from './action';
import {
    color,
    MaterialIcons as Icon,
    TabTopbar,
} from '../common';

class Looks extends Component {

    componentDidMount() {

    }

    renderTopbar = () => (
        <TabTopbar
            title='浏览过的文章'
            iconName='arrow-back'
            iconPress={_ => this.props.navigator.pop()}
            />
    )

    render() {
        return (
            <View style={$.contanier}>
                {this.renderTopbar()}

                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    overScrollMode='never'
                    >

                </ScrollView>
            </View>
        );
    }
}

export default connect(
    state => ({}),
    actions,
)(Looks);

const $ = StyleSheet.create({
    contanier: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
});