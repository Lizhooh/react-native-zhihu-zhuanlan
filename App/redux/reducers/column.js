import { COLUMN } from '../type';

const init_state = {
    name: '',
    tag: '',        // 专栏文章类型
    data: null,     // 专栏信息
    list: [],       // 专栏文章列表
    page: 0,        // 专栏文章列表页码
    limit: 10,
}

export default (state = init_state, action) => {
    switch (action.type) {

        case COLUMN.init_success: return {
            ...state,
            data: action.data,
            list: action.list,
            page: 1,
            name: action.name,
        }

        case COLUMN.more_success: return {
            ...state,
            list: [...state.list, ...action.list],
            page: state.page + 1,
        }

        case COLUMN.select_success: return {
            ...state,
            list: action.list,
            tag: action.tag,
            page: 1,
        }

        default: return state;
    }
}