import * as api from '../../../api';

export const loading_comment_success = 'loading_comment_success';
export const loading_comment_in = 'loading_comment_in';
export const loading_comment_fail = 'loading_comment_fail';

export const loading_more_comment_in = 'loading_more_comment_in';
export const loading_more_comment_success = 'loading_more_comment_success';
export const loading_more_comment_fail = 'loading_more_comment_fail';

export const loadCommnetData = (id, page = 0) => (dispatch, getstate) => {
    dispatch({ type: loading_comment_in });

    const limit = getstate().comment.limit;

    return api.comments(id, limit, page).then(res => {
        dispatch({
            type: loading_comment_success,
            data: res,
            id: id,
            page: page + 1,
        });
    }).catch(err => {
        dispatch({ type: loading_comment_fail });
    });
}

export const loadMoreCommentData = () => (dispatch, getstate) => {
    dispatch({ type: loading_more_comment_in });
    const comment = getstate().comment;

    return api.comments(comment.id, comment.limit, comment.page).then(res => {
        dispatch({
            type: loading_more_comment_success,
            data: res,
        });
    }).catch(err => {
        console.log(err);
        dispatch({ type: loading_more_comment_fail });
    });
}