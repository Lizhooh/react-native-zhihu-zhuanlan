import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import TabsBar from './tabsbar';
import User from './user';

export default Main = () => {
    return (
        <View style={styles.contanier}>
            <ScrollableTabView
                initialPage={3}
                locked={true}
                renderTabBar={() => (
                    <TabsBar
                        iconName={['near-me', 'toys', 'camera', 'person']}
                        iconActiveColor='#3bf'
                        iconColor='#ccc'
                        />
                )}
                scrollWithoutAnimation={true}
                tabBarPosition={'bottom'}
                >
                <View style={{ backgroundColor: '#e55', flex: 1 }}></View>
                <View style={{ backgroundColor: '#5c5', flex: 1 }}></View>
                <View style={{ backgroundColor: '#55c', flex: 1 }}></View>
                <User />
            </ScrollableTabView>
        </View>
    );
};

const styles = StyleSheet.create({
    contanier: {
        flex: 1,
        backgroundColor: '#fff',
    }
});