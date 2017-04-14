
// 总集合 reducers
export { default as search } from './main/search/reducer';
export { default as stories } from './main/stories/reducer';
export { default as column } from './main/column/reducer';
export { default as article } from './main/article/reducer';
export { default as special } from './main/special/reducer';


// ----------------------------------------------------------//
import { INIT_ROUTER, UPDATE_ROUTER } from './action';

const INITSTATE = {
    component: null,
    navigator: null,
    router: null,
    count: 0,
    data: null,
    tab: 1,
};

export const navigator = (state = INITSTATE, action) => {

    switch (action.type) {

        case INIT_ROUTER:
        case UPDATE_ROUTER: return {
            ...state,
            component: action.component,
            navigator: action.navigator,
            router: action.router,
            count: action.count,
            data: action.data,
        }

        default: return { ...state }
    }
}