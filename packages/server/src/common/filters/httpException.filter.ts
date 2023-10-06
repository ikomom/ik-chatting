import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'
import { Response } from 'express'

/**
 * 错误码转换
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    // const request = ctx.getRequest<Request>()
    const status = exception.getStatus()
    const exResponse: any = exception.getResponse()

    const resData: Record<string, unknown> = {
      code: status,
      msg: exception.message,
      t: new Date().getTime(),
      // path: request.url,
    }

    if (typeof exResponse === 'object' && Array.isArray(exResponse.message))
      resData.errors = exResponse.message

    response
      .status(status)
      .json(resData)
  }
}
