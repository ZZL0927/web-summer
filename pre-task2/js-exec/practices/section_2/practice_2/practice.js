function count_same_elements(collection) {
  //在这里写入代码
  let resultObj = {};
  let result = [];
  collection.forEach((item) => {
    if (item.indexOf("-") !== -1) {
      resultObj.hasOwnProperty(item.slice(0, 1))
        ? (resultObj[item.slice(0, 1)] += parseInt(item.slice(2)))
        : (resultObj[item.slice(0, 1)] = parseInt(item.slice(2)));
    } else {
      resultObj.hasOwnProperty(item)
        ? resultObj[item]++
        : (resultObj[item] = 1);
    }
  });
  // return resultObj
  for (let item in resultObj) {
    result.push({ key: item, count: resultObj[item] });
  }
  return result;
}

module.exports = count_same_elements;
