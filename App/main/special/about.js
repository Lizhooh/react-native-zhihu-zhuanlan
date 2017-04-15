import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity as Touch,
    InteractionManager,
    ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from './action';
import {
    color,
    MaterialIcons as Icon,
} from '../common';

const commonScrollViewProps = {
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
    overScrollMode: 'never',
    removeClippedSubviews: true,
};

class Ablout extends Component {

    componentWillMount() {
        InteractionManager.runAfterInteractions(_ => {
            setTimeout(_ => {
                this.props.loadSpecialAbloutData(this.props.data.column);
            }, 30);
        })
    }

    componentWillUnmount() {
        setTimeout(_ => {
            this.props.clearSpecialAboutData();
        }, 30);
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

    renderView = data => (
        data &&
        <View collapsable={true}>
            <View>
                <Text>关于</Text>
                <View>
                    <Image />
                    <View>
                        <Text>title</Text>
                        <Text>summary</Text>
                    </View>
                </View>
            </View>

            <View>
                <Text>专栏话题</Text>
                <ScrollView {...commonScrollViewProps}>

                </ScrollView>
            </View>

            <View>
                <Text>专栏介绍</Text>
                <Text>description</Text>
            </View>

            <View>
                <ScrollView {...commonScrollViewProps}>
                    <View>
                        <Image />
                        <View>
                            <Text></Text>
                            <Text></Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );

    render() {
        const special = this.props.special;
        const about = special.about;

        if (special.loading.status || !about) {
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
                <ScrollView {...commonScrollViewProps}>
                    {this.renderTopbar()}
                    {this.renderView(about)}
                </ScrollView>
            </View>
        );
    }
}

export default connect(
    state => ({ special: state.special }),
    actions
)(Ablout);

const $ = StyleSheet.create({
    contanier: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    topbar: {
        height: 50,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
})
