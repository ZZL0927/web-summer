'use strict';
let rank_by_two_large_one_small = require('../../../practices/superposition_operation/own_elements_operation/rank_by_two_large_one_small.js');

describe('rank_by_two_large_one_small_spec', function() {
  let collection_a = [2, 8, 1, 9, 6, 4, 3, 10];

  it('两大一小排序', function() {
    let result = rank_by_two_large_one_small(collection_a);
    expect(result).toEqual([2, 3, 1, 6, 8, 4, 9, 10])
  });
});
