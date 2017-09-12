import { STORIES } from '../type';
import * as api from '../../api';

export const init = () => async (dispatch, getState) => {
    const { limit } = getState().stories;
    const list = await api.storiess(limit, 0);
    dispatch({ type: STORIES.init_success, list });
}

export const more = () => async (dispatch, getState) => {
    const { limit, page } = getState().stories;
    const list = await api.storiess(limit, page);
    dispatch({ type: STORIES.more_success, list: list || [] });
}