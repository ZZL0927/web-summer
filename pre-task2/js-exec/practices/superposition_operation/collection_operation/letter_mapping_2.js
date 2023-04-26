'use strict';

function average_to_letter(collection) {
  return String.fromCharCode(Math.ceil(collection.reduce((a, b) => a + b) / collection.length) + 96)
  //在这里写入代码
}

module.exports = average_to_letter;

