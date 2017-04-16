import {
    LOAD_ARTICLE_DATA_IN,
    LOAD_ARTICLE_DATA_SUCCESS,
    LOAD_ARTICLE_DATA_FAIL,
    CLEAR_ARTICLE_DATA,
} from './action';

const INITSTATE = {
    id: 0,
    data: null,             // 文章信息
    contributed: null,      // 投稿信息
    startLoading: true,
    loading: {
        status: false,
        msg: '',
    },
}

export default (state = INITSTATE, action) => {

    switch (action.type) {

        case LOAD_ARTICLE_DATA_SUCCESS: return {
            ...state,
            data: action.data,
            id: action.id,
            contributed: action.contributed,
            startLoading: false,
            loading: {
                status: false,
                msg: '加载完成',
            },
        }

        case LOAD_ARTICLE_DATA_IN: return {
            ...state,
            loading: {
                ...state.loading,
                status: true,
            }
        }

        case LOAD_ARTICLE_DATA_FAIL: return {
            ...state,
            loading: {
                ...state.loading,
                status: false,
                msg: '加载失败，请稍后刷新'
            }
        }

        case CLEAR_ARTICLE_DATA: return {
            ...state,
            ...INITSTATE,
        }

        default: return { ...state };
    }
}