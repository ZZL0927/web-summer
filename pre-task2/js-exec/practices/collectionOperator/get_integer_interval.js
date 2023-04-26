"use strict";

function get_integer_interval(number_a, number_b) {
  //在这里写入代码
  let result = [];
  let flag = number_a < number_b ? 1 : -1;
  if (number_a != number_b) {
    while (number_a != number_b) {
      result.push(number_a);
      number_a += flag;
    }
  }
  result.push(number_a);
  return result;
}

module.exports = get_integer_interval;
