import React from 'react';
import {
    RefreshControl,
} from 'react-native';
import { color } from '../config';

/**
 * 统一风格的刷新器
 */
export default (props = {}) => (
    <RefreshControl
        refreshing={false}
        onRefresh={null}
        tintColor={color}
        title="Loading..."
        titleColor={color}
        colors={[color]}
        progressBackgroundColor="#fff"
        {...props}
        />
)