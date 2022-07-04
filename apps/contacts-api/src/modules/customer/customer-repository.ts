import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateCustomerDto } from './dto/create-customer.dto'
import { UpdateCustomerDto } from './dto/update-customer.dto'

@Injectable()
export class CustomerRepository {
  constructor (private prisma: PrismaService) {}

  create (createCustomerDto: CreateCustomerDto) {
    return this.prisma.customer.create({ data: createCustomerDto })
  }

  update (id: number, updateCustomerDto: UpdateCustomerDto) {
    return this.prisma.customer.update({
      data: updateCustomerDto,
      where: {
        id
      }
    })
  }

  findAll () {
    return this.prisma.customer.findMany({
      select: {
        api_token: false
      }
    })
  }

  findOne (id: number) {
    return this.prisma.customer.findUnique({
      where: {
        id
      }
    })
  }

  delete (id: number) {
    return this.prisma.customer.delete({
      where: {
        id
      }
    })
  }
}
