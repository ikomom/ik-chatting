import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import R from '../../common/tools/response'
import { User } from '../user/entities/user.entity'
import { CreateMessageDto } from './dto/create-message.dto'
import { UpdateMessageDto } from './dto/update-message.dto'
import { Message } from './entities/message.entity'

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {
  }

  async create(createMessageDto: CreateMessageDto) {
    await this.messageRepository.save(createMessageDto)
    return R.ok('创建成功')
  }

  async findAll() {
    const data = await this.messageRepository.find({ order: { createTime: 'DESC' } })
    return R.ok('ok', data)
  }

  async findOne(id: string) {
    const data = await this.messageRepository.findOne({ where: { id } })
    if (data)
      return R.ok('ok', data)
    return R.fail('未找到id')
  }

  async roomMessage(
    roomId: string,
    page: number,
    pageSize: number,
  ) {
    const builder = this.messageRepository
      .createQueryBuilder('msg')
      // .innerJoinAndSelect(Room, 'room', 'room.id=:id', { id: roomId })
      .innerJoinAndSelect(User, 'user', 'msg.userId=user.id && msg.roomId=:roomId', { roomId })
      .select('msg.id,msg.userId,user.username,user.avatar,msg.content,msg.createTime')
      .orderBy('msg.createTime', 'ASC')

    const messages = await builder
      // .take(page)
      // .skip(pageSize)
      .limit(pageSize)
      .offset(Math.floor(pageSize * (page - 1)))
      .getRawMany()
    const total = await builder.getCount()

    console.log('builder', builder.getSql())
    console.log('total: ', total)
    // .andWhere('message.createTime >= :createTime', {
    //   createTime:createTime - defaultGroupMessageTime // 新用户进群默认可以看群近24小时消息
    // })
    return R.ok('ok', {
      list: messages,
      page,
      pageSize,
      total,
    })
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`
  }

  remove(id: string) {
    return `This action removes a #${id} message`
  }
}
