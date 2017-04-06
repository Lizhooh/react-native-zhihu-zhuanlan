import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity as Touch,
    FlatList,
    ScrollView,
    RefreshControl,
    Dimensions,
} from 'react-native';

import { connect } from 'react-redux';

const Texts = (props) => (
    <Text {...props} style={{
        color: '#333', ...props.style
    }}>
        {props.children}
    </Text>
);

const ITEM_HEIGHT = 96;

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
        };

        this.require();
    }

    require = async () => {
        const result = await fetch('http://112.74.109.22:3000/zhihu-daily/api/latest')
            .then(res => res.json());

        const data = [
            ...result.stories,
            ...result.stories,
            ...result.stories,
        ].map((i, index) => ({ ...i, key: `${index}-${i.id}` }));

        this.setState({ data });
    }

    renderItem = ({item, index}) => (
        <Touch
            style={storie.touch}
            activeOpacity={0.7}
            >
            <View style={storie.contanier}>
                <View style={storie.textview}>
                    <Texts>{item.title}</Texts>
                </View>
                {
                    item.images &&
                    <View style={storie.imageview}>
                        <Image
                            source={{ uri: item.images[0] }}
                            style={storie.image}
                            />
                    </View>
                }
            </View>
        </Touch>
    );

    render() {

        return (
            <View>
                <Text>Hello</Text>
            </View>
        )
        // return (


    }
}

export default connect(
    state => ({ nav: state }),
)(App);

const styles = StyleSheet.create({
    contanier: {
        paddingVertical: 15,
    },
    flatlist: {
        backgroundColor: 'rgba(1, 1, 1, 0.04)',
    }
});

const storie = StyleSheet.create({
    touch: {
        backgroundColor: 'rgba(1, 1, 1, 0.15)',
        borderRadius: 3,
        margin: 10,
        marginHorizontal: 15,
    },
    contanier: {
        height: ITEM_HEIGHT,
        backgroundColor: '#fff',
        borderRadius: 3,
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 10,
        top: -1,
    },
    textview: {
        flex: 1,
        padding: 3,
        marginRight: 10,
    },
    imageview: {
        width: 80,
        height: 80,
        borderRadius: 2,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 2,
    }
});

