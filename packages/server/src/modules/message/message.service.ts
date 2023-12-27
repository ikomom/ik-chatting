import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import R from '../../common/tools/response'
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
    userId: string,
    roomId: string,
    page: number,
    pageSize: number,
  ) {
    const messages = await this.messageRepository
      .createQueryBuilder('message')
      .orderBy('message.createTime', 'DESC')
      .where('message.roomId=:id', { id: roomId })
      .getMany()

    // .andWhere('message.createTime >= :createTime', {
    //   createTime:createTime - defaultGroupMessageTime // 新用户进群默认可以看群近24小时消息
    // })
    // .skip(page)
    // .take(pageSize)
    // TODO: 分页
    return R.ok('ok', messages)
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`
  }

  remove(id: string) {
    return `This action removes a #${id} message`
  }
}
