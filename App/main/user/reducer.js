
import {
    init_user,
    user_clear_all_look,
} from './action';

import {
    user_add_look,
} from '../article/action';

const state_init = {
    looks: [],
};

export default (state = state_init, action) => {

    switch(action.type) {

        case user_add_look: return {
            ...state,
            looks: action.data,
        }

        case init_user: return {
            ...state,
            looks: action.data,
        }

        case user_clear_all_look: return {
            ...state,
            looks: action.data,
        }

        default: return state;
    }
}