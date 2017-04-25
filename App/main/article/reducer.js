import {
    loading_article_in,
    loading_article_success,
    loading_article_fail,
    clear_article_data,
} from './action';

const initstate = {
    // id: 0,
    // data: null,             // 文章信息
    // contributed: null,      // 投稿信息
    // recomm: null,           // 推荐
    stack: [],                 // 文章存放的栈
    loading: {
        status: true,
        msg: '加载中',
    },
}

export default (state = initstate, action) => {

    switch (action.type) {

        case loading_article_success: return {
            ...state,
            // 入栈
            stack: [
                ...state.stack,
                {
                    data: action.data,
                    id: action.id,
                    contributed: action.contributed,
                    recomm: action.recomm,
                }
            ],
            loading: {
                status: false,
                msg: '加载完成',
            },
        }

        case loading_article_in: return {
            ...state,
            loading: {
                ...state.loading,
                status: true,
            }
        }

        case loading_article_fail: return {
            ...state,
            loading: {
                ...state.loading,
                status: false,
                msg: '加载失败，请稍后刷新'
            },
        }

        case clear_article_data: return {
            ...state,
            loading: {
                status: true,
                msg: '加载中',
            },
            // 出栈
            stack: state.stack.splice(0, state.stack.length - 1),
        }

        default: return state;
    }
}