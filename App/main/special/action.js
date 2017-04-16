import * as Api from '../../api';

// 加载专栏信息
export const LOAD_SPECIAL_DATA_SUCCESS = 'LOAD_SPECIAL_DATA_SUCCESS';
export const LOAD_SPECIAL_DATA_IN = 'LOAD_SPECIAL_DATA_IN';
export const LOAD_SPECIAL_DATA_FAIL = 'LOAD_SPECIAL_DATA_FAIL';
export const CLEAR_SPECIAL_DATA = 'CLEAR_SPECIAL_DATA';

// 加载关于
export const LOAD_SPECIAL_ABOUT_DATA_IN = 'LOAD_SPECIAL_ABOUT_DATA_IN';
export const LOAD_SPECIAL_ABOUT_DATA_SUCCESS = 'LOAD_SPECIAL_ABOUT_DATA_SUCCESS';
export const CLEAR_SPECIAL_ABOUT_DATA = 'CLEAR_SPECIAL_ABOUT_DATA';

// 加载专栏信息
export const loadSpecialData = (name) => (dispatch, getState) => {
    const state = getState();
    dispatch({ type: LOAD_SPECIAL_DATA_IN });

    Promise.all([
        Api.special.column(name),
        Api.special.list(name, state.limit, 0),
    ]).then(resArray => {
        dispatch({
            type: LOAD_SPECIAL_DATA_SUCCESS,
            data: resArray[0],
            list: resArray[1],
            name: name,
        });
    }).catch(err => {
        dispatch({ type: LOAD_SPECIAL_DATA_FAIL });
    });
}

export const clearSpecialData = () => ({
    type: CLEAR_SPECIAL_DATA
})

// 加载关于
export const loadSpecialAbloutData = (name) => (dispatch, getState) => {
    if(name === getState().special.aboutName) return;

    dispatch({ type: LOAD_SPECIAL_ABOUT_DATA_IN });

    return Api.special.about(name).then(result => {
        dispatch({
            type: LOAD_SPECIAL_ABOUT_DATA_SUCCESS,
            about: {
                data: result[0],
                authors: result[1],
            },
            name: name,
        })
    }).catch(err => {
        dispatch({ type: LOAD_SPECIAL_DATA_FAIL });
    });
}

export const clearSpecialAboutData = () => ({
    type: CLEAR_SPECIAL_ABOUT_DATA
})