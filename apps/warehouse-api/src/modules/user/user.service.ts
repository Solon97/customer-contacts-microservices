import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@warehouse-api/prisma/client'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
@Injectable()
export class UserService {
  constructor (private readonly prisma: PrismaService) {}

  async create (createUserDto: CreateUserDto): Promise<User> {
    const user = await this.findByUsername(createUserDto.username)
    if (user) {
      throw new ConflictException('Username already exists')
    }

    const data: Prisma.UserCreateInput = {
      ...createUserDto,
      token: await bcrypt.hash(crypto.randomUUID(), 10)
    }

    return this.prisma.user.create({ data })
  }

  findAll () {
    return this.prisma.user.findMany()
  }

  async findById (id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } })
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return user
  }

  findByToken (token: string) {
    return this.prisma.user.findUnique({ where: { token } })
  }

  findByUsername (username: string) {
    return this.prisma.user.findUnique({ where: { username } })
  }

  update (id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove (id: number) {
    return `This action removes a #${id} user`
  }
}
