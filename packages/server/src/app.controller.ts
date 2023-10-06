import { Controller, Get } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@ApiTags('App')
@Controller('')
export class AppController {
  @ApiOperation({ summary: 'index' })
  @Get('/')
  async index() {
    return 'Hello World!'
  }
}
