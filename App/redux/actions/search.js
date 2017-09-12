import { SEARCH } from '../type';
import * as api from '../../api';

export const init = (key) => async (dispatch, getState) => {
    const res = await api.searchSogo(key, 1);
    dispatch({
        type: SEARCH.init_success,
        data: res.data,
        count: res.count,
        key: key,
    })
}

export const more = () => async (dispatch, getState) => {
    const { page, key } = getState().search;
    const res = await api.searchSogo(key, page);
    dispatch({
        type: SEARCH.more_success,
        data: res.data,
    })
}


