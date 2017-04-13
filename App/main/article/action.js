import * as Api from '../../api';

export const LOAD_ARTICLE_DATA_SUCCESS = 'LOAD_ARTICLE_DATA_SUCCESS';
export const LOAD_ARTICLE_DATA_IN = 'LOAD_ARTICLE_DATA_IN';
export const LOAD_ARTICLE_DATA_FAIL = 'LOAD_ARTICLE_DATA_FAIL';

export const CLEAR_ARTICLE_DATA = 'CLEAR_ARTICLE_DATA';

export const loadArticleData = (id) => (dispatch, getState) => {
    dispatch({ type: LOAD_ARTICLE_DATA_IN });

    return Api.articles(id).then(res => {
        dispatch({
            type: LOAD_ARTICLE_DATA_SUCCESS,
            data: res,
            id: id,
        });

    }).catch(err => {
        dispatch({ type: LOAD_ARTICLE_DATA_FAIL });
    });
}

export const clearArticleData = () => ({
    type: CLEAR_ARTICLE_DATA
})