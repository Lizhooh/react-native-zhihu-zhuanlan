
export const LOAD_RECOMM_DATA_SUCCESS = 'Load_Recomm_Data_Success';
export const LOAD_RECOMM_DATA_IN = 'Load_Recomm_Data_In';
export const LOAD_RECOMM_DATA_FAIL = 'Load_Recomm_Data_Fail';

export const loadRecommData = (limit = 5, page = 0) => (dispatch, getState) => {
    dispatch({ type: LOAD_RECOMM_DATA_IN });

    const url = `https://zhuanlan.zhihu.com/api/recommendations/posts?limit=${limit}&seed=${page}`;
    return fetch(url).then(res => res.json()).then(result => {
        const data = result.map(i => ({ ...i, key: i.id }));

        dispatch({
            type: LOAD_RECOMM_DATA_SUCCESS,
            data: data,
            page: Math.random() * 40 | 0,
        })
    }).catch(err => {
        dispatch({ type: LOAD_RECOMM_DATA_FAIL });
    });
}