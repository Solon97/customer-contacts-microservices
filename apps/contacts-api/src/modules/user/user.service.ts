import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { CustomerService } from '../customer/customer.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { UserRepository } from './user-repository'
@Injectable()
export class UserService {
  constructor (private readonly repository: UserRepository, private readonly customerService: CustomerService) {}

  async create (userDto: CreateUserDto): Promise<User> {
    const userExists = await this.repository.findByUsername(userDto.username)
    if (userExists) {
      throw new ConflictException('Username already exists')
    }

    const validCustomer = await this.validateCustomer(userDto.customerId)
    if (!validCustomer) {
      throw new ConflictException('Customer not exists')
    }

    const user: User = {
      ...userDto,
      token: await bcrypt.hash(crypto.randomUUID(), 10)
    }

    return this.repository.create(user)
  }

  private async validateCustomer (customerId: number) {
    if (!customerId) {
      return true
    }
    return this.customerService.findOne(customerId)
  }

  findAll () {
    return this.repository.findAll()
  }

  async findById (id: number) {
    const user = await this.repository.findById(id)
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return user
  }

  findByToken (token: string) {
    return this.repository.findByToken(token)
  }

  findByUsername (username: string) {
    return this.repository.findByUsername(username)
  }

  update (id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove (id: number) {
    return `This action removes a #${id} user`
  }
}
