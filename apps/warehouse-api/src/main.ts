import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import 'module-alias'
import { AppModule } from './app.module'

async function bootstrap () {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )

  await app.listen(process.env.WAREHOUSE_API_PORT)
  console.log(`Running on ${process.env.WAREHOUSE_API_PORT} 🚀`)
}

bootstrap()
