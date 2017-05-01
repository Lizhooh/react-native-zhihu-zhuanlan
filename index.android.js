/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App/entry';
import { Provider } from 'react-redux';
import store from './App/store';

const zhihuZhuanlan = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

AppRegistry.registerComponent('zhihuZhuanlan', () => zhihuZhuanlan);

