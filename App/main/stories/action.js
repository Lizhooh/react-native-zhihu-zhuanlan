import * as Api from '../api';

export const LOAD_STORIES_DATA_SUCCESS = 'LOAD_STORIES_DATA_SUCCESS';
export const LOAD_STORIES_DATA_IN = 'LOAD_STORIES_DATA_IN';
export const LOAD_STORIES_DATA_FAIL = 'LOAD_STORIES_DATA_FAIL';

// # 加载发现文章数据
export const loadStoriesData = (limit = 10, page = 0) => (dispatch, getState) => {

    dispatch({ type: LOAD_STORIES_DATA_IN });

    return Api.storiesPosts(limit, page).then(data => {
        dispatch({
            type: LOAD_STORIES_DATA_SUCCESS,
            data: data,
            page: page + 1,
        });

    }).catch(err => {
        dispatch({ type: LOAD_STORIES_DATA_FAIL, status: true });

        setTimeout(_ => {
            dispatch({ type: LOAD_STORIES_DATA_FAIL, status: false });
        }, 3000);
    });
}