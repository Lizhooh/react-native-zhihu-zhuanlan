import { SEARCH } from '../type';
import { splitNumber } from '../../functions';

const init_state = {
    page: 1,
    list: [],
    key: '',
    count: '',
};

export default (state = init_state, action) => {
    switch (action.type) {

        case SEARCH.init_success: return {
            ...state,
            list: action.list,
            count: splitNumber(action.count),
            key: action.key,
            page: 2,
        }

        case SEARCH.more_success: return {
            ...state,
            list: [...state.list, ...action.list],
            page: state.page + 1,
        }

        default: return state;
    }
}