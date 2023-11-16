import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  avatar: string

  @Column()
  groupName: string

  @Column()
  description: string

  @Column({ type: 'double', default: new Date().valueOf() })
  createTime: number
}
