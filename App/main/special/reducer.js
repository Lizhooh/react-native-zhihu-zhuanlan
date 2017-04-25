import {
    loading_special_in,
    loading_special_success,
    loading_special_fail,
    loading_special_about_in,
    loading_special_about_success,
    clear_special_data,
} from './action';

const initstate = {
    name: '',
    aboutName: '',
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

export default (state = initstate, action) => {

    switch (action.type) {

        case loading_special_success: return {
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

        case loading_special_about_success: return {
            ...state,
            loading: {
                status: false,
                msg: '加载完成',
            },
            about: action.about,
            aboutName: action.name,
        }

        case loading_special_in: return {
            ...state,
            aboutName: 0,
            loading: {
                ...state.loading,
                status: true,
            }
        }

        case loading_special_about_in: return {
            ...state,
            loading: {
                ...state.loading,
                status: true,
            }
        }

        case loading_special_fail: return {
            ...state,
            loading: {
                ...state.loading,
                status: false,
                msg: '加载失败，请稍后刷新'
            }
        }

        case clear_special_data: return {
            ...state,
            ...initstate,
        }

        default: return state;
    }
}