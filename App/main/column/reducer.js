import {
    loading_column_in,
    loading_column_success,
    loading_column_fail,
} from './action';

const init_state = {
    page: 0,
    data: [],
    limit: 30,
    loading: {
        status: false,
        msg: '',
    },
};

export default (state = init_state, action) => {
    switch (action.type) {

        case loading_column_success: return {
            ...state,
            data: action.data,
            loading: {
                ...state.loading,
                msg: '加载成功...',
                status: false,
            },
            page: action.page,
        }

        case loading_column_in: return {
            ...state,
            loading: {
                status: true,
                msg: '加载中...',
            },
        }

        case loading_column_fail: return {
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