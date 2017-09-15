import cheerio from 'cheerio-without-node-native';

// 搜狗搜索
export default searchSogo = async (key = '', page = 1) => {
    key = encodeURI(key);

    const html = await fetch(`http://www.sogou.com/sogou?query=site%3Azhuanlan.zhihu.com ${key}&page=${page}`, {
        headers: {
            cookie: 'com_sohu_websearch_ITEM_PER_PAGE=20',
            host: 'www.sogou.com',
        }
    }).then(res => res.text());

    const $ = cheerio.load(html + '');

    const count = $('.pt.zz_tit em').text().replace(/[^0-9]/g, '') ||
        $('.sr-num').text().replace(/[^0-9]/g, '');

    const data = $('.main .vrwrap').toArray().map((item, index) => {
        const $item = $(item);

        const href = $item.find('.vrTitle a').attr('href');
        if (href === undefined) return;

        const title = $item.find('.vrTitle a').text();
        const summary = $item.find('.str_info').text().replace(/\[图文\]|[\r\n]/igm, '');
        const image = $item.find('.str_div img').attr('src');
        const temp = href.substr(href.lastIndexOf('/') + 1).replace(/(.*?)\?.*/, '$1');
        let id = -1;
        let column = -1;
        let isArticle = false;

        if (isNaN(temp * 1) === false) {
            id = temp * 1;
            isArticle = true;
        }
        else {
            column = temp;
            isArticle = false;
        }

        return { id, slug: id === -1 ? column : id, column, href, title, summary, image, isArticle }
    }).filter(i => i !== undefined);


    return {
        count, data: data || [],
    }

}
