import { COLUMN, USER } from '../type';
import * as api from '../../api';
import { followColumn } from '../../storage';

export const init = (name) => async (dispatch, getState) => {
    const { limit, tag } = getState().column;
    const [data, list] = await Promise.all([
        api.column.column(name),
        api.column.list(name, limit, 0, tag),
    ]);

    dispatch({
        type: COLUMN.init_success,
        data, list, name,
    })
}

export const more = () => async (dispatch, getState) => {
    const { limit, page, name, tag } = getState().column;
    const list = await api.column.list(name, limit, page, tag);
    dispatch({ type: COLUMN.more_success, list });
}

export const select = (tag) => async (dispatch, getState) => {
    const { limit, name } = getState().column;
    const list = await api.column.list(name, limit, 0, tag);
    dispatch({ type: COLUMN.select_success, tag, list });
}


// 加载关于
export const aboutInit = (name) => (dispatch, getstate) => {
    return api.column.about(name).then(res => ({ data: res[0], authors: res[1] }));
}

// 关注专栏
export const follow = (data) => async (dispatch, getState) => {
    let _ = {
        id: data.slug,
        title: data.name,
        follow: data.followersCount,
        intro: data.intro,
        avatar: data.avatar.image,
    };
    let list = await followColumn.add(_);

    dispatch({ type: USER.refresh_success, id: 1, list });
}