"use strict";
let rank_asc = function (collection) {
  // return [6,5,4,3,2];

  // 冒泡
  // for (var i = 0; i < collection.length; i++) {
  //     for (var j = 0; j < collection.length - i - 1; j++) {
  //         if (collection[j + 1] > collection[j]) {
  //             var temp = collection[j]
  //             collection[j] = collection[j + 1]
  //             collection[j + 1] = temp
  //         }
  //     }
  // }
  // return collection
  return collection.sort((a, b) => b - a);
};

module.exports = rank_asc;
