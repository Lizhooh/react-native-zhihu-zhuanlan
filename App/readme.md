
- app

    - main [主界面]
        - column [专栏相关]
        - stories [故事相关]
        - recomm [推荐相关]
        - user [用户相关]

        - article [文章相关]

    - reducers [总的 reducers 集合]
    - store [创建 store]


**store**

```js
const store = {

    // 推荐
    recomm: {

    },

    // 故事
    stories: {

    },

    // 文章
    acticle: {

    },

    // 专栏
    column: {

    },

    user: {
        // 喜欢
        like: {

        },

        // 收藏
        star: {

        },

        // 浏览
        look: {

        },

        // 关注
        follow: {

        },

        // 设置
        setting: {

        },
    },

    // 主题
    theme: {
        color: '#',
    },

    // 导航信息
    navigator: {

    },
};

```
