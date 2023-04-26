"use strict";

function compute_chain_median(collection) {
  //在这里写入代码

  let result;
  // 切割
  let arr = collection.split("->");
  // 排序
  arr.sort((a, b) => a - b);
  // 计算
  if (arr.length % 2 == 0) {
    result = (+arr[arr.length / 2] + +arr[arr.length / 2 - 1]) / 2;
  } else {
    result = arr[Math.floor(arr.length / 2)];
  }
  return result;
}

module.exports = compute_chain_median;
