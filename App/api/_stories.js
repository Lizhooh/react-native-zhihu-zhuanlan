import { get } from './http'

let seed = 0;
// # 发现 · 文章
export default storiess = async (limit = 1, page = 0) => {
    seed = Math.random() * 120 | 0;
    const url = `/recommendations/posts?limit=${limit}&offset=${limit * page}&seed=${seed}`;
    return get(url);
}