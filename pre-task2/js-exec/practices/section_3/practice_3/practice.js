function create_updated_collection(collection_a, object_b) {
  //在这里写入代码
  let resultObj = {};
  let result = [];
  collection_a.forEach((item) => {
    resultObj.hasOwnProperty(item) ? resultObj[item]++ : (resultObj[item] = 1);
  });
  for (let item in resultObj) {
    result.push({ key: item, count: resultObj[item] });
  }
  return result.map((item) => {
    if (object_b.value.indexOf(item.key) != -1) {
      item.count -= parseInt(item.count / 3);
    }
    return item;
  });
}

module.exports = create_updated_collection;
