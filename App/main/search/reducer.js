import {
    LOAD_SEARCH_DATA_IN,
    LOAD_SEARCH_DATA_SUCCESS,
    LOAD_SEARCH_DATA_FAIL,
} from './action';

const INIT_STATE = {
    page: 0,
    data: [],
    keys: '',
    limit: 30,
    loading: {
        status: false,
        msg: '',
    },
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case LOAD_SEARCH_DATA_SUCCESS: return {
            ...state,
            data: action.data,
            loading: {
                ...state.loading,
                msg: '加载成功...',
                status: false,
            },
            page: action.page,
        }

        case LOAD_SEARCH_DATA_IN: return {
            ...state,
            loading: {
                status: true,
                msg: '加载中...',
            },
        }

        case LOAD_SEARCH_DATA_FAIL: return {
            ...state,
            loading: {
                ...state.loading,
                msg: '加载失败...',
                status: action.status,
            },
        }

        default: return { ...state }
    }
}