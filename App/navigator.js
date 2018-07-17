import React, { Component } from 'react';
import {
    StyleSheet,
    View, NetInfo,
    ToastAndroid as Toast,
    BackHandler,
} from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';

// views
import Main from './main';

import Article from './views/article';
import ArticleComment from './views/article-comment';

import Column from './views/column';
import ColumnAbout from './views/column-about';

import UserFollowColumn from './views/user-follow-column';
import UserStarArticle from './views/user-star-article';
import UserLookArticle from './views/user-look-article';
import UserAbout from './views/user-about';

// 导航相关
export default class MyNavigatior extends Component {

    constructor(props) {
        super(props);

        this.views = {
            'Main': Main,
            'Article': Article,
            'ArticleComment': ArticleComment,
            'Column': Column,
            'ColumnAbout': ColumnAbout,
            'UserFollowColumn': UserFollowColumn,
            'UserStarArticle': UserStarArticle,
            'UserLookArticle': UserLookArticle,
            'UserAbout': UserAbout,
        };
    }

    onBackAndroid = (event) => {

        if (this.navigator && this.navigator.getCurrentRoutes().length > 1) {
            this.navigator.pop();
            return true;
        }

        if (this._lastBackPressed && this._lastBackPressed + 1000 >= Date.now()) {
            return false;
        }

        this._lastBackPressed = Date.now();
        Toast.show('再按一次退出应用', Toast.SHORT);

        return true;
    };

    // 导航动画
    configureScene = (route, navigator) => {
        switch (route.animated) {
            case 'top':
                return Navigator.SceneConfigs.FloatFromBottomAndroid;
            case 'bottom':
                return Navigator.SceneConfigs.VerticalDownSwipeJump;
            case 'left':
                // 平滑速度
                Navigator.SceneConfigs.PushFromLeft.defaultTransitionVelocity = 15;
                Navigator.SceneConfigs.PushFromLeft.springFriction = 25;
                Navigator.SceneConfigs.PushFromLeft.springTension = 180;
                return Navigator.SceneConfigs.PushFromLeft;
            case 'right':
                return Navigator.SceneConfigs.FloatFromRight;
            default:
                // 平滑速度
                Navigator.SceneConfigs.PushFromRight.defaultTransitionVelocity = 18;
                Navigator.SceneConfigs.PushFromRight.springFriction = 25;
                Navigator.SceneConfigs.PushFromRight.springTension = 160;
                return Navigator.SceneConfigs.PushFromRight;
        }
    };

    // 大导航
    renderScene = (route, navigator) => {
        this.navigator = navigator;
        const Views = this.views[route.name];
        return <Views data={route.data} navigator={navigator} />
    };

    netInfoChange = (reach) => {
        if (reach === 'NONE') {
            Toast.show('当前网络不可用，请检查你的网络设置', Toast.LONG);
        }
    }

    async componentDidMount() {
        // orientation.lockToPortrait();
        NetInfo.addEventListener('change', this.netInfoChange);
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }

    render() {
        return (
            <View style={$.container}>
                <Navigator
                    initialRoute={{ name: 'Main', data: null }}
                    renderScene={this.renderScene}
                    configureScene={this.configureScene}
                    />
            </View>
        );
    }
}

const $ = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
})
