import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { md5 } from '../../../common/tools/utils'
import { BasicEntity } from '../../../common/entity/basic.entity'

@Entity('user')
export class User extends BasicEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ default: 'test' })
  username: string

  @Column({ default: md5('123456'), select: false })
  password: string

  @Column({ default: 'on' })
  status: string

  @Column({ default: '' })
  avatar: string

  @Column({ default: '' })
  tag: string

  @Column({ default: 'user' })
  role: string
}
