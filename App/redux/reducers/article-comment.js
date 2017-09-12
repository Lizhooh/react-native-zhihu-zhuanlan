import { ARTICLE_COMMENT } from '../type';

const init_state = {
    data: [],
    id: 0,
    page: 0,
    limit: 12,
};

export default (state = init_state, action) => {
    switch (action.type) {

        case ARTICLE_COMMENT.init_success: return {
            ...state,
            data: action.data,
            id: action.id,
            page: 1,
        }

        case ARTICLE_COMMENT.more_success: return {
            ...state,
            data: [...state.data, ...action.data],
            page: state.page + 1,
        }

        default: return state;
    }
}