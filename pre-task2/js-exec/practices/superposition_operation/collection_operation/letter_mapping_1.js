'use strict';

function even_to_letter(collection) {
  
  // return collection.filter(item => item % 2 == 0).map(item => String.fromCharCode(item + 96))

  //在这里写入代码
  return collection.filter(item => item % 2 == 0).map(item => {
    let letter = ''
    while (item > 0) {
      let last_letter = item % 26
      last_letter = last_letter === 0 ? 26 : last_letter
      // 通过取余计算出末尾的一个字符
      letter = String.fromCharCode(last_letter + 96) + letter
      // 下一次运算的初始值
      item = (item - last_letter) / 26
    }
    return letter
  })

}

module.exports = even_to_letter;
