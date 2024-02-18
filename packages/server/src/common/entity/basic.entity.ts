import { CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm'

@Entity()
export class BasicEntity {
  @CreateDateColumn({
    // name: 'create_time',
    nullable: true,
  })
  createTime: Date

  @UpdateDateColumn({
    // name: 'update_time',
    nullable: true,
  })
  updateTime: Date | null
/*
  @DeleteDateColumn({
    name: 'delete_at',
    nullable: true,
  })
  deleteAt: Date | null */
}
