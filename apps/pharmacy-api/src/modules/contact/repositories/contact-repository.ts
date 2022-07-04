import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@pharmacy-api/prisma/client'
import { PrismaService } from '../../prisma/prisma.service'
import { ContactDto } from '../dto/create-contact.dto'
import { UpdateContactDto } from '../dto/update-contact.dto'
import { Contact } from '../entities/contact.entity'

@Injectable()
export class ContactRepository {
  constructor (private readonly prisma: PrismaService) {}

  createMany (contacts: ContactDto[]) {
    const data: Prisma.ContactCreateManyInput[] = [
      ...(contacts.map(contact => new Contact(contact)))
    ]

    return this.prisma.contact.createMany({ data })
  }

  findAll () {
    return this.prisma.contact.findMany()
  }

  async findOne (id: number) {
    const contact = await this.prisma.contact.findUnique({ where: { id } })
    if (!contact) {
      throw new NotFoundException('Contact Not Found')
    }
    return contact
  }

  async update (id: number, updateContactDto: UpdateContactDto) {
    const existContact = await this.findOne(id)

    const contact = new Contact({
      ...existContact,
      ...updateContactDto
    })

    return this.prisma.contact.update({ where: { id }, data: contact })
  }

  remove (id: number) {
    return this.prisma.contact.delete({ where: { id } })
  }
}
