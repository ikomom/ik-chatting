import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import R from 'src/common/tools/utils'
import { Repository } from 'typeorm'
import { User } from '../user/entities/user.entity'
import { CreateUserDto } from '../user/dto/create-user.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(user: CreateUserDto) {
    const isHave = await this.userRepository.findOne({ where: { username: user.username } })
    if (isHave)
      return R.fail('用户名重复')
    await this.userRepository.save({
      ...user,
      role: 'user',
      avatar: `avatar${Math.round(Math.random() * 19 + 1)}.png`,
    })
    return R.ok(null, '注册成功')
  }
}
