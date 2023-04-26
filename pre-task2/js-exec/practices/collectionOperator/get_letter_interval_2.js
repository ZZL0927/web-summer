"use strict";

function get_letter_interval_2(number_a, number_b) {
  //在这里写入代码
  let result = [];
  if (number_a != number_b) {
    let flag = number_a < number_b ? 1 : -1;
    while (number_a != number_b) {
      result.push(number_to_letter(number_a));
      number_a += flag;
    }
  }
  result.push(number_to_letter(number_a));
  return result;
}

function number_to_letter(number) {
  return (
    String.fromCharCode(
      (number < 27 ? number : number / 26) +
        96 +
        (number % 26 == 0 && number >= 27 ? -1 : 0)
    ) +
    (number >= 27
      ? String.fromCharCode((number % 26 == 0 ? 26 : number % 26) + 96)
      : "")
  );
}

module.exports = get_letter_interval_2;
