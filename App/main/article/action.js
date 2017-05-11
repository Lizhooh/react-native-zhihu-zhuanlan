import * as api from '../../api';
import * as storage from '../../async/asyncStore';

export const loading_article_success = 'loading_article_success';
export const loading_article_in = 'loading_article_in';
export const loading_article_fail = 'loading_article_fail';

export const clear_article_data = 'clear_article_data';

export const user_add_look = 'user_add_look';


export const loadArticle = (id) => (dispatch, getstate) => {

    dispatch({ type: loading_article_in });

    return api.articles(id).then(resarray => {

        const article = { ...resarray[0] };

        userAddLook({
            id: id,
            key: id,
            title: article.title,
            author: article.author,
            titleImage: article.titleImage,
            column: article.column,
            summary: article.summary,
            commentsCount: article.commentsCount,
            likesCount: article.likesCount,
            time: article.publishedTime.match(/\d{4}-\d{2}-\d{2}/g).join(''),
        }, dispatch);

        dispatch({
            type: loading_article_success,
            data: resarray[0],
            contributed: resarray[1],
            recomm: resarray[2],
            id: id,
        });

    }).catch(err => {
        dispatch({ type: loading_article_fail });
    });
}

export const clearArticle = () => ({
    type: clear_article_data
})

// 添加浏览记录
async function userAddLook(data, dispatch) {
    const res = await storage.look.add(data);
    dispatch({ type: user_add_look, data: res.data });

    // if (res.data) {
    // }
    // else {
    //     console.warn('storage: look add error.');
    // }
}




