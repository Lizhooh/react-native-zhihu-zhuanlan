import {
    loading_stories_in,
    loading_stories_success,
    loading_stories_fail,
} from './action';

const init_state = {
    page: 0,
    data: [],
    limit: 10,
    loading: {
        status: false,
        msg: '',
    },
};

export default (state = init_state, action) => {
    switch (action.type) {

        case loading_stories_success: return {
            ...state,
            // init = true, 初始化或刷新
            data: action.init ? action.data : [...state.data, ...action.data],
            loading: {
                ...state.loading,
                msg: '加载成功...',
                status: false,
            },
            page: action.page,
        }

        case loading_stories_in: return {
            ...state,
            loading: {
                status: true,
                msg: '加载中...',
            },
        }

        case loading_stories_fail: return {
            ...state,
            loading: {
                ...state.loading,
                msg: '加载失败...',
                status: action.status,
            },
        }

        default: return state
    }
}