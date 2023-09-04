import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import R from '../../common/tools/response'
import { User } from '../user/entities/user.entity'
import { CreateUserDto } from '../user/dto/create-user.dto'
import { md5 } from '../../common/tools/utils'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async login(data: CreateUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        username: data.username,
        password: md5(data.password),
      },
    })
    if (!user)
      return R.fail('用户名或密码错误')

    return R.ok('登录成功', { user, token: 'hhhh' })
  }

  async register(user: CreateUserDto) {
    const isHave = await this.userRepository.findOne({ where: { username: user.username } })
    if (isHave)
      return R.fail('用户名重复')
    await this.userRepository.save({
      username: user.username,
      password: md5(user.password),
      role: 'user',
      avatar: `avatar${Math.round(Math.random() * 19 + 1)}.png`,
    })
    return R.ok('注册成功', null)
  }
}
