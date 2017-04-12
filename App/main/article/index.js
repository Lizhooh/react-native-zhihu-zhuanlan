import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity as Touch,
    ScrollView,
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

class Article extends BaseComponent {

    constructor(props) {
        super(props);

        InteractionManager.runAfterInteractions(_ => {
            this.props.loadArticleData(this.props.data.id);
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
                />
        </View>
    );

    render() {
        const props = this.props;
        const article = props.article;
        const data = article.data;

        if (article.startLoading || !data) {
            return (
                <View style={$.contanier}>
                    <View style={{ flex: 1 }} />
                    {this.renderTopbar()}
                </View>
            );
        }

        if (data) {
            return (
                <View style={$.contanier}>
                    <ScrollView
                        removeClippedSubviews={true}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        onScroll={this.onScroll}
                        >
                        <View style={$.header}>
                            <Image
                                source={{ uri: data.titleImage }}
                                style={$.titleImage}
                                />
                        </View>

                        <View style={$.body}>

                        </View>

                        <View style={$.more}>

                        </View>

                        <View style={$.recomm}>

                        </View>

                    </ScrollView>

                    {this.renderTopbar()}
                </View>
            );
        }
    }
}

export default connect(
    state => ({
        article: state.article,
    }),
    actions,
)(Article);

const $ = StyleSheet.create({
    contanier: {
        flex: 1,
        backgroundColor: '#f6f6f6',
    },
    header: {
        height: 300,
        backgroundColor: '#fff',
    },
    titleImage: {
        height: '100%',
        width: '100%',
    }
});

