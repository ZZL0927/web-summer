"use strict";

function choose_even(collection) {
  //在这里写入代码
  // let result = []
  // collection.forEach(item => {
  //   if(item%2==0)result.push(item)
  // });
  let result = collection.filter((item) => item % 2 == 0);
  return result;
}

module.exports = choose_even;
