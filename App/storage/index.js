import storage from './storage';


// 存储阅读过的文章
export const article_look = {
    key: 'article_look',
    async add(data) {
        let list = await storage.get(this.key);
        list = list.filter(i => i !== data.id);
        // 前入栈
        list.unshift(data);
        storage.set(this.key, list);
        return list;
    },
    async get() {
        return storage.get(this.key);
    },
    async removeAll() {
        storage.remove(this.key);
        return [];
    },
};

// 储存关注的专栏
export const follow_column = {
    key: 'follow_column',
    async add(data) {
        let list = await storage.get(this.key);
        const index = list.findIndex(i => i.id === data.id);
        if (index !== -1) {
            list.push(data);
            storage.set(this.key, list);
        }
    },
    async get() {
        return await storage.get(this.key);
    },
    async remove(data) {
        let list = await storage.get(this.key);
        list = list.filter(i => i.id !== data.id);
        storage.set(this.key, list);
        return list;
    },
}


