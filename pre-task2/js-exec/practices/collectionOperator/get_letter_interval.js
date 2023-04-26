"use strict";

function get_letter_interval(number_a, number_b) {
  //在这里写入代码
  let result = [];
  if (number_a != number_b) {
    let flag = number_a < number_b ? 1 : -1;
    while (number_a != number_b) {
      result.push(String.fromCharCode(number_a + 96));
      number_a += flag;
    }
  }
  result.push(String.fromCharCode(number_a + 96));
  return result;
}

module.exports = get_letter_interval;
