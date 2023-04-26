'use strict';
function one_add_next_multiply_three(collection) {
  let result = []
  collection.reduce((pre, cur) => {
    result.push((pre + cur) * 3)
    return cur
  })
  return result
}
module.exports = one_add_next_multiply_three;
