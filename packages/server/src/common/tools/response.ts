class R {
  static ok<T = any>(message = '', data: T = null) {
    return { code: 200, data, message, timestamp: new Date().getTime() }
  }

  static fail<T = any>(message = '', code = 500) {
    return { code, message, timestamp: new Date().getTime() }
  }
}
export default R
