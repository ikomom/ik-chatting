import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { BasicEntity } from '../../../common/entity/basic.entity'

@Entity('room')
export class Room extends BasicEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  avatar: string

  @Column()
  roomName: string

  @Column()
  description: string
}
