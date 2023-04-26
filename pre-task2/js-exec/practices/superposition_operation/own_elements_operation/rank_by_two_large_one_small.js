'use strict';
function rank_by_two_large_one_small(collection) {
  //这里写代码。。。
  collection.sort((a, b) => a - b)
  for (let i = 2; i < collection.length; i = i + 3) {
    let temp = collection[i - 2]
    collection[i - 2] = collection[i - 1]
    collection[i - 1] = collection[i]
    collection[i] = temp
  }
  return collection
}
module.exports = rank_by_two_large_one_small;
