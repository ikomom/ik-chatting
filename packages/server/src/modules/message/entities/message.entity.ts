import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('message')
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ default: '' })
  content: string

  @Column()
  userId: string

  @Column()
  roomId: string

  @Column({ type: 'double', default: new Date().valueOf() })
  createTime: number
}
