import * as Api from '../../api';

export const LOAD_SEARCH_DATA_SUCCESS = 'LOAD_SEARCH_DATA_SUCCESS';
export const LOAD_SEARCH_DATA_IN = 'LOAD_SEARCH_DATA_IN';
export const LOAD_SEARCH_DATA_FAIL = 'LOAD_SEARCH_DATA_FAIL';
export const LOAD_MORE_SEARCH_DATA_SUCCESS = 'LOAD_MORE_SEARCH_DATA_SUCCESS';

// # 加载搜索数据
export const loadSearchData = (keys = '', page = 1) => (dispatch, getState) => {
    dispatch({ type: LOAD_SEARCH_DATA_IN });

    return Api.searchs(keys, page).then(data => {
        if (data.length === 0) return Promise.reject();

        dispatch({
            type: LOAD_SEARCH_DATA_SUCCESS,
            data: data,
            keys: keys,
            page: page + 1,
        });

    }).catch(err => {
        dispatch({
            type: LOAD_SEARCH_DATA_FAIL,
            status: true,
            msg: '没有更多结果了'
        });

        setTimeout(function () {
            dispatch({ type: LOAD_SEARCH_DATA_FAIL, status: false });
        }, 1000 * 3);
    });
}

// # 加载更多
export const loadMoreSearchData = (keys = '', page = 1) => (dispatch, getState) => {
    dispatch({ type: LOAD_SEARCH_DATA_IN });

    return Api.searchs(keys, page).then(data => {
        if (data.length === 0) return Promise.reject();

        dispatch({
            type: LOAD_MORE_SEARCH_DATA_SUCCESS,
            data: data,
            keys: keys,
            page: page + 1,
        });

    }).catch(err => {
        dispatch({
            type: LOAD_SEARCH_DATA_FAIL,
            status: true,
            msg: '没有更多结果了'
        });

        setTimeout(function () {
            dispatch({ type: LOAD_SEARCH_DATA_FAIL, status: false });
        }, 1000 * 5);
    });
}
