function count_same_elements(collection) {
  //在这里写入代码
  // 当对象的属性是变量时，需要用中括号
  let resultObj = {};
  let result = [];
  collection.forEach((item) => {
    resultObj.hasOwnProperty(item) ? resultObj[item]++ : (resultObj[item] = 1);
  });
  // return resultObj
  for (let item in resultObj) {
    result.push({ key: item, count: resultObj[item] });
  }
  return result;
}

module.exports = count_same_elements;
