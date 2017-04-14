import * as Api from '../../api';

export const LOAD_SPECIAL_DATA_SUCCESS = 'LOAD_SPECIAL_DATA_SUCCESS';
export const LOAD_SPECIAL_DATA_IN = 'LOAD_SPECIAL_DATA_IN';
export const LOAD_SPECIAL_DATA_FAIL = 'LOAD_SPECIAL_DATA_FAIL';
export const CLEAR_SPECIAL_DATA = 'CLEAR_SPECIAL_DATA';

export const loadSpecialData = (name) => (dispatch, getState) => {
    dispatch({ type: LOAD_SPECIAL_DATA_IN });

    Promise.all([
        Api.special.column(name),
        Api.special.list(10, 0),
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