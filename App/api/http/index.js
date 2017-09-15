import qs from 'qs';
import { ToastAndroid as Toast } from 'react-native';

const host = `https://zhuanlan.zhihu.com/api`;

/**
 * get 请求
 * @param{String} path 地址
 * @param{Object} query 查询数据
 * @returns{Promise} Promise
 */
const _get = (path, query) => {
    query && (path += `?${qs.stringify(query)}`);

    return fetch(host + path, {
        method: 'get',
        headers: {
            'Referer': 'https://zhuanlan.zhihu.com/api',
            'Content-Type': 'application/json;charset=utf-8',
        }
    })
};

/** 超时任务 */
const task = (fetch, timeout = 1000 * 15) => {
    let a = null;
    const time1 = new Promise((resolve, reject) => {
        a = () => reject('网络请求超时，请稍后重新打开');
    });
    setTimeout(a, timeout);
    return Promise.race([time1, fetch]);
}

export const get = (path, query = null) => {
    return task(_get(path, query))
        .then(res => {
            if (res.status === 401) {
                throw '此文章/专栏，不存在或已删除';
            }
            else if (res.status === 404) {
                throw '网络连接错误';
            }
            else if (res.status === 500) {
                throw '服务器抽风了';
            }
            return res;
        })
        .then(res => res.json())
        .then(res => {
            if (res.error && res.error.length > 0) {
                // console.error(`get: ${path}, Error: ${res.error}.`);
                return Promise.reject();
            }
            return res;
        }).catch(err => {
            // console.error(`get: ${host + path}, Error: ${err}.`);
            Toast.show(`${err}`, Toast.LONG);
        });
}
