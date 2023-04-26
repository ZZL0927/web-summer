'use strict';
let calculate_median = function (collection) {
  let result
  let even = collection.filter((item, index) => index % 2 !== 0)
  if (even.length % 2 == 0) {
    result = Math.ceil((even[even.length / 2 - 1] + even[even.length / 2]) / 2)
  } else {
    result = even[(even.length - 1) / 2]
  }
  return result
};
module.exports = calculate_median;
