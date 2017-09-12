import { ARTICLE } from '../type';
import * as api from '../../api';

export const init = (id) => async (dispatch, getState) => {
    const [r1, r2, r3] = await api.articles(id);
    let _ = {
        id: id,
        data: r1,
        contributed: r2,
        recomm: r3,
    };
    dispatch({ type: ARTICLE.init_success, ..._ });

    return _;
}
