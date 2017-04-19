import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity as Touch,
} from 'react-native';
import { connect } from 'react-redux';

class Comment extends Component {
    render() {
        return (
            <View>


            </View>
        );
    }
}

export default connect(
    state => ({ article: state.article })
)(Comment);


const $ = StyleSheet.create({
    contanier: {
        flex: 1,
    },
});


