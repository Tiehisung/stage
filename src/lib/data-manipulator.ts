export function generateUniqueValues(array = []) {
  let arrayToSet = new Set(array);
  let setToArray = Array.from(arrayToSet);
  return setToArray;
}
export function createObjectFromArray(keys: string[], values: unknown[]) {
  const object: { [key: string]: unknown } = {};

  for (let i = 0; i < keys.length; i++) {
    object[keys[i]] = values[i];
  }

  return object;
}
