import { Customer } from '@contacts-api/prisma/client'
import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common'
import { UserCustomer } from '../auth/types/decorators/user.decorator'
import { ContactService } from './contact.service'
import { CreateContactDto } from './dto/create-contact.dto'
import { UpdateContactDto } from './dto/update-contact.dto'

@Controller('contact')
export class ContactController {
  constructor (private readonly contactService: ContactService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create (@UserCustomer() customer: Customer, @Body() createContactDto: CreateContactDto) {
    // TODO: Criar middleware para validar o customer
    if (!customer) {
      throw new BadRequestException('Authenticated user is not related to a client')
    }
    return this.contactService.create(customer, createContactDto)
  }

  @Get()
  findAll (@UserCustomer() customer: Customer) {
    if (!customer) {
      throw new BadRequestException('Authenticated user is not related to a client')
    }
    return this.contactService.findAll(customer)
  }

  @Get(':id')
  findOne (@UserCustomer() customer: Customer, @Param('id') id: string) {
    if (!customer) {
      throw new BadRequestException('Authenticated user is not related to a client')
    }

    return this.contactService.findOne(customer, +id)
  }

  @Patch(':id')
  update (@UserCustomer() customer: Customer, @Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    if (!customer) {
      throw new BadRequestException('Authenticated user is not related to a client')
    }
    return this.contactService.update(customer, +id, updateContactDto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove (@UserCustomer() customer: Customer, @Param('id') id: string) {
    return this.contactService.remove(customer, +id)
  }
}
