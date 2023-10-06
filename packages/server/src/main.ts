import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { knife4jSetup } from 'nest-knife4j'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './common/filters/httpException.filter'

const port = 8000
async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // doc
  const config = new DocumentBuilder()
    .setTitle('Chat Api')
    .setDescription('Chat Room Api')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
  knife4jSetup(app, [
    {
      name: '1.0',
      url: '/api-json',
      swaggerVersion: '2.0',
      location: '/api-json',
    },
  ])

  /**
   * filter
   */
  // 格式化错误
  app.useGlobalFilters(new HttpExceptionFilter())
  /**
   * pipes
   */
  // 验证入参
  app.useGlobalPipes(new ValidationPipe({}))

  // TODO: i18n https://nestjs-i18n.com/quick-start
  // TODO: rateLimit, compression

  await app.listen(port)
}

bootstrap().then(() => console.log(`listen to ${port}`))
