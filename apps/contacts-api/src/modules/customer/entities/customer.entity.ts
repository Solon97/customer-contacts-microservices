import { User } from '../../user/entities/user.entity'

export class Customer {
  id?: number
  name: string
  api_token: string
  api_address: string
  user?: User[]
  createdAt?: string | Date
  updatedAt?: string | Date
}
