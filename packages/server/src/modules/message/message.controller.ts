import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { MessageService } from './message.service'
import { CreateMessageDto } from './dto/create-message.dto'
import { UpdateMessageDto } from './dto/update-message.dto'

@ApiTags('Message')
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {
  }

  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto)
  }

  @Get()
  findAll() {
    return this.messageService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messageService.findOne(id)
  }

  @Post('/roomMessage')
  roomMessage(
    @Body('userId') userId: string,
    @Body('roomId') roomId: string,
    @Body('page') page: number,
    @Body('pageSize') pageSize: number,
  ) {
    return this.messageService.roomMessage(
      userId,
      roomId,
      page,
      pageSize,
    )
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messageService.update(+id, updateMessageDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messageService.remove(id)
  }
}
