import * as api from '../../api';

export const loading_search_success = 'loading_search_success';
export const loading_search_in = 'loading_search_in';
export const loading_search_fail = 'loading_search_fail';
export const loading_more_search_success = 'loading_more_search_success';

let time = 0;

// # 加载搜索数据
export const loadSearchData = (keys = '', page = 0) => (dispatch, getstate) => {
    dispatch({ type: loading_search_in });

    return api.searchBind(keys, page).then(res => {
        if (res.data.length === 0) return Promise.reject({ msg: '没有更多结果了' });

        dispatch({
            type: loading_search_success,
            data: res.data,
            count: res.count,
            keys: keys,
            page: page + 1,
        });

    }).catch(err => {
        dispatch({
            type: loading_search_fail,
            status: true,
            msg: err.msg || '加载失败',
        });

        time = setTimeout(function () {
            clearTimeout(time);
            dispatch({ type: loading_search_fail, status: false });
        }, 1000 * 4);
    });
}

// # 加载更多
export const loadMoreSearchData = (keys = '', page = 0) => (dispatch, getstate) => {
    dispatch({ type: loading_search_in });

    return api.searchBind(keys, page).then(res => {
        if (res.data.length === 0) return Promise.reject({ msg: '没有更多结果了' });

        dispatch({
            type: loading_more_search_success,
            data: res.data,
            keys: keys,
            page: page + 1,
        });

    }).catch(err => {
        dispatch({
            type: loading_search_fail,
            status: true,
            msg: err.msg || '加载失败',
        });
        time = setTimeout(function () {
            clearTimeout(time);
            dispatch({ type: loading_search_fail, status: false });
        }, 1000 * 4);
    });
}
