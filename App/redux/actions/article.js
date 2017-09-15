import { ARTICLE, USER } from '../type';
import * as api from '../../api';
import { starArticle, lookArticle } from '../../storage';

export const init = (id) => async (dispatch, getState) => {
    const [r1, r2, r3] = await api.articles(id);
    let art = {
        id: id,
        data: r1,
        contributed: r2,
        recomm: r3,
    };

    dispatch({ type: ARTICLE.init_success, ...art });

    setTimeout(async () => {
        if (art.data.slug) {
            const { data  } = art;

            let _ = {
                slug: data.slug,
                avatar: data.author.avatar.image,
                title: data.title,
                summary: data.summary,
                titleImage: data.titleImage,
            };

            let list = await lookArticle.add(_);
            dispatch({ type: USER.refresh_success, id: 2, list });
        }
    }, 100);

    return art;
}

export const star = () => async (dispatch, getState) => {
    const { data } = getState().article;
    let _ = {
        slug: data.slug,
        avatar: data.author.avatar.image,
        title: data.title,
        summary: data.summary,
        titleImage: data.titleImage,
    };
    let list = await starArticle.add(_);

    dispatch({ type: USER.refresh_success, id: 0, list });
}