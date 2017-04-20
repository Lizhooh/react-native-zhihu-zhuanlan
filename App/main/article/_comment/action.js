import * as Api from '../../../api';

export const LOAD_COMMENT_DATA_SUCCESS = 'LOAD_COMMENT_DATA_SUCCESS';
export const LOAD_COMMENT_DATA_IN = 'LOAD_COMMENT_DATA_IN';
export const LOAD_COMMENT_DATA_FAIL = 'LOAD_COMMENT_DATA_FAIL';

export const LOAD_MORE_COMMENT_DATA_IN = 'LOAD_MORE_COMMENT_DATA_IN';
export const LOAD_MORE_COMMENT_DATA_SUCCESS = 'LOAD_MORE_COMMENT_DATA_SUCCESS';
export const LOAD_MORE_COMMENT_DATA_FAIL = 'LOAD_MORE_COMMENT_DATA_FAIL';

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

export const loadMoreCommentData = () => (dispatch, getState) => {
    dispatch({ type: LOAD_MORE_COMMENT_DATA_IN });
    const comment = getState().comment;

    return Api.comments(comment.id, comment.limit, comment.page).then(res => {
        dispatch({
            type: LOAD_MORE_COMMENT_DATA_SUCCESS,
            data: res,
        });
    }).catch(err => {
        console.log(err);
        dispatch({ type: LOAD_MORE_COMMENT_DATA_FAIL });
    });
}