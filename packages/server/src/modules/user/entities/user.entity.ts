import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { md5 } from '../../../common/tools/utils'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ default: 'test' })
  username: string

  @Column({ default: md5('123456'), select: false })
  password: string

  @Column({ default: 'on' })
  status: string

  @Column({ default: 'avatar1.png' })
  avatar: string

  @Column({ default: '' })
  tag: string

  @Column({ default: 'user' })
  role: string

  @Column({ type: 'double', default: new Date().valueOf() })
  createTime: number
}
