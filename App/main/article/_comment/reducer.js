import {
    LOAD_COMMENT_DATA_IN,
    LOAD_COMMENT_DATA_SUCCESS,
    LOAD_COMMENT_DATA_FAIL,
} from './action';

const INITSTATE = {
    data: null,
    id: 0,
    loading: false,
    page: 0,
    state: false,
    msg: '',
    limit: 30,
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

        case LOAD_COMMENT_DATA_IN: return {
            ...state,
            loading: true,
            msg: '加载中',
        }

        case LOAD_COMMENT_DATA_FAIL: return {
            ...state,
            loading: false,
            msg: '加载失败',
        }

        default: return state;
    }
}