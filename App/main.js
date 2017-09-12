import React, { PureComponent } from 'react';
import {
    StyleSheet,
    View, Text,
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { Tabbar } from './components';

// views
import Stories from './views/stories';
import Search from './views/search';
import Special from './views/special';
import User from './views/user';

// # 主视图 Tabs
export default class Main extends PureComponent {

    tabrenderTabBar = () => (
        <Tabbar
            iconName={['near-me', 'landscape', 'search', 'person']}
            iconColor='#ccc'
            />
    )

    render() {
        const { navigator } = this.props;

        return (
            <View style={styles.contanier}>
                <ScrollableTabView
                    initialPage={3}  // 初始显示的 tab
                    locked={true}
                    renderTabBar={this.tabrenderTabBar}
                    scrollWithoutAnimation={!true}
                    tabBarPosition={'bottom'}
                    >
                    <Special navigator={navigator} />
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