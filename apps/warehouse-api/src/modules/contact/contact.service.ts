import { Injectable } from '@nestjs/common'
import { CreateContactDto } from './dto/create-contact.dto'
import { UpdateContactDto } from './dto/update-contact.dto'
import { ContactRepository } from './repositories/contact-repository'

@Injectable()
export class ContactService {
  constructor (private readonly repository: ContactRepository) {}

  create ({ contacts }: CreateContactDto) {
    return this.repository.createMany(contacts)
  }

  findAll () {
    return this.repository.findAll()
  }

  findOne (id: number) {
    return this.repository.findOne(id)
  }

  update (id: number, updateContactDto: UpdateContactDto) {
    return this.repository.update(id, updateContactDto)
  }

  remove (id: number) {
    return this.repository.remove(id)
  }
}
