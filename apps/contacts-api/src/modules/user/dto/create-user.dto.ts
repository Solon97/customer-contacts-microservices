import { IsBoolean, IsDefined, IsNumber, IsString, ValidateIf } from 'class-validator'
import { User } from '../entities/user.entity'

export class CreateUserDto implements Partial<User> {
    @IsString()
      username: string

    @ValidateIf(o => !o.customerId)
    @IsDefined()
    @IsBoolean()
      isAdmin: boolean

    @ValidateIf(o => !o.isAdmin)
    @IsDefined()
    @IsNumber()
      customerId?: number
}
