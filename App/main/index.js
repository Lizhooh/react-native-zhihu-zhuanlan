import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import TabsBar from './tabsbar';
import User from './user';
import Recomm from './recomm';

export default class Main extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.contanier}>
                <ScrollableTabView
                    initialPage={2}
                    locked={true}
                    renderTabBar={() => (
                        <TabsBar
                            iconName={['near-me', 'landscape', 'looks', 'person']}
                            iconActiveColor='#3bf'
                            iconColor='#ccc'
                            />
                    )}
                    scrollWithoutAnimation={true}
                    tabBarPosition={'bottom'}
                    >
                    <View style={{ backgroundColor: '#e55', flex: 1 }}></View>
                    <View style={{ backgroundColor: '#5c5', flex: 1 }}></View>
                    <Recomm />
                    <User />
                </ScrollableTabView>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    contanier: {
        flex: 1,
        backgroundColor: '#fff',
    }
});