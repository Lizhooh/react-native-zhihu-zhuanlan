import {
    LOAD_SPECIAL_DATA_IN,
    LOAD_SPECIAL_DATA_SUCCESS,
    LOAD_SPECIAL_DATA_FAIL,
    LOAD_SPECIAL_ABOUT_DATA_IN,
    LOAD_SPECIAL_ABOUT_DATA_SUCCESS,
    CLEAR_SPECIAL_DATA,
    CLEAR_SPECIAL_ABOUT_DATA,
} from './action';

const INITSTATE = {
    name: 0,
    aboutName: 0,
    data: null,     // 专栏信息
    list: [],       // 专栏文章列表
    limit: 8,
    startLoading: true,
    about: null,    // 关于信息
    loading: {
        status: false,
        msg: '',
    },
}

export default (state = INITSTATE, action) => {

    switch (action.type) {

        case LOAD_SPECIAL_DATA_SUCCESS: return {
            ...state,
            data: action.data,
            name: action.name,
            list: action.list,
            startLoading: false,
            loading: {
                status: false,
                msg: '加载完成',
            },
        }

        case LOAD_SPECIAL_ABOUT_DATA_SUCCESS: return {
            ...state,
            loading: {
                status: false,
                msg: '加载完成',
            },
            about: action.about,
            aboutName: action.name,
        }

        case LOAD_SPECIAL_DATA_IN: return {
            ...state,
            aboutName: 0,
            loading: {
                ...state.loading,
                status: true,
            }
        }

        case LOAD_SPECIAL_ABOUT_DATA_IN: return {
            ...state,
            loading: {
                ...state.loading,
                status: true,
            }
        }

        case LOAD_SPECIAL_DATA_FAIL: return {
            ...state,
            loading: {
                ...state.loading,
                status: false,
                msg: '加载失败，请稍后刷新'
            }
        }

        case CLEAR_SPECIAL_DATA: return {
            ...state,
            ...INITSTATE,
        }

        case CLEAR_SPECIAL_ABOUT_DATA: return {
            ...state,
            about: null,
        }

        default: return { ...state };
    }
}