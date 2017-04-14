import {
    LOAD_SPECIAL_DATA_IN,
    LOAD_SPECIAL_DATA_SUCCESS,
    LOAD_SPECIAL_DATA_FAIL,
    CLEAR_SPECIAL_DATA,
} from './action';

const INITSTATE = {
    name: 0,
    data: null,     // 专栏信息
    list: [],       // 专栏文章列表
    startLoading: true,
    loading: {
        status: false,
        msg: '',
    },
}

export default (state = INITSTATE, action) => {

    switch (action.type) {

        case LOAD_SPECIAL_DATA_SUCCESS: return {
            ...LOAD_SPECIAL_DATA_FAIL,
            data: action.data,
            name: action.name,
            startLoading: false,
            loading: {
                status: false,
                msg: '加载完成',
            },
        }

        case LOAD_SPECIAL_DATA_IN: return {
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

        case CLEAR_SPECIAL_DATA: return {
            ...INITSTATE,
        }

        default: return { ...state };
    }
}