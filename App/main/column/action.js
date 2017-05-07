import * as api from '../../api';

export const loading_column_success = 'loading_column_success';
export const loading_column_in      = 'loading_column_in';
export const loading_column_fail    = 'loading_column_fail';

// # 加载发现专栏数据
export const loadColumn = (limit = 20, page = 0, init = false) => (dispatch, getstate) => {

    dispatch({ type: loading_column_in });

    return api.columns(limit, page).then(res => {
        dispatch({
            type: loading_column_success,
            data: res,
            page: page + 1,
            init: init,
        });

    }).catch(err => {
        dispatch({ type: loading_column_fail, status: true });

        setTimeout(_ => {
            dispatch({ type: loading_column_fail, status: false });
        }, 3000);
    });
}