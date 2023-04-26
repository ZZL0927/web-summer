"use strict";

function calculate_elements_sum(collection) {
  //在这里写入代码
  return collection.reduce((a, b) => a + b);
}

module.exports = calculate_elements_sum;
