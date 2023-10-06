import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
} from '@nestjs/common'

interface PrimitiveValidatePipeOptions {

}

/**
 * 模仿 ParseArrayPipe 自定义数组处理
 */
@Injectable()
export class PrimitiveValidatePipe implements PipeTransform {
  constructor(protected readonly options: PrimitiveValidatePipeOptions = {}) {
  }

  transform(value: any, metadata?: ArgumentMetadata): Promise<any> {
    return value
  }
}
