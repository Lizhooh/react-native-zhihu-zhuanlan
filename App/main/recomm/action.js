import * as Api from '../api';

export const LOAD_RECOMM_DATA_SUCCESS = 'Load_Recomm_Data_Success';
export const LOAD_RECOMM_DATA_IN = 'Load_Recomm_Data_In';
export const LOAD_RECOMM_DATA_FAIL = 'Load_Recomm_Data_Fail';

// # 加载推荐数据
export const loadRecommData = (limit = 5, seed = 0) => (dispatch, getState) => {
    dispatch({ type: LOAD_RECOMM_DATA_IN });

    return Api.recommPosts(limit, seed).then(data => {
        dispatch({
            type: LOAD_RECOMM_DATA_SUCCESS,
            data: data,
            seed: Math.random() * 40 | 0,
        });

    }).catch(err => {
        dispatch({ type: LOAD_RECOMM_DATA_FAIL, status: true });

        setTimeout(_ => {
            dispatch({ type: LOAD_RECOMM_DATA_FAIL, status: false });
        }, 3000);
    });
}