"use strict";

function choose_divisible_integer(collection_a, collection_b) {
  //在这里写入代码
  return collection_a.filter((item_a) => {
    let flag = false;
    collection_b.forEach((item_b) => {
      if (item_a % item_b == 0) flag = true;
    });
    return flag;
  });
}

module.exports = choose_divisible_integer;
