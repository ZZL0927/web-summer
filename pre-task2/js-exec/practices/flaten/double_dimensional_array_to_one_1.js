"use strict";

function double_to_one(collection) {
  //在这里写入代码

  // let result = []
  // collection.forEach(item1 => {
  //   if(Array.isArray(item1))
  //   {
  //     item1.forEach(item2=>{
  //       result.push(item2)
  //     })
  //   }else{
  //     result.push(item1)
  //   }
  // })
  // return result

  // 先将数组扁平化（不考虑去重）
  let result = collection.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? double_to_one(cur) : cur);
  }, []);
  // 统一去重
  return result.reduce((pre, cur) => {
    pre.indexOf(cur) === -1 && pre.push(cur);
    return pre;
  }, []);
}

module.exports = double_to_one;
