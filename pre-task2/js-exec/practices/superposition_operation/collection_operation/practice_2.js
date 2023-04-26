'use strict';

function hybrid_operation_to_uneven(collection) {
  return collection.filter(item => item % 2 != 0).map(item => item * 3 + 2)
  //在这里写入代码
}

module.exports = hybrid_operation_to_uneven;

