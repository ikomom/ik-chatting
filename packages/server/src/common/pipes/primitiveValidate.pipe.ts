import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
} from '@nestjs/common'

interface PrimitiveValidatePipeOptions {

}

/**
 * 模仿 ParseArrayPipe 自定义数组处理
 *
 * TODO: 1. 处理空数据 2. 结合class-validator（或者validator.js）处理数组和对象各种数据
 *
 */
@Injectable()
export class PrimitiveValidatePipe implements PipeTransform {
  constructor(protected readonly options: PrimitiveValidatePipeOptions = {}) {
  }

  transform(value: any, metadata?: ArgumentMetadata): Promise<any> {
    return value
  }
}
