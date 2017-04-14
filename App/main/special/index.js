import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity as Touch,
    ScrollView,
    ActivityIndicator,
    InteractionManager,
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from './action';
import {
    color,
    MaterialIcons as Icon,
    BaseComponent,
    TabTopbar,
    devicewindow,
} from '../common';

class Special extends BaseComponent {

    componentWillMount() {
        InteractionManager.runAfterInteractions(_ => {

        });
    }

    renderTopbar = () => (
        <View style={{ flex: 0 }}>
            <TabTopbar
                iconName='arrow-back'
                style={{
                    opacity: this.state.opacity,
                    top: -1 * devicewindow.height + 25,
                }}
                iconPress={_ => {
                    this.props.navigator.pop();
                } }
                />
        </View>
    );

    render() {
        const props = this.props;
        const special = props.special;
        const data = special.data;

        if (special.startLoading && !data) {
            return (
                <View style={$.contanier}>
                    <View style={[{ flex: 1 }, $.center]}>
                        <ActivityIndicator
                            animating={true}
                            size="small"
                            color={color}
                            />
                        <Text>加载中</Text>
                    </View>
                    {this.renderTopbar()}
                </View>
            );
        }

        return (
            <View style={$.contanier}>
                <ScrollView
                    removeClippedSubviews={true}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    onScroll={this.onScroll}
                    >
                </ScrollView>

                {this.renderTopbar()}
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
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    }
});

