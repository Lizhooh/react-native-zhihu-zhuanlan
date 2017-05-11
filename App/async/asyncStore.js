
/**
 * 本地数据存储
 */
import {
    AsyncStorage,
} from 'react-native';


// 阅读过的文章存储
const LOOKS = 'looks';
export const look = {
    add: async function (data) {
        let looks = JSON.parse(await AsyncStorage.getItem(LOOKS) || '[]');

        const index = looks.findIndex(i => i.id === data.id);
        index !== -1 && looks.splice(index, 1);
        looks.unshift(data);

        const res = await AsyncStorage.setItem(LOOKS, JSON.stringify(looks));
        return { res, data: looks };
    },
    get: async function () {
        return JSON.parse(await AsyncStorage.getItem(LOOKS) || '[]');
    },
    remove: async function (id) {
        let looks = JSON.parse(await AsyncStorage.getItem(LOOKS));

        const index = looks.findIndex(i => i.id === id);
        index !== -1 && looks.splice(index, 1);

        const res = await AsyncStorage.setItem(LOOKS, JSON.stringify(looks));
        return { res, data: looks };
    },
    removeAll: async function () {
        const res = await AsyncStorage.removeItem(LOOKS);
        return { res, data: [] };
    },
};



