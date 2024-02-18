import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { BasicEntity } from '../../../common/entity/basic.entity'

@Entity('message')
export class Message extends BasicEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ default: '' })
  content: string

  @Column()
  userId: string

  @Column()
  roomId: string
}
