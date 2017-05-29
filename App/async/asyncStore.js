
/**
 * 本地数据存储
 */
import {
    AsyncStorage,
} from 'react-native';


// 封装 AsyncStorage
const storage = {
    get: async function (key) {
        return JSON.parse(await AsyncStorage.getItem(key) || '[]');
    },
    set: async function (key, data) {
        JSON.parse(await AsyncStorage.setItem(key, JSON.stringify(data)));
        return this;
    },
    remove: async function (key) {
        AsyncStorage.removeItem(key);
        return this;
    },
};


// 阅读过的文章存储
export const look = {
    key: 'looks',
    add: async function (data) {
        let looks = await storage.get(this.key);

        const index = looks.findIndex(i => i.id === data.id);
        index !== -1 && looks.splice(index, 1);
        looks.unshift(data);

        storage.set(this.key, looks);
        return looks;
    },
    get: async function () {
        return storage.get(this.key);
    },
    removeAll: async function () {
        storage.remove(this.key);
        return [];
    },
};
