import * as Api from '../../api';

export const LOAD_SEARCH_DATA_SUCCESS = 'LOAD_SEARCH_DATA_SUCCESS';
export const LOAD_SEARCH_DATA_IN = 'LOAD_SEARCH_DATA_IN';
export const LOAD_SEARCH_DATA_FAIL = 'LOAD_SEARCH_DATA_FAIL';

// # 加载推荐数据
export const loadSearchData = (limit = 5, page = 0) => (dispatch, getState) => {
    dispatch({ type: LOAD_SEARCH_DATA_IN });

    return Api.searchPosts(limit, page).then(data => {
        dispatch({
            type: LOAD_SEARCH_DATA_SUCCESS,
            data: data,
            page: page + 1,
        });

    }).catch(err => {
        dispatch({ type: LOAD_SEARCH_DATA_FAIL, status: true });

        setTimeout(_ => {
            dispatch({ type: LOAD_SEARCH_DATA_FAIL, status: false });
        }, 3000);
    });
}