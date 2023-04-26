"use strict";

function grouping_count(collection) {
  //在这里写入代码
  // let result = {}
  // collection.forEach(item => {
  //   result[item]=result[item]==undefined?1:result[item]+1
  // });
  // return result

  // 初始值为一个空对象赋给pre
  return collection.reduce((pre, cur) => {
    if (cur in pre) {
      pre[cur] += 1;
    } else {
      pre[cur] = 1;
    }
    return pre;
  }, {});
}

module.exports = grouping_count;
