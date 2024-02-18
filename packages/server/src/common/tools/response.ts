import { HttpException, HttpStatus } from '@nestjs/common'

class R {
  static ok<T = any>(message = '', data: T = null) {
    return R.data(message, data, HttpStatus.OK)
  }

  static data<T = any>(message = '', data: T = null, code: HttpStatus) {
    return { code, data, msg: message, t: new Date().getTime() }
  }

  static fail(message = '', code = HttpStatus.INTERNAL_SERVER_ERROR) {
    throw new HttpException(message, code)
  }
}
export default R
