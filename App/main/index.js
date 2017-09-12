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
import Stories from '../views/stories';
import Columm from './column';

// # 主视图 Tabs
export default class Main extends Component {
    render() {
        const navigator = this.props.navigator;

        return (
            <View style={styles.contanier}>
                <ScrollableTabView
                    initialPage={3}  // 初始显示的 tab
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
                    <Columm navigator={navigator} />
                    <Stories navigator={navigator} />
                    <Search navigator={navigator} />
                    <User navigator={navigator} />
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