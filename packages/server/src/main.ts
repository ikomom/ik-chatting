import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { knife4jSetup } from 'nest-knife4j'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'

const port = 8000
async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe({}))

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
  await app.listen(port)
  console.log(`listen to ${port}`)
}

bootstrap()
