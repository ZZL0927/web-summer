"use strict";
let number_map_to_word = function (collection) {
  // return ['a','b','c','d','e'];
  // return collection.map(item => {
  //   return String.fromCharCode(item + 96)
  // })

  return collection.map((item) => {
    let letter = "";
    while (item > 0) {
      let last_letter = item % 26;
      last_letter = last_letter === 0 ? 26 : last_letter;
      // 通过取余计算出末尾的一个字符
      letter = String.fromCharCode(last_letter + 96) + letter;
      // 下一次运算的初始值
      item = (item - last_letter) / 26;
    }
    return letter;
  });
};

module.exports = number_map_to_word;
