'use strict';
let even_asc_odd_desc = function (collection) {
    let left = [], right = []
    collection.forEach(item => {
        item % 2 == 0 ? left.push(item) : right.push(item)
    })
    return left.sort((a, b) => a - b).concat(right.sort((a, b) => b - a))
};
module.exports = even_asc_odd_desc;
