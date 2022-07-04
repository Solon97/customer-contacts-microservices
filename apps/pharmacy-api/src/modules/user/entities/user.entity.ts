import { Prisma } from '@pharmacy-api/prisma/client'

export class User implements Prisma.UserUncheckedCreateInput {
  id?: number
  username: string
  token: string
  isAdmin: boolean
  createdAt?: Date | string
  updatedAt?: Date | string
}
