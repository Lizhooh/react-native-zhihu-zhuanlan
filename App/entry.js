import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    StyleSheet,
    View,
    Navigator,
    ToastAndroid,
    BackAndroid,
} from 'react-native';

import Main from './main';
import Article from './main/article';

const component = {
    Main, Article,
};

// # 入口
class App extends Component {

    onBackAndroid = (event) => {
        if (this.navigator && this.navigator.getCurrentRoutes().length > 1) {
            this.navigator.pop();
            return true;
        }

        if (this._lastBackPressed && this._lastBackPressed + 1000 >= Date.now()) {
            return false;
        }

        this._lastBackPressed = Date.now();
        ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);

        return true;
    };

    renderScene = (route, navigator) => {
        this.navigator = navigator;
        const Router = component[route.name];
        return <Router data={route.data} navigator={navigator} />
    };

    configureScene = (route, navigator) => {
        return Navigator.SceneConfigs.PushFromRight;
    };

    componentWillMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }

    render() {
        return (
            <Navigator
                initialRoute={{ id: 0, name: 'Main', data: null }}
                renderScene={this.renderScene}
                configureScene={this.configureScene}
                />
        );
    }
}

export default connect(
    state => ({ state }),
)(App);

const styles = StyleSheet.create({
    contanier: {
        paddingVertical: 15,
    },
    flatlist: {
        backgroundColor: 'rgba(1, 1, 1, 0.04)',
    }
});
