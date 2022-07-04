import { ContactDto } from '../dto/create-contact.dto'

export class Contact {
  id?: number
  readonly name: string
  readonly cellphone: string
  createdAt?: string | Date
  updatedAt?: string | Date

  constructor ({ name, cellphone }: ContactDto) {
    this.name = name
    // TODO: Adicionar validação dos números do celular
    this.cellphone = cellphone.replace(/\D/g, '')
  }
}
