import { USER } from '../type';

const init_state = {
    options: [
        {
            "name": "stars",
            "title": "收藏的文章",
            "text": " 篇",
            "number": 0,
            "color": "#3c3"
        },
        {
            "name": "loyalty",
            "title": "关注的专栏",
            "text": " 个",
            "number": 0,
            "color": "#fa4"
        },
        {
            "name": "remove-red-eye",
            "title": "阅读过的文章",
            "text": " 篇",
            "number": 0,
            "color": "#3be"
        },
        {
            "name": "settings",
            "title": "设置",
            "text": null,
            "color": "#bbb"
        },
        {
            "name": "face",
            "title": "关于",
            "text": null,
            "color": "#bbb"
        }
    ]
}

export default (state = init_state, action) => {
    switch (action.type) {

        default: return state;
    }
}