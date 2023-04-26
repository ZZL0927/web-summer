'use strict';
let single_element = function (collection) {

    let even_arr = collection.filter((item, index) => index % 2 !== 0)

    return even_arr.filter(item => {
        // 首次出现与末次出现是否相等
        return even_arr.indexOf(item) == even_arr.lastIndexOf(item)
    })
};
module.exports = single_element;
