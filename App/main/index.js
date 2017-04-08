import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import { color } from './common';
import TabsBar from './tabsbar';
import User from './user';
import Search from './search';
import Stories from './stories';

// # 主视图
export default class Main extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.contanier}>
                <ScrollableTabView
                    initialPage={1}
                    locked={true}
                    renderTabBar={() => (
                        <TabsBar
                            iconName={['near-me', 'landscape', 'search', 'person']}
                            iconActiveColor={color}
                            iconColor='#ccc'
                            />
                    )}
                    scrollWithoutAnimation={!true}
                    tabBarPosition={'bottom'}
                    >
                    <View style={{ backgroundColor: '#e55', flex: 1 }}></View>
                    <Stories />
                    <Search />
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