class R {
  static ok<T = any>(message = '', data: T = null) {
    return { code: 200, data, msg: message, t: new Date().getTime() }
  }

  static fail(message = '', code = 500) {
    return { code, msg: message, t: new Date().getTime() }
  }
}
export default R
