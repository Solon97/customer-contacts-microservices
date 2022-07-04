import { ContactDto } from '../dto/create-contact.dto'

export class Contact {
  id?: number
  readonly name: string
  readonly cellphone: string
  createdAt?: string | Date
  updatedAt?: string | Date

  constructor ({ name, cellphone }: ContactDto) {
    this.name = this.formatName(name)
    this.cellphone = this.formatCellphone(cellphone)
  }

  formatCellphone (name: string): string {
    const onlyNumbers = name.replace(/\D/g, '')
    const ddiPhone = onlyNumbers.slice(0, 2)
    const dddPhone = onlyNumbers.slice(2, 4)
    const phoneNumber = onlyNumbers.slice(4)

    const firstNumbers = phoneNumber.length === 8
      ? phoneNumber.slice(0, 4)
      : phoneNumber.slice(0, 5)

    const lastNumbers = phoneNumber.length === 8
      ? phoneNumber.slice(4)
      : phoneNumber.slice(5)

    return `+${ddiPhone} (${dddPhone}) ${firstNumbers}-${lastNumbers}`
  }

  formatName (name) {
    return name.toUpperCase()
  }
}
