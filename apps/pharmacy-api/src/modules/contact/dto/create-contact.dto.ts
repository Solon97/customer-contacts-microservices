import { Type } from 'class-transformer'
import { IsString, Length, MaxLength, ValidateNested } from 'class-validator'

export class ContactDto {
    @MaxLength(240)
    @IsString()
      name: string

    @Length(10, 13)
    @IsString()
      cellphone: string
}

export class CreateContactDto {
    @ValidateNested({ each: true })
    @Type(() => ContactDto)
      contacts: ContactDto[]
}
