// # 推荐
const host = `https://zhuanlan.zhihu.com/api`;

export default recomms = async (limit = 1, seed = 0) => {
    const url = `${host}/recommendations/posts?limit=${limit}&seed=${seed}`;

    return fetch(url).then(res => res.json()).then(result => {
        return result.map(i => ({ ...i, key: i.id }));
    });
}
