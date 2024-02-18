import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import R from '../../common/tools/response'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
  }

  async findAll() {
    const data = await this.userRepository.find()
    return R.ok('ok', data)
  }

  async findOne(id: string) {
    const data = await this.userRepository.findOne({ where: { id } })
    if (data)
      return R.ok('ok', data)
    throw R.fail('未找到id', HttpStatus.NOT_FOUND)
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findOne(id)
    await this.userRepository.update(id, updateUserDto)
    return R.ok('修改成功')
  }

  async remove(id: string) {
    const res = await this.userRepository.delete({ id })
    if (res.affected)
      return R.ok('删除成功')
    return R.fail('未找到id')
  }
}
