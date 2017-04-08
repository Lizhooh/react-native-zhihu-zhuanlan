
import {
    LOAD_RECOMM_DATA_IN,
    LOAD_RECOMM_DATA_SUCCESS,
    LOAD_RECOMM_DATA_FAIL,
} from './action';

const INIT_STATE = {
    page: 0,
    data: [],
    limit: 30,
    loading: true,
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case LOAD_RECOMM_DATA_SUCCESS: return {
            ...state,
            data: action.data,
            loading: false,
            page: action.page,
        }

        case LOAD_RECOMM_DATA_IN: return {
            ...state,
            loading: true,
        }

        case LOAD_RECOMM_DATA_FAIL: return {
            ...state,
            loading: false,
        }

        default: return { ...state }
    }
}