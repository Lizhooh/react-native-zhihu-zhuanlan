import * as Api from '../api';

export const LOAD_COLUMN_DATA_SUCCESS = 'LOAD_COLUMN_DATA_SUCCESS';
export const LOAD_COLUMN_DATA_IN      = 'LOAD_COLUMN_DATA_IN';
export const LOAD_COLUMN_DATA_FAIL    = 'LOAD_COLUMN_DATA_FAIL';

// # 加载发现专栏数据
export const loadColumnData = (limit = 20, page = 0) => (dispatch, getState) => {

    dispatch({ type: LOAD_COLUMN_DATA_IN });

    return Api.columns(limit, page).then(data => {
        dispatch({
            type: LOAD_COLUMN_DATA_SUCCESS,
            data: data,
            page: page + 1,
        });

    }).catch(err => {
        dispatch({ type: LOAD_COLUMN_DATA_FAIL, status: true });

        setTimeout(_ => {
            dispatch({ type: LOAD_COLUMN_DATA_FAIL, status: false });
        }, 3000);
    });
}