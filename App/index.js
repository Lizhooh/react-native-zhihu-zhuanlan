import React from 'react';
import { AppRegistry } from 'react-native';
import App from './navigator';
import { Provider } from 'react-redux';
import store from './redux/store';

export default () => (
    <Provider store={store}>
        <App />
    </Provider>
);


