"use strict";
let number_map_to_word_over_26 = function (collection) {
  // return ['a','m','aa','ad','y','aa'];

  // return collection.map(item => {
  //   return String.fromCharCode((item < 27 ? item : item / 26) + 96 + (item % 26 == 0 ? -1 : 0)) + (((item >= 27 && item % 26 !== 0) ? String.fromCharCode(item % 26 + 96) : ''))
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

module.exports = number_map_to_word_over_26;
