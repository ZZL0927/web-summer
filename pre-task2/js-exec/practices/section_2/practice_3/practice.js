function count_same_elements(collection) {
  //在这里写入代码
  let resultObj = {};
  let result = [];
  collection.forEach((item) => {
    if (item.includes("-") || item.includes("[") || item.includes(":")) {
      //
      if (item.includes("-") || item.includes(":")) {
        resultObj.hasOwnProperty(item.slice(0, 1))
          ? (resultObj[item.slice(0, 1)] += parseInt(item.slice(2)))
          : (resultObj[item.slice(0, 1)] = parseInt(item.slice(2)));
      } else {
        // 带[]
        resultObj.hasOwnProperty(item.slice(0, 1))
          ? (resultObj[item.slice(0, 1)] += parseInt(item.slice(2, -1)))
          : (resultObj[item.slice(0, 1)] = parseInt(item.slice(2, -1)));
      }
    } else {
      resultObj.hasOwnProperty(item)
        ? resultObj[item]++
        : (resultObj[item] = 1);
    }
  });
  // return resultObj
  for (let item in resultObj) {
    result.push({ name: item, summary: resultObj[item] });
  }
  return result;
}

module.exports = count_same_elements;
