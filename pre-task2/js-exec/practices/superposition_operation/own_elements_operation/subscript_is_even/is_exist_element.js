'use strict';
let is_exist_element = function (collection, element) {
    // 偶数数组
    let even_arr = collection.filter((item, index) => index % 2 === 0)
    // 数组转字符串判断是否包含element
    return even_arr.join('').includes(element + '')
};
module.exports = is_exist_element;
