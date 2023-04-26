'use strict';
let calculate_average = function (collection) {
    // 过滤，求平均
    return collection.filter((item, index) => index % 2 !== 0).reduce((pre, cur) => pre + cur) / Math.floor(collection.length / 2)
};
module.exports = calculate_average;
