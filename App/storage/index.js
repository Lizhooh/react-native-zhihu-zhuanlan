import storage from './storage';

/**
 * 储存关注的专栏
 * data = {
 *    id, title, intro, follow, avatar,
 * }
 */
export const followColumn = {
    key: 'follow_column',
    async add(data) {
        let list = await storage.get(this.key);
        if (list && Array.isArray(list)) {
            list = list.filter(i => i.id !== data.id); // 去重复
            list.push(data);
            storage.set(this.key, list);
        }
        else {  // 初始没有数据
            list = [];
            list.push(data);
            storage.set(this.key, list);
        }
        return list || [];
    },
    async get() {
        return await storage.get(this.key) || [];
    },
    async remove(data) {
        let list = await storage.get(this.key);
        list = list.filter(i => i.id !== data.id);
        storage.set(this.key, list);
        return list;
    },
    async removeAll() {
        return storage.remove(this.key);
    }
}

/**
 * 收藏的文章
 * data = {
 *    id, avatar, title, summary, titleImage
 * }
 */
export const starArticle = {
    key: 'star_article',
    async add(data) {
        let list = await storage.get(this.key);
        if (list && Array.isArray(list)) {
            list = list.filter(i => i.slug !== data.slug); // 去重复
            list.unshift(data);
            storage.set(this.key, list);
        }
        else {  // 初始没有数据
            list = [];
            list.push(data);
            storage.set(this.key, list);
        }
        return list || [];
    },
    async get() {
        return await storage.get(this.key) || [];
    },
    async remove(id) {
        let list = await storage.get(this.key);
        list = list.filter(i => i.id !== id);
        storage.set(this.key, list);
        return list;
    },
    async removeAll() {
        return storage.remove(this.key);
    }
}

/**
 * 阅读过的文章
 * data = {
 *    id, avatar, title, summary, titleImage
 * }
 */
export const lookArticle = {
    key: 'look_article',
    async add(data) {
        let list = await storage.get(this.key);
        if (list && Array.isArray(list)) {
            list = list.filter(i => i.slug !== data.slug); // 去重复
            list.unshift(data);
            storage.set(this.key, list);
        }
        else {  // 初始没有数据
            list = [];
            list.push(data);
            storage.set(this.key, list);
        }
        return list || [];
    },
    async get() {
        return await storage.get(this.key) || [];
    },
    async remove(id) {
        let list = await storage.get(this.key);
        list = list.filter(i => i.id !== id);
        storage.set(this.key, list);
        return list;
    },
    async removeAll() {
        return storage.remove(this.key);
    }
}

