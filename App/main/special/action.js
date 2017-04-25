import * as api from '../../api';

// 加载专栏信息
export const loading_special_success = 'loading_special_success';
export const loading_special_in = 'loading_special_in';
export const loading_special_fail = 'loading_special_fail';
export const clear_special_data = 'clear_special_data';

// 加载关于
export const loading_special_about_in = 'loading_special_about_in';
export const loading_special_about_success = 'loading_special_about_success';

// 加载专栏信息
export const loadSpecialData = (name) => (dispatch, getstate) => {
    const state = getstate();
    dispatch({ type: loading_special_in });

    Promise.all([
        api.special.column(name),
        api.special.list(name, state.limit, 0),
    ]).then(resarray => {
        dispatch({
            type: loading_special_success,
            data: resarray[0],
            list: resarray[1],
            name: name,
        });
    }).catch(err => {
        dispatch({ type: loading_special_fail });
    });
}

export const clearSpecialData = () => ({
    type: clear_special_data
})

// 加载关于
export const loadSpecialAbloutData = (name) => (dispatch, getstate) => {
    if (name === getstate().special.aboutName) return;

    dispatch({ type: loading_special_about_in });

    return api.special.about(name).then(result => {
        dispatch({
            type: loading_special_about_success,
            about: {
                data: result[0],
                authors: result[1],
            },
            name: name,
        })
    }).catch(err => {
        dispatch({ type: loading_special_fail });
    });
}
