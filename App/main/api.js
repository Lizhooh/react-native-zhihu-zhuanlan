
export const recommPosts = (limit, seed) => {
    const url = `https://zhuanlan.zhihu.com/api/recommendations/posts?limit=${limit}&seed=${seed}`;
    return fetch(url).then(res => res.json()).then(result => {
        return result.map(i => ({ ...i, key: i.id }));
    });
}

