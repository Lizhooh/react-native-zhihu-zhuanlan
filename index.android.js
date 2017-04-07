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



//     <FlatList
//         contentContainerStyle={styles.contanier}
//         showsVerticalScrollIndicator={false}
//         removeClippedSubviews={true}
//         style={styles.flatlist}
//         data={this.state.data}
//         renderItem={this.renderItem}
//         refreshControl={
//             <RefreshControl
//                 refreshing={false}
//                 onRefresh={null}
//                 tintColor="#3bf"
//                 title="Loading..."
//                 titleColor="#3bf"
//                 colors={['#3bf']}
//                 progressBackgroundColor="#fff"
//                 />
//         }
//         // getItemLayout={(data, index) => ({
//         //     index: index,
//         //     length: ITEM_HEIGHT,
//         //     offset: (ITEM_HEIGHT + 20) * index,
//         // })}
//         />

// );