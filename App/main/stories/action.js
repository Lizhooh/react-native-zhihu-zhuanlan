import * as api from '../../api';

export const loading_stories_success = 'loading_stories_success';
export const loading_stories_in = 'loading_stories_in';
export const loading_stories_fail = 'loading_stories_fail';

// # 加载发现文章数据
export const loadStoriesData = (limit = 10, page = 0) => (dispatch, getstate) => {

    dispatch({ type: loading_stories_in });

    return api.storiess(limit, page).then(data => {
        dispatch({
            type: loading_stories_success,
            data: data,
            page: page + 1,
        });

    }).catch(err => {
        dispatch({ type: loading_stories_fail, status: true });

        setTimeout(_ => {
            dispatch({ type: loading_stories_fail, status: false });
        }, 3000);
    });
}