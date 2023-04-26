"use strict";

function double_to_one(collection) {
  //在这里写入代码

  // let result = []
  // collection.forEach(item1 => {
  //   if(Array.isArray(item1))
  //   {
  //     item1.forEach(item2=>{
  //       if(result.indexOf(item2)==-1)
  //       {
  //         result.push(item2)
  //       }
  //     })
  //   }else{
  //     if(result.indexOf(item1)==-1)
  //       {
  //         result.push(item1)
  //       }
  //   }
  // })
  // return result

  // return collection.reduce((pre, cur) => {
  //   // 先将子项数组扁平化，然后过滤出未加入的元素，然后使用reduce添加得到结果
  //   pre.push(...cur.flat().filter(item => pre.indexOf(item) === -1))
  //   return pre
  // }, [])

  let result = collection.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? double_to_one(cur) : cur);
  }, []);
  return result.reduce((pre, cur) => {
    pre.indexOf(cur) === -1 && pre.push(cur);
    return pre;
  }, []);
}

module.exports = double_to_one;
