/**
 * Utility function to execute callback for eack key->value pair.
 */
export function forEach(obj, callback) {
  if (obj) {
    for (const key in obj) {
      // eslint-disable-line no-restricted-syntax
      if ({}.hasOwnProperty.call(obj, key)) {
        callback(key, obj[key]);
      }
    }
  }
}

/**
 * Utility function to merge 2 objects.
 */
export function size(object) {
  if (object) {
    let count = 0;
    forEach(object, () => {
      count += 1;
    });
    return count;
  }
  return undefined;
}

export function startsWith(inputString, searchString) {
  if (typeof inputString.startsWith === 'function') {
    return inputString.startsWith(searchString);
  }

  return inputString.slice(0, searchString.length) === searchString;
}
