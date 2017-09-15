import { ARTICLE_COMMENT } from '../type';
import * as api from '../../api';

export const init = (id) => async (dispatch, getState) => {
    const { limit } = getState().article_comment;
    const res = await api.comments(id, limit, 0);
    dispatch({
        type: ARTICLE_COMMENT.init_success,
        list: res,
        id: id,
    });
}

export const more = () => async (dispatch, getState) => {
    const { id, page, limit } = getState().article_comment;
    const res = await api.comments(id, limit, page);
    dispatch({
        type: ARTICLE_COMMENT.more_success,
        list: res,
        id: id,
    });
}
