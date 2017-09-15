import { STORIES } from '../type';

const init_state = {
    page: 0,
    list: [],
    limit: 15,
};

export default (state = init_state, action) => {
    switch (action.type) {

        case STORIES.init_success: return {
            ...state,
            list: action.list,
            page: 1,
        }

        case STORIES.more_success: return {
            ...state,
            list: [...state.list, ...action.list],
            page: state.page + 1,
        }

        default: return state
    }
}

