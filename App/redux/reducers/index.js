
const root_init_state = {}

export default (state = root_init_state, action) => {
    switch (action.type) {
        default: return state;
    }
}

// 总集合 reducers
export { default as stories } from './stories';
export { default as article } from './article';
export { default as article_comment } from './article-comment';
export { default as search } from './search';
export { default as column } from './column';
export { default as special } from './special';
export { default as user } from './user';

