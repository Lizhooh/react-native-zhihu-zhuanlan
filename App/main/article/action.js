import * as api from '../../api';

export const loading_article_success = 'loading_article_success';
export const loading_article_in = 'loading_article_in';
export const loading_article_fail = 'loading_article_fail';

export const clear_article_data = 'clear_article_data';


export const loadArticle = (id) => (dispatch, getstate) => {

    dispatch({ type: loading_article_in });

    return api.articles(id).then(resarray => {
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

