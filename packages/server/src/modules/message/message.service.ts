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
    const messages = this.messageRepository
      .createQueryBuilder('message')
      .orderBy('message.createTime', 'DESC')
      .where('message.roomId=:id', { id: roomId })
      .getMany()

    return messages
    // .andWhere('message.createTime >= :createTime', {
    //   createTime:
    // })
    // .skip(page)
    // .take(pageSize)
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`
  }

  remove(id: string) {
    return `This action removes a #${id} message`
  }
}
