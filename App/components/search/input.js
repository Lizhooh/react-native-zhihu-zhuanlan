import React, { Component } from 'react';
import {
    StyleSheet,
    View, Text,
    TextInput,
    TouchableOpacity as Touch,
} from 'react-native';
import { color } from '../../config';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Input extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: null,
        }
    }

    onChange = event => {
        const text = event.nativeEvent.text;
        this.setState({ value: text });
    };

    onSubmit = event => {
        this.props.onSubmit(event, this.state.value);
    };

    render() {
        return (
            <View style={[$.contanier, this.props.style]}>
                <TextInput
                    style={$.input}
                    placeholder="搜索"
                    placeholderTextColor={color}
                    selectionColor={color}
                    underlineColorAndroid={'transparent'}
                    autoFocus={!true}
                    onSubmitEditing={this.onSubmit}
                    onChange={this.onChange}
                    maxLength={30}
                    value={this.state.value}
                    ref={input => this.input}
                    {...this.props}
                    />
                {
                    !!this.state.value &&
                    <Touch
                        style={$.clear}
                        activeOpacity={1}
                        onPress={_ => this.setState({ value: '' })}
                        >
                        <Icon
                            name="clear"
                            color={color}
                            size={20}
                            />
                    </Touch>
                }
            </View>
        );
    }
}

const $ = StyleSheet.create({
    contanier: {
        flex: 1,
        paddingLeft: 5,
        paddingRight: 30,
        justifyContent: 'center',
        top: 1,
    },
    input: {
        fontSize: 16,
        color: color,
        // borderBottomWidth: StyleSheet.hairlineWidth,
        // borderBottomColor: color,
    },
    clear: {
        position: 'absolute',
        top: 5,
        right: 30,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    }
})