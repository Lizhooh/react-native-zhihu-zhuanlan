import * as Api from '../../api';

export const LOAD_ARTICLE_DATA_SUCCESS = 'LOAD_ARTICLE_DATA_SUCCESS';
export const LOAD_ARTICLE_DATA_IN = 'LOAD_ARTICLE_DATA_IN';
export const LOAD_ARTICLE_DATA_FAIL = 'LOAD_ARTICLE_DATA_FAIL';
export const AGAIN_OPEN_ARTICLE = 'AGAIN_OPEN_ARTICLE';

export const CLEAR_ARTICLE_DATA = 'CLEAR_ARTICLE_DATA';

export const loadArticleData = (id) => (dispatch, getState) => {

    // if (id * 1 === getState().article.id * 1) {
    //     dispatch({ type: AGAIN_OPEN_ARTICLE });
    //     return;
    // };

    dispatch({ type: LOAD_ARTICLE_DATA_IN });

    return Api.articles(id).then(resArray => {
        dispatch({
            type: LOAD_ARTICLE_DATA_SUCCESS,
            data: resArray[0],
            contributed: resArray[1],
            id: id,
        });

    }).catch(err => {
        dispatch({ type: LOAD_ARTICLE_DATA_FAIL });
    });
}

export const clearArticleData = () => ({
    type: CLEAR_ARTICLE_DATA
})