import { Customer } from '../../customer/entities/customer.entity'

export class User {
  id?: number
  username: string
  token: string
  customerId?: number
  customer?: Customer
  isAdmin?: boolean
  createdAt?: Date | string
  updatedAt?: Date | string
}
