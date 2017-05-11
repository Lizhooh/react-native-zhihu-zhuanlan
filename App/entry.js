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
import Special from './main/special';
import User from './main/user';

// 路由 组件
const component = {
    Main, Article, Special,
    'Special.About': Special.About,
    'Article.Comment': Article.Comment,
    'User.Looks': User.Looks,

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

    // 大导航
    renderScene = (route, navigator) => {
        this.navigator = navigator;
        const Router = component[route.name];
        return <Router data={route.data} navigator={navigator} />
    };

    /**
     * 1    Article
     * 11   Article.Comment
     * 2    Special
     * 21   Special.About
     * 31   user-likes
     * 32   user-columns
     * 33   user-looks
     */
    configureScene = (route, navigator) => {

        if ([2, 21, 11].includes(route.id)) {
            return Navigator.SceneConfigs.PushFromLeft;
        }

        if ([31, 32, 33].includes(route.id)) {
            return Navigator.SceneConfigs.PushFromLeft;
        }

        return Navigator.SceneConfigs.FloatFromRight;
    };

    componentWillMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }

    render() {
        return (
            <View style={styles.root}>
                <Navigator
                    initialRoute={{ id: 0, name: 'Main', data: null }}
                    renderScene={this.renderScene}
                    configureScene={this.configureScene}
                    />
            </View>
        );
    }
}

export default connect(
    state => ({ state }),
)(App);

const styles = StyleSheet.create({
    root: {
        flex: 1,
        paddingTop: 25,
        backgroundColor: '#fff',
    },
    contanier: {
        paddingVertical: 15,
    },
    flatlist: {
        backgroundColor: 'rgba(1, 1, 1, 0.04)',
    }
});
