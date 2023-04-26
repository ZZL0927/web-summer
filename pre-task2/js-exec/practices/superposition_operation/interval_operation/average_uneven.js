'use strict';

function average_uneven(collection) {
  return collection.filter(item => item % 2 != 0).reduce((a, b) => a + b) / collection.filter(item => item % 2 != 0).length
  //在这里写入代码
}

module.exports = average_uneven;
