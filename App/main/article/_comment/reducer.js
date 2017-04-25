import {
    loading_comment_in,
    loading_comment_success,
    loading_comment_fail,

    loading_more_comment_success,
    loading_more_comment_in,
    loading_more_comment_fail,
} from './action';

const initstate = {
    data: null,
    id: 0,
    page: 0,
    state: false,
    loading: false,
    loadingMore: false,
    msg: '',
    limit: 10,
}

export default (state = initstate, action) => {

    switch (action.type) {

        case loading_comment_success: return {
            ...state,
            loading: false,
            data: action.data,
            id: action.id,
            page: action.page,
            msg: action.data.length < state.limit ? '没有更多了' : '',
        }

        case loading_more_comment_success: return {
            ...state,
            loadingMore: false,
            data: [...state.data, ...action.data],
            page: state.page + 1,
            msg: action.data.length < state.limit ? '没有更多了' : '',
        }

        case loading_comment_in: return {
            ...state,
            loading: true,
        }

        case loading_more_comment_in: return {
            ...state,
            loadingMore: true,
            msg: '加载中',
        }

        case loading_comment_fail: return {
            ...state,
            loading: false,
            msg: '加载失败',
        }

        case loading_more_comment_fail: return {
            ...state,
            loadingMore: false,
            msg: '加载失败',
        }

        default: return state;
    }
}
