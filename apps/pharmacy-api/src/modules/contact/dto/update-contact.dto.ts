import { PartialType } from '@nestjs/mapped-types'
import { ContactDto } from './create-contact.dto'

export class UpdateContactDto extends PartialType(ContactDto) {}
