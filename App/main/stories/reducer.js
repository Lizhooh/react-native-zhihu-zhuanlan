import {
    LOAD_STORIES_DATA_IN,
    LOAD_STORIES_DATA_SUCCESS,
    LOAD_STORIES_DATA_FAIL,
} from './action';

const INIT_STATE = {
    page: 0,
    data: [],
    limit: 40,
    loading: {
        status: false,
        msg: '',
    },
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case LOAD_STORIES_DATA_SUCCESS: return {
            ...state,
            data: action.data,
            loading: {
                ...state.loading,
                msg: '加载成功...',
                status: false,
            },
            page: action.page,
        }

        case LOAD_STORIES_DATA_IN: return {
            ...state,
            loading: {
                status: true,
                msg: '加载中...',
            },
        }

        case LOAD_STORIES_DATA_FAIL: return {
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