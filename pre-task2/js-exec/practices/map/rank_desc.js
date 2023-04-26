"use strict";
let rank_desc = function (collection) {
  // return [2,3,4,5,6];

  // 冒泡
  // for (let i = 0; i < collection.length; i++) {
  //     for (let j = 0; j < collection.length - i - 1; j++) {
  //         if (collection[j + 1] < collection[j]) {
  //             let temp = collection[j]
  //             collection[j] = collection[j + 1]
  //             collection[j + 1] = temp
  //         }
  //     }
  // }
  // return collection

  // .sort()
  return collection.sort((a, b) => a - b);
};

module.exports = rank_desc;
