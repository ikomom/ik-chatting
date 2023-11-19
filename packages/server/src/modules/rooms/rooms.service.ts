import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import R from '../../common/tools/response'
import { CreateRoomDto } from './dto/create-room.dto'
import { UpdateRoomDto } from './dto/update-room.dto'
import { Room } from './entities/room.entity'

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {
  }

  async create(createRoomDto: CreateRoomDto) {
    await this.roomRepository.save(createRoomDto)
    return R.ok('创建成功')
  }

  async findAll() {
    const data = await this.roomRepository.find({ order: { createTime: 'DESC' } })
    return R.ok('ok', data)
  }

  async findOne(id: string) {
    const data = await this.roomRepository.findOne({ where: { id } })
    if (data)
      return R.ok('ok', data)
    return R.fail('未找到id')
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`
  }

  async remove(id: string) {
    const res = await this.roomRepository.delete({ id })
    if (res.affected)
      return R.ok('删除成功')
    return R.fail('未找到id')
  }
}
