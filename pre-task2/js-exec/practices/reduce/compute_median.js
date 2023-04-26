'use strict';

function compute_median(collection) {
  // 在这里写入代码
  let result
  collection.sort((a, b) => a - b)
  if (collection.length % 2 == 0) {
    result = (collection[collection.length / 2] + collection[collection.length / 2 - 1]) / 2
  } else {
    result = collection[Math.floor(collection.length / 2)]
  }
  return result
}

module.exports = compute_median;


