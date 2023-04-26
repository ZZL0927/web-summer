"use strict";

function choose_no_repeat_number(collection) {
  //在这里写入代码
  // let result = []
  // collection.forEach(item => {
  //   if (result.indexOf(item) == -1) {
  //     result.push(item)
  //   }
  // })
  // return result

  return collection.filter((item, index, self) => {
    return self.indexOf(item) == index;
  });
}

module.exports = choose_no_repeat_number;
