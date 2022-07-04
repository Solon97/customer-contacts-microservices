import { Injectable } from '@nestjs/common'
import { CustomerApiClient } from '../contact/client/customerApiClient'
import { CustomerRepository } from './customer-repository'
import { CreateCustomerDto } from './dto/create-customer.dto'
import { UpdateCustomerDto } from './dto/update-customer.dto'
import { Customer } from './entities/customer.entity'

@Injectable()
export class CustomerService {
  constructor (private readonly repository: CustomerRepository) {}

  async create (createCustomerDto: CreateCustomerDto) {
    const customer: Customer = {
      ...createCustomerDto
    }

    await (new CustomerApiClient(customer)).getClient()

    return this.repository.create(customer)
  }

  findAll () {
    this.repository.findAll()
  }

  findOne (id: number) {
    return this.repository.findOne(id)
  }

  update (id: number, updateCustomerDto: UpdateCustomerDto) {
    return this.repository.update(id, updateCustomerDto)
  }

  remove (id: number) {
    return this.repository.delete(id)
  }
}
