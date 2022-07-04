import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { PrismaModule } from './modules/prisma/prisma.module'
import { UserModule } from './modules/user/user.module'
import { AuthModule } from './modules/auth/auth.module'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard'
import { RoleGuard } from './modules/auth/guards/role.guard'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { ContactModule } from './modules/contact/contact.module'

@Module({
  imports: [PrismaModule, UserModule, AuthModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10
    }),
    ContactModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ]
})
export class AppModule { }
