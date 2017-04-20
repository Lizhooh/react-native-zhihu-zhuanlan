import {
    LOAD_COMMENT_DATA_IN,
    LOAD_COMMENT_DATA_SUCCESS,
    LOAD_COMMENT_DATA_FAIL,

    LOAD_MORE_COMMENT_DATA_SUCCESS,
    LOAD_MORE_COMMENT_DATA_IN,
    LOAD_MORE_COMMENT_DATA_FAIL,
} from './action';

const INITSTATE = {
    data: null,
    id: 0,
    page: 0,
    state: false,
    loading: false,
    loadingMore: false,
    msg: '',
    limit: 20,
}

export default (state = INITSTATE, action) => {

    switch (action.type) {

        case LOAD_COMMENT_DATA_SUCCESS: return {
            ...state,
            loading: false,
            data: action.data,
            id: action.id,
            page: action.page,
            msg: action.data.length < state.limit ? '没有更多了' : '',
        }

        case LOAD_MORE_COMMENT_DATA_SUCCESS: return {
            ...state,
            loadingMore: false,
            data: [...state.data, ...action.data],
            page: state.page + 1,
            msg: action.data.length < state.limit ? '没有更多了' : '',
        }

        case LOAD_COMMENT_DATA_IN: return {
            ...state,
            loading: true,
        }

        case LOAD_MORE_COMMENT_DATA_IN: return {
            ...state,
            loadingMore: true,
            msg: '加载中',
        }

        case LOAD_COMMENT_DATA_FAIL: return {
            ...state,
            loading: false,
            msg: '加载失败',
        }

        case LOAD_MORE_COMMENT_DATA_FAIL: return {
            ...state,
            loadingMore: false,
            msg: '加载失败',
        }

        default: return state;
    }
}
