import { SPECIAL } from '../type';

const init_state = {
    list: [],
    limit: 20,
    page: 0,
}

export default (state = init_state, action) => {

    switch (action.type) {

        case SPECIAL.init_success: return {
            ...state,
            list: action.list,
            page: 1,
        }

        case SPECIAL.more_success: return {
            ...state,
            list: [...state.list, ...action.list],
            page: state.page + 1,
        }

        default: return state;
    }
}
