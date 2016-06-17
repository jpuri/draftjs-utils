import { assert } from 'chai';
import { forEach, merge, size } from '../common';
import { spy } from 'sinon';

describe('forEach test suite', () => {
  const obj = {
    1: 1,
    2: 2,
    3: 3,
  };
  const callback = spy();
  it('should return without calling callback for undefined objects', () => {
    forEach(undefined, callback);
    assert.equal(callback.callCount, 0);
    assert.equal(callback.callCount, 0);
  });
  it('should call forEach for each defined key in an object', () => {
    forEach(obj, callback);
    assert.equal(callback.callCount, 3);
    assert.equal(callback.callCount, 3);
  });
});

describe('merge test suite', () => {
  it('should return undefined if both operands are undefined', () => {
    assert.isUndefined(merge());
  });
  it('should return all objects of first if second is undefined', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 3,
    };
    const result = merge(obj);
    assert.equal(size(result), 3);
    assert.isDefined(result.a);
    assert.isDefined(result.b);
    assert.isDefined(result.c);
  });
  it('should return all objects of second if first is undefined', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 3,
    };
    const result = merge(undefined, obj);
    assert.equal(size(result), 3);
    assert.isDefined(result.a);
    assert.isDefined(result.b);
    assert.isDefined(result.c);
  });
  it('should return all objects of both if both params are defined', () => {
    const obj1 = {
      a: 1,
      b: 2,
    };
    const obj2 = {
      c: 3,
      d: 4,
    };
    const result = merge(obj1, obj2);
    assert.equal(size(result), 4);
    assert.isDefined(result.a);
    assert.isDefined(result.b);
    assert.isDefined(result.c);
    assert.isDefined(result.d);
  });
});

describe('size test suite', () => {
  it('should return undefined if both operands are undefined', () => {
    assert.isUndefined(size());
  });
  it('should return 0 for empty object', () => {
    const obj = {};
    assert.equal(size(obj), 0);
  });
  it('should return count of values on a object', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 3,
    };
    assert.equal(size(obj), 3);
  });
});
