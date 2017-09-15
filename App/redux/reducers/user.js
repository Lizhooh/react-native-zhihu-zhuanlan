import { USER } from '../type';

const init_state = {
    options: [
        {
            id: 0,
            name: "stars",
            title: "收藏的文章",
            text: " 篇",
            color: "#3c3"
        },
        {
            id: 1,
            name: "loyalty",
            title: "关注的专栏",
            text: " 个",
            color: "#fa4"
        },
        {
            id: 2,
            name: "remove-red-eye",
            title: "阅读过的文章",
            text: " 篇",
            color: "#3be"
        },
        {
            id: 3,
            name: "settings",
            title: "设置",
            text: null,
            color: "#bbb"
        },
        {
            id: 4,
            name: "face",
            title: "关于",
            text: null,
            color: "#bbb"
        }
    ],
    data: {
        "0": [],
        "1": [],
        "2": [],
    }
}

export default (state = init_state, action) => {
    // console.log(action);
    switch (action.type) {

        case USER.init_success: return {
            ...state,
            data: action.data,
        }

        case USER.refresh_success: return {
            ...state,
            data: {
                ...state.data,
                [action.id]: action.list,
            },
        }

        default: return state;
    }
}