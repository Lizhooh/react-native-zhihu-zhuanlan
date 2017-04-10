import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Text,
} from 'react-native';
import { color } from '../common';

export default class Input extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[$.contanier, this.props.style]}>
                <TextInput
                    style={{ fontSize: 15, color: color }}
                    placeholder="搜索"
                    placeholderTextColor={color}
                    selectionColor={color}
                    underlineColorAndroid={'transparent'}
                    autoFocus={!true}
                    onSubmitEditing={this.onSubmit}
                    onChange={this.onChange}
                    maxLength={30}
                    // value={this.state.keyword}
                    ref={input => this.input}
                    {...this.props}
                    />
            </View>
        );
    }
}

const $ = StyleSheet.create({
    contanier: {
        flex: 1,
        paddingHorizontal: 10,
        paddingLeft: 5,
    },
})