import {
    LOAD_RECOMM_DATA_IN,
    LOAD_RECOMM_DATA_SUCCESS,
    LOAD_RECOMM_DATA_FAIL,
} from './action';

const INIT_STATE = {
    seed: 0,
    data: [],
    limit: 30,
    loading: {
        status: true,
        msg: '加载中...',
    },
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case LOAD_RECOMM_DATA_SUCCESS: return {
            ...state,
            data: action.data,
            loading: {
                ...state.loading,
                msg: '加载成功...',
                status: false,
            },
            seed: action.seed,
        }

        case LOAD_RECOMM_DATA_IN: return {
            ...state,
            loading: {
                status: true,
                msg: '加载中...',
            },
        }

        case LOAD_RECOMM_DATA_FAIL: return {
            ...state,
            loading: {
                ...state.loading,
                msg: '加载失败...',
                status: action.status,
            },
        }

        default: return { ...state }
    }
}