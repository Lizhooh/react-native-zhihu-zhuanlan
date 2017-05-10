import * as api from '../../api';
import * as storage from '../../async/asyncStore';


export const init_user = 'init_user';


export const initUser = () => async (dispatch, getState) => {
    const data = await storage.look.get();
    dispatch({ type: init_user, data });
};

