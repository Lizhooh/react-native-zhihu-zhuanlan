import * as api from '../../api';

export const loading_column_success = 'loading_column_success';
export const loading_column_in      = 'loading_column_in';
export const loading_column_fail    = 'loading_column_fail';

// # 加载发现专栏数据
export const loadColumnData = (limit = 20, page = 0) => (dispatch, getstate) => {

    dispatch({ type: loading_column_in });

    return api.columns(limit, page).then(data => {
        dispatch({
            type: loading_column_success,
            data: data,
            page: page + 1,
        });

    }).catch(err => {
        dispatch({ type: loading_column_fail, status: true });

        setTimeout(_ => {
            dispatch({ type: loading_column_fail, status: false });
        }, 3000);
    });
}