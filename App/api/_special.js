import setAvatarImage from './common';
import { get } from './http';

let seed = 0;
// # 发现 · 专栏
export default columns = async (limit = 0, page = 0) => {
    seed = Math.random() * 120 | 0;
    const url = `/recommendations/columns?limit=${limit}&offset=${limit * page}&seed=${seed}`;

    return get(url).then(res => {
        return res.map((i, index) => ({
            ...i,
            avatar: setAvatarImage(i.avatar)
        }));
    });
}