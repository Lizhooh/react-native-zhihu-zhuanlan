import {
    LOAD_SEARCH_DATA_IN,
    LOAD_SEARCH_DATA_SUCCESS,
    LOAD_SEARCH_DATA_FAIL,
    LOAD_MORE_SEARCH_DATA_SUCCESS
} from './action';

const INIT_STATE = {
    page: 0,
    data: [],
    keys: '',
    count: '',
    loading: {
        status: false,
        msg: '',
    },
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case LOAD_SEARCH_DATA_SUCCESS: return {
            ...state,
            loading: {
                ...state.loading,
                msg: action.msg || '加载成功...',
                status: false,
            },
            data: action.data,
            count: action.count,
            keys: action.keys,
            page: action.page,
        }

        case LOAD_MORE_SEARCH_DATA_SUCCESS: return {
            ...state,
            data: [...state.data, ...action.data],
            loading: {
                ...state.loading,
                msg: action.msg || '加载成功...',
                status: false,
            },
            keys: action.keys,
            page: action.page,
        }

        case LOAD_SEARCH_DATA_IN: return {
            ...state,
            loading: {
                status: true,
                msg: action.msg || '加载中...',
            },
        }

        case LOAD_SEARCH_DATA_FAIL: return {
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