import { Body, Controller, ParseArrayPipe, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from '../user/dto/create-user.dto'
import { AuthService } from './auth.service'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'login' })
  @Post('/login')
  async login(@Body() body: CreateUserDto) {
    return this.authService.login(body)
  }

  @ApiOperation({ summary: 'register' })
  @Post('/register')
  async register(@Body() body: CreateUserDto) {
    return this.authService.register(body)
  }

  @ApiOperation({ summary: 'batch register' })
  @Post('/register/batch')
  createMany(@Body(new ParseArrayPipe({ items: String })) users: string[]) {
  // createMany(@Body(ArrayValidationPipe(BatchCreateDto)) users: string[]) {
    return this.authService.batchRegister(users)
  }
}
