import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common'
import { Response } from 'express'
import { TypeORMError } from 'typeorm'
import R from '../tools/response'

/**
 * 错误码转换
 */
@Catch(TypeORMError)
export class TypeormExceptionFilter implements ExceptionFilter {
  catch(exception: TypeORMError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    const status = HttpStatus.BAD_REQUEST
    const resData = R.data(exception.message, exception.name, status)

    response
      .status(status)
      .json(resData)
  }
}
