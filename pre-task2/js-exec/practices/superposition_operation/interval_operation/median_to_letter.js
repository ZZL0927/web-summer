'use strict';

function median_to_letter(collection) {
  let num
  if (collection.length % 2 == 0) {
    num = Math.ceil((collection[collection.length / 2 - 1] + collection[collection.length / 2]) / 2)
  } else {
    num = collection[(collection.length - 1) / 2]
  }
  // return String.fromCharCode((num < 27?num:num / 26) + 96+(num % 26 == 0&&num>=27?-1:0)) + (num>=27?String.fromCharCode((num % 26 == 0?26:num % 26) + 96):'')

  let letter = ''
  while (num > 0) {
    let last_letter = num % 26
    last_letter = last_letter === 0 ? 26 : last_letter
    // 通过取余计算出末尾的一个字符
    letter = String.fromCharCode(last_letter + 96) + letter
    // 下一次运算的初始值
    num = (num - last_letter) / 26
  }
  return letter


  //在这里写入代码
}

module.exports = median_to_letter;
