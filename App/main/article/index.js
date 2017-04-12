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
import * as actions from './$action';
import {
    color,
    MaterialIcons as Icon,
    BaseComponent,
    TabTopbar,
} from '../common';

class Article extends BaseComponent {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.loadArticleData(this.props.id);
    }

    render() {
        const props = this.props;
        const article = props.article;

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
                            source={{ uri: article.titleImage }}
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
    state => ({
        article: state.article,
        router: state.navigator.router,
        id: state.navigator.data.id,
    }),
    actions,
)(Article);

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

