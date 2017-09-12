
// 格式化数字： 123456789 => 123,456,789
export function splitNumber(num) {
    let str = '';
    for (let i = num.length - 1, j = 0; i >= 0; i-- , j++) {
        if (j % 3 === 0 && j > 0) str += ',';
        str += num[i];
    }
    return str.split('').reverse();
}

// 数组扩展
Array.prototype.last = function () {
    return this[this.length - 1];
}

Array.prototype.first = function () {
    return this[0];
}

Array.prototype.empty = function () {
    return !!(this.length === 0);
}


// 计算时间差
export function fromNow(time) {
    if (time === undefined) {
        return '';
    }
    // 2017-08-30T03:28:11.446Z
    const _time = new Date(time).getTime();
    const _now = Date.now();

    const dt = (_now - _time) / 1000 | 0;
    const dt_second = dt / 1000 | 0;
    const dt_minute = dt / 60 | 0;
    const dt_hour = dt / 3600 | 0;
    const dt_day = dt / 86400 | 0;
    const dt_month = dt / 2592000 | 0;
    const dt_year = dt / 31104000 | 0;

    let arr = [
        [dt_year, '年前'],
        [dt_month, '月前'],
        [dt_day, '天前'],
        [dt_hour, '小时前'],
        [dt_minute, '分钟前'],
        [dt_second, '秒前'],
    ];

    for (let i of arr) {
        if (i[0] !== 0) {
            return i[0] + ' ' + i[1];
        }
    }

    return `0 秒前`;
}