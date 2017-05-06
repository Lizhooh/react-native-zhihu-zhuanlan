import {
    loading_special_in,
    loading_special_success,
    loading_special_fail,
    loading_special_about_in,
    loading_special_about_success,
    loading_special_list_in,
    loading_special_list_success,
    loading_special_list_fail,
    clear_special_data,
} from './action';

const initstate = {
    name: '',
    aboutName: '',
    data: null,     // 专栏信息
    list: [],       // 专栏文章列表
    page: 1,        // 专栏文章列表页码
    listLoading: {  // 专栏文章列表加载状态
        status: false,
        msg: '',
    },
    limit: 8,
    startLoading: true,
    about: null,    // 关于信息
    loading: {      // 页面加载状态
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
                msg: '',
            },
        }

        case loading_special_about_success: return {
            ...state,
            loading: {
                status: false,
                msg: '加载成功',
            },
            about: action.about,
            aboutName: action.name,
        }

        case loading_special_list_success: return {
            ...state,
            list: [...state.list, ...action.list],
            page: action.page,
            listLoading: {
                ...state.listLoading,
                status: false,
                msg: action.msg,
            }
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

        case loading_special_list_in: return {
            ...state,
            listLoading: {
                ...state.listLoading,
                status: true,
                msg: '加载中',
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

        case loading_special_list_fail: return {
            ...state,
            listLoading: {
                ...state.listLoading,
                status: false,
                msg: '加载失败',
            }
        }

        default: return state;
    }
}