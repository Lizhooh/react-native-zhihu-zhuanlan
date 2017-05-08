import {
    loading_search_in,
    loading_search_success,
    loading_search_fail,
    loading_more_search_success
} from './action';

const init_state = {
    page: 0,
    data: [],
    keys: '',
    count: '',
    loading: {
        status: false,
        msg: '',
    },
};

export default (state = init_state, action) => {
    switch (action.type) {

        // # 初始化 和 加载更多
        case loading_search_success: return {
            ...state,
            loading: {
                ...state.loading,
                msg: action.msg || '加载成功...',
                status: false,
            },
            // init = true, 初始化或刷新
            data: action.init ? action.data : [...state.data, ...action.data],
            count: action.count,
            keys: action.keys,
            page: action.page,
        }

        case loading_search_in: return {
            ...state,
            loading: {
                status: true,
                msg: action.msg || '加载中...',
            },
        }

        case loading_search_fail: return {
            ...state,
            loading: {
                ...state.loading,
                msg: action.msg || '加载失败...',
                status: action.status,
            },
        }

        default: return state
    }
}