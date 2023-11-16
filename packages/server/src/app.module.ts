import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './modules/auth/auth.module'
import { UserModule } from './modules/user/user.module'
import { AppController } from './app.controller'
import { RoomsModule } from './modules/rooms/rooms.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'example',
      database: 'chatting',
      charset: 'utf8mb4', // 设置chatset编码为utf8mb4
      autoLoadEntities: true,
      synchronize: true, // 自动同步
    }),
    UserModule,
    {
      module: AuthModule,
      global: true,
    },
    RoomsModule,
  ],
  controllers: [AppController],
})
export class AppModule {
}
