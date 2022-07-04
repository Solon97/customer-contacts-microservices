import { IsBoolean, IsString } from 'class-validator'
import { User } from '../entities/user.entity'

export class CreateUserDto implements Partial<User> {
    @IsString()
      username: string

    @IsBoolean()
      isAdmin: boolean
}
