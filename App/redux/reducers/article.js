import { ARTICLE } from '../type';


const init_state = {
    id: 0,
    data: null,
    contributed: null,      // 投稿信息
    recomm: null,           // 推荐
    column: null,
};


export default (state = init_state, action) => {
    switch (action.type) {

        case ARTICLE.init_success: return {
            ...state,
            data: action.data,
            contributed: action.contributed,
            recomm: action.recomm,
            id: action.id,
        }

        default: return state;
    }
}