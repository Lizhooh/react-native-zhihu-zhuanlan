import { SPECIAL } from '../type';
import * as api from '../../api';

export const init = () => async (dispatch, getState) => {
    const { limit } = getState().special;
    try {
        const list = await api.special(limit, 0);
        dispatch({ type: SPECIAL.init_success, list })
    }
    catch (err) {
        dispatch({ type: SPECIAL.init_fail });
    }
}

export const more = () => async (dispatch, getState) => {
    const { limit, page } = getState().special;
    const list = await api.special(limit, page);
    dispatch({ type: SPECIAL.more_success, list: list || [] })
}

