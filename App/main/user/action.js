import * as api from '../../api';
import * as storage from '../../async/asyncStore';

export const init_user = 'init_user';
export const user_clear_all_look = 'user_clear_all_look';

// 初始化
export const initUser = () => async (dispatch, getState) => {
    const data = await storage.look.get();
    dispatch({ type: init_user, data });
};

// 情况全部浏览记录
export const userClaerAllLook = () => async (dispatch, getState) => {
    await storage.look.removeAll();
    dispatch({ type: user_clear_all_look, data: [] });
};