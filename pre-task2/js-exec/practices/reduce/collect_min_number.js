"use strict";

function collect_min_number(collection) {
  //在这里写入代码
  // let result = collection[0]
  // collection.forEach(item => {
  //   if(item<result)
  //   {
  //     result = item
  //   }
  // })
  // return result

  return collection.reduce((pre, cur) => {
    return pre < cur ? pre : cur;
  });
}

module.exports = collect_min_number;
