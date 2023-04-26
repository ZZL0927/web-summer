'use strict';
let even_group_calculate_average = function (collection) {
    let sum, result = new Array(3).fill(0), count = [0, 0, 0]
    sum = collection.filter((item, index) => index % 2 !== 0)
    // 不含有偶数
    if (sum.every(item => item % 2 != 0)) return [0]
    sum = sum.filter(item => item % 2 === 0)
    // 偶数全为3位数
    if (sum.every(item => (item + '').length == 3)) {
        result = [sum.reduce((a, b) => a + b) / sum.length]
    }
    // 按位数分组，计算平均数
    else {
        sum.forEach(item => {
            count[(item + '').length <= 2 ? (item + '').length - 1 : 2]++
            result[(item + '').length <= 2 ? (item + '').length - 1 : 2] += item
        })
        for (let i = 0; i < result.length; i++) {
            result[i] = result[i] / count[i]
        }
    }
    return result

};
module.exports = even_group_calculate_average;
