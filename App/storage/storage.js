import { AsyncStorage } from 'react-native';

// 内存缓存
const cache = {};

/**
 * 1. 使用 AsyncStorage 存储持久化数据
 * 2. 使用内存进行缓存，从而提升读取速度
 */
export default {
    /** 优先从内存里读取 */
    async get(key) {
        if (cache[key]) {
            let value = cache[key];
            // 注意引用的问题
            if (Array.isArray(value)) {
                return [...value];
            }
            else if (Object.prototype.toString.call(value) === '[object Object]') {
                return { ...cache[key] };
            }
            else {
                return value;
            }
        }
        else {
            let value = JSON.parse(await AsyncStorage.getItem(key));
            cache[key] = value;
            return value;
        }
    },
    async set(key, value) {
        cache[key] = value;
        return await AsyncStorage.setItem(key, JSON.stringify(value));
    },
    async has(key) {
        if (cache[key]) {
            return true;
        }
        else {
            return (await AsyncStorage.getItem(key)) === null;
        }
    },
    async remove(key) {
        cache[key] = undefined;
        return await AsyncStorage.removeItem(key);
    },
}
