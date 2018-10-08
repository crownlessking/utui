
/**
 * Configuration class.
 *
 * Use this class when there is a need to pass multiple values to a component
 * and you want to avoid declaring too many attributes on the JSX tag.
 */
export default class Config {
  private data: any;
  private strict: boolean;

  public constructor(data:any = {}) {
    this.data = data;
    this.strict = true;
  }

  /**
   * 
   * @param {string} prop property
   * @param {any}    val  
   */
  public set(prop: string, val: any): void {
    this.createProperty(prop, val);
  };

  /**
   * Set a mutable value.
   *
   * @param {string} prop property
   * @param {any}    val  value
   */
  public rSet(prop: string, val: any): void {
    if (typeof this.data[prop] !== 'undefined') {
      this.data[prop] = val;
      return;
    }
    this.createProperty(prop, val, true);
  }

  /**
   * Get a value which was previously saved using .set()
   *
   * @param {string} prop property
   *
   * @return {any}
   */
  public get(prop: string): any {
    if (typeof this.data[prop] !== 'undefined') {
      return this.data[prop];
    } else if (this.strict) {
      throw new Error('Configuration "'+prop+'" does not exist.');
    }
    return null;
  }

  /**
   * Get a value but won't throw an error if the value does not exist.
   *
   * @param {string} prop property
   *
   * @return {any}
   */
  public rGet(prop: string):any {
    return this.data[prop] ? this.data[prop] : null;
  }

  /**
   * Will throw an exception if requested value does not exist.
   *
   * @return {void}
   */
  public beStrict(): void {
    this.strict = true;
  }

  /**
   * From now on, undefined values will not throw an exception.
   */
  public relax(): void {
    this.strict = false;
  }

  get keys() {
    return this.data;
  }

  private createProperty(prop: string, val: any, w: boolean = false): void {
    const obj = {};
    obj[prop] = {
      value: val,
      writable: w
    };
    Object.defineProperties(this.data, obj);
  }

}