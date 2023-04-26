"use strict";

function collect_max_number(collection) {
  //在这里写入代码

  // let result = collection[0]
  // collection.forEach(item => {
  //   if(item>result)
  //   {
  //     result = item
  //   }
  // })
  // return result

  return collection.reduce((pre, cur) => {
    return cur > pre ? cur : pre;
  });
}

module.exports = collect_max_number;
