import * as Api from '../../../api';

export const LOAD_COMMENT_DATA_SUCCESS = 'LOAD_COMMENT_DATA_SUCCESS';
export const LOAD_COMMENT_DATA_IN = 'LOAD_COMMENT_DATA_IN';
export const LOAD_COMMENT_DATA_FAIL = 'LOAD_COMMENT_DATA_FAIL';

export const loadCommnetData = (id, page = 0) => (dispatch, getState) => {
    dispatch({ type: LOAD_COMMENT_DATA_IN });

    const limit = getState().comment.limit;

    return Api.comments(id, limit, page).then(res => {
        dispatch({
            type: LOAD_COMMENT_DATA_SUCCESS,
            data: res,
            id: id,
            page: page + 1,
        });
    }).catch(err => {

        dispatch({ type: LOAD_COMMENT_DATA_FAIL });
    });
}