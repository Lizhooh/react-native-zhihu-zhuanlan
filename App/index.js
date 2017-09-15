import React, { Component } from 'react';
import {
    NetInfo,
    ToastAndroid as Toast,
} from 'react-native';
import Navigator from './navigator';
import { Provider } from 'react-redux';
import store from './redux/store';

export default class App extends Component {

    netInfoChange = (reach) => {
        if (reach === 'NONE') {
            Toast.show('当前网络不可用，请检查你的网络设置', Toast.LONG);
        }
    }

    async componentDidMount() {
        NetInfo.addEventListener('change', this.netInfoChange);
    }

    render() {
        return (
            <Provider store={store}>
                <Navigator />
            </Provider>
        );
    }
}
