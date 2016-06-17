/* @flow */

/**
* Utility function to execute callback for eack key->value pair.
*/
export function forEach(obj: Object, callback: Function): void {
  if (obj) {
    for (const key in obj) { // eslint-disable-line no-restricted-syntax
      if (obj.hasOwnProperty(key)) {
        callback(key, obj[key]);
      }
    }
  }
}

/**
* Utility function to merge 2 objects.
*/
export function merge(obj1: Object, obj2: Object): any {
  let obj3;
  forEach(obj1, (key, value) => {
    if (!obj3) {
      obj3 = {};
    }
    obj3[key] = value;
  });
  forEach(obj2, (key, value) => {
    if (!obj3) {
      obj3 = {};
    }
    obj3[key] = value;
  });
  return obj3;
}

/**
* Utility function to merge 2 objects.
*/
export function size(object: Object): any {
  if (object) {
    let count = 0;
    forEach(object, () => {
      count++;
    });
    return count;
  }
  return undefined;
}
