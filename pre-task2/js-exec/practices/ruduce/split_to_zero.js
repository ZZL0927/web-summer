"use strict";

function spilt_to_zero(number, interval) {
  //在这里写入代码
  // 在js中进行小数的计算时，需要取有限位并对小数进行取整
  let result = [];
  while (number >= 0) {
    if (number == 0) {
      result.push(number);
      break;
    }
    result.push(number);
    number = parseFloat((number - interval).toPrecision(15));
  }
  if (number < 0) result.push(number);
  return result;
}

module.exports = spilt_to_zero;
