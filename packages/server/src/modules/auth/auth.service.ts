import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { JwtService } from '@nestjs/jwt'
import * as jwt from 'jsonwebtoken'
import R from '../../common/tools/response'
import { User } from '../user/entities/user.entity'
import { CreateUserDto } from '../user/dto/create-user.dto'
import { md5 } from '../../common/tools/utils'
import { jwtConstants } from './constants'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private dataSource: DataSource,
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

    return R.ok('登录成功', { user, token: this.jwtService.sign({ id: user.id }) })
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

  async batchRegister(users: string[]) {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      for (const username of users) {
        const user = new User()
        user.username = username
        const isHave = await this.userRepository.findOne({ where: { username: user.username } })
        if (isHave)
          throw new Error(`用户名: ${username} 重复`)

        await queryRunner.manager.save(user)
      }

      await queryRunner.commitTransaction()
    }
    catch (err) {
      // since we have errors lets rollback the changes we made
      console.error(err)
      await queryRunner.rollbackTransaction()
      return R.fail(err.message)
    }
    finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release()
    }
    return R.ok('创建成功')
  }

  async verifyUser(token: string): Promise<User | null> {
    if (!token)
      return null
    try {
      const user = jwt.verify(token, jwtConstants.secret) as User
      return user
    }
    catch (e) {
      console.error(e)
      return null
    }
  }
}
