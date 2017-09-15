import setAvatarImage from './common';
import { get } from './http';

// # 专栏信息
export default Column = {

    // 专栏信息
    column: async (name) => get(`/columns/${name}`)
        .then(res => {
            res.avatar = setAvatarImage(res.avatar);
            return res;
        }),

    // 专栏的文章列表
    list: async (name, limit = 10, page = 0, topic = '') => {
        let url = `/columns/${name}/posts?limit=${limit}&offset=${page * limit}`;
        topic !== '' && (url += `&topic=${encodeURI(topic)}`);

        return get(url)
            .then(res => res.map(i => ({
                ...i,
                author: {
                    ...i.author,
                    avatar: setAvatarImage(i.author.avatar),
                },
                minContent: i.content.substr(0, 300).replace(/<[^>]+>/gi, '').substr(0, 100),
            })));
    },

    // 专栏的关于
    about: async (name) => {
        return Promise.all([
            Column.column(name),
            get(`/columns/${name}/authors`)
                .then(res => res.map(i => ({
                    ...i,
                    avatar: setAvatarImage(i.avatar)
                })))
        ]);
    }
};
