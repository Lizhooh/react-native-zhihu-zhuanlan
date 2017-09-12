import React, { Component } from 'react';
import {
    StyleSheet,
    View, Text, Image,
    TouchableOpacity as Touch,
    WebView,
    ScrollView,
    InteractionManager,
} from 'react-native';
import { connect } from 'react-redux';
import { userActions } from '../redux/actions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HTML from '../resource/zhuanlan';

class User extends Component {

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        await InteractionManager.runAfterInteractions();
    }

    render() {
        const { options } = this.props.state;

        return (
            <View style={$.container}>
                <View style={$.header}>
                    <WebView source={{ html: HTML }} style={$.web}
                        domStorageEnabled={true}
                        />
                </View>
                <View style={$.body}>{
                    options.map((item, index) => (
                        <Touch
                            activeOpacity={0.8}
                            style={$.item}
                            key={`user-list-${index}`}
                            // onPress={event => this.onOpen(event, i)}
                            >
                            <Icon style={$.icon} name={item.name} color={item.color} size={26} />
                            <Text style={$.mid}>{item.title}</Text>
                            <Text style={$.text}>
                                {item.number}{item.text}
                            </Text>
                        </Touch>
                    ))
                }</View>
            </View>
        );
    }
}

export default connect(
    state => ({ state: state.user }),
    userActions,
)(User);

const $ = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        height: 240,
        backgroundColor: '#fff',
    },
    web: {
        width: '100%',
        height: 240,
    },
    body: {
        backgroundColor: '#dfdfdf',
        marginVertical: 20,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#f4f4f4',
    },
    icon: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    mid: {
        flex: 1,
    },
    text: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        color: 'rgba(1, 1, 1, 0.4)',
        fontSize: 15,
    },
});