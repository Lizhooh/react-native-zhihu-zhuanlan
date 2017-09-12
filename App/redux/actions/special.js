import { SPECIAL } from '../type';
import * as api from '../../api';

export const init = () => async (dispatch, getState) => {
    const { limit } = getState().special;
    const list = await api.special(limit, 0);
    dispatch({ type: SPECIAL.init_success, list })
}

export const more = () => async (dispatch, getState) => {
    const { limit, page } = getState().special;
    console.log(SPECIAL.more_success);
    const list = await api.special(limit, page);
    dispatch({ type: SPECIAL.more_success, list: list || [] })
}

