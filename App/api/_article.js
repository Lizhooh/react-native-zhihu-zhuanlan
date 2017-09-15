import setAvatarImage from './common';
import { get } from './http';

// # 文章

// async: 异步函数
export default article = async (id) => {
    if (id === undefined) throw new Error("id is empty.");

    // 文章信息
    const d1 = get(`/posts/${id}`)
        .then(res => {
            res.author.avatar = setAvatarImage(res.author.avatar);
            res.content = res.content.replace(/\n/gim, '<br />');
            return res;
        });

    // 投稿信息，没有时，输出 undefined
    const d2 = get(`/posts/${id}/contributed`)
        .then(result => result[0]);

    // 推荐信息
    const d3 = get(`/recommendations/posts?limit=2&seed=${Math.random() * 100 | 0}&offset=${Math.random() * 100 | 0}`)
        .then(res => res.map(i => {
            i.author.avatar = setAvatarImage(i.author.avatar);
            return i;
        }));

    return Promise.all([d1, d2, d3]);
}
