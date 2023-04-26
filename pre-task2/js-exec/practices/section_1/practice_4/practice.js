function collect_same_elements(collection_a, object_b) {
  //在这里写入代码
  collection_a = collection_a.filter(item => object_b.value.indexOf(item.key) != -1)
  let result = []
  collection_a.forEach(item => {
    result.push(item.key)
  });
  return result
}

module.exports = collect_same_elements;
