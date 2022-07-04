import { Prisma } from '@contacts-api/prisma/client'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { User } from './entities/user.entity'

@Injectable()
export class UserRepository {
  constructor (private prisma: PrismaService) {}

  create (user: User) {
    const data: Prisma.UserUncheckedCreateInput = {
      ...user,
      customerId: user.customerId || null
    }

    return this.prisma.user.create({ data })
  }

  findAll () {
    return this.prisma.user.findMany({
      select: {
        token: false
      }
    })
  }

  findById (id: number) {
    return this.prisma.user.findUnique({
      where: {
        id
      },
      include: {
        customer: true
      }
    })
  }

  findByUsername (username: string) {
    return this.prisma.user.findUnique({
      where: { username }
    })
  }

  findByToken (token: string) {
    return this.prisma.user.findUnique({ where: { token } })
  }
}
