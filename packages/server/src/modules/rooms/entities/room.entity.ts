import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('room')
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  avatar: string

  @Column()
  roomName: string

  @Column()
  description: string

  @Column({ type: 'double', default: new Date().valueOf() })
  createTime: number
}
