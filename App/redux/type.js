
/** 扩展状态类型 */
const extendState = (obj) => {
    Object.keys(obj).forEach(key => {
        // obj[key + '_in'] = obj[key] + '_in';                // 进行中
        obj[key + '_fail'] = obj[key] + '_fail';            // 失败了
        obj[key + '_success'] = obj[key] + '_success';      // 成功了
        // obj[key + '_complete'] = obj[key] + '_complete';    // 完成了
    });
    return obj;
}

// 文章·发现
export const STORIES = extendState({
    init: 'STORIES_init',
    more: 'STORIES_more',
    refresh: 'STORIES_refresh',
});

// 文章
export const ARTICLE = extendState({
    init: 'ARTICLE_init',
    more: 'ARTICLE_more',
    refresh: 'ARTICLE_refresh',
});

// 文章评论
export const ARTICLE_COMMENT = extendState({
    init: 'ARTICLE_COMMENT_init',
    more: 'ARTICLE_COMMENT_more',
});

// 搜索
export const SEARCH = extendState({
    init: 'SEARCH_init',
    more: 'SEARCH_more',
});

// 发现·专栏
export const SPECIAL = extendState({
    init: 'SPECIAL_init',
    more: 'SPECIAL_more',
});

// 专栏
export const COLUMN = extendState({
    init: 'COLUMN_init',
    select: 'COLUMN_select',
    more: 'COLUMN_more',
});

// 用户
export const USER = extendState({
    init: 'USER_init',
    refresh: 'USER_refresh',
});