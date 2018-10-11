
let counter: number = 0;

export const global: any = {
  set: setGlobal
};

export function setGlobal (prop: string, val: any): void {
  const obj = {};
  obj[prop] = {
    value: val,
    writable: false
  };
  Object.defineProperties(global, obj);
};

/**
 * Helps to insert classes in an element.
 *
 * Prevents the insertion of 'undefined' and 'null' in a string.
 * An empty string will be returned instead.
 *
 * @param field a value which can potentially be undefined or null.
 */
export function c(field: any): any {
  if (typeof field !== 'undefined'
    && field !== null
  ) {
    if (typeof field === 'string') {
      return ' '+field;
    }
    return field;
  }
  return '';
}

/**
 * Get a number which can be used as a unique id.
 *
 * @return {number}
 */
export function _id(): number {
  return counter++;
}

/**
 * If given a list of space-seperated class names as a string, this method
 * will remove a class name from the list.
 *
 * @param {string} classes   space-separated list of classes
 * @param {Array<string>} classNames class name to be removed
 *
 * @return {string}
 */
export function removeClass (classes: string, classNames: string[]): string {
  let result: string = classes;
  for (const className of result) {
    const regex: RegExp = new RegExp(className);
    result = result.replace(regex, '');
  }
  return result;
}

/**
 * Appends a class name to a space-separated list of classes.
 *
 * @param {string} classes   space-separated list of classes
 * @param {string} className class name to be removed
 *
 * @return {string}
 */
export function addClass (classes: string, className: string): string {
  if (classes.indexOf(className) >= 0) {
    return classes;
  }
  if (classes.match(/\s$/)) {
      return classes + className;
  }
  return classes + ' ' + className;
}

/**
 * Test if class name present in space-separated list of classes.
 *
 * @param {string} classes   space-separated list of classes
 * @param {string} className class name to search for.
 *
 * @return {boolean}
 */
export function hasClass (classes:string, className:string) :boolean {
  return classes.indexOf(className) >= 0;
}

