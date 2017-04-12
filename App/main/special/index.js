import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity as Touch,
    ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from './action';
import {
    color,
    MaterialIcons as Icon,
    BaseComponent,
    TabTopbar,
} from '../common';

class Special extends BaseComponent {

    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    render() {
        const props = this.props;
        const special = props.special;

        return (
            <View style={$.contanier}>
                <ScrollView
                    removeClippedSubviews={true}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    onScroll={this.onScroll}
                    >
                    <View style={$.header}>

                    </View>

                    <View style={$.body}>

                    </View>

                    <View style={$.list}>

                    </View>
                </ScrollView>

                <View style={{ flex: 0 }}>
                    <TabTopbar
                        iconName='arrow-back'
                        style={{ opacity: this.state.opacity }}
                        />
                </View>
            </View>
        );
    }
}

export default connect(
    state => ({ special: state.special }),
    actions,
)(Special);

const $ = StyleSheet.create({
    contanier: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        height: 240,
    },
    titleImage: {
        height: '100%',
        width: '100%',
    }
});

