import { Customer } from '@contacts-api/prisma/client'
import { Injectable } from '@nestjs/common'
import { CustomerApiClient } from './client/customerApiClient'
import { CreateContactDto } from './dto/create-contact.dto'
import { UpdateContactDto } from './dto/update-contact.dto'

@Injectable()
export class ContactService {
  async create (customer: Customer, data: CreateContactDto) {
    const client = new CustomerApiClient(customer)

    return client.sendPostRequest('contact', data)
  }

  findAll (customer: Customer) {
    const client = new CustomerApiClient(customer)

    return client.sendGetRequest('contact')
  }

  findOne (customer: Customer, id: number) {
    const client = new CustomerApiClient(customer)

    return client.sendGetRequest(`contact/${id}`)
  }

  update (customer: Customer, id: number, data: UpdateContactDto) {
    const client = new CustomerApiClient(customer)

    return client.sendPatchRequest(`contact/${id}`, data)
  }

  remove (customer: Customer, id: number) {
    const client = new CustomerApiClient(customer)

    return client.sendDeleteRequest(`contact/${id}`)
  }
}
