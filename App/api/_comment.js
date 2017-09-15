import setAvatarImage from './common';
import { get } from './http';

// # 文章评论

// https://zhuanlan.zhihu.com/api/posts/25309182/comments?limit=10&offset=0
export default comments = (id, limit = 15, page = 0) => {
    const url = `/posts/${id}/comments?limit=${limit}&offset=${page * limit}`;

    return get(url).then(res => res.map(i => ({
        ...i,
        author: {
            ...i.author,
            avatar: setAvatarImage(i.author.avatar),
        },
        inReplyToUser: i.inReplyToUser && {
            ...i.inReplyToUser,
            avatar: setAvatarImage(i.inReplyToUser.avatar, 'xs'),
        }
    })))
}