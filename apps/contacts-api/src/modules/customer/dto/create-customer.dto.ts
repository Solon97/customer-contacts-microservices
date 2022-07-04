import { IsNotEmpty, IsString } from 'class-validator'

export class CreateCustomerDto {
    @IsNotEmpty()
    @IsString()
      name: string

    @IsNotEmpty()
    @IsString()
      api_token: string

    @IsNotEmpty()
    @IsString()
      api_address: string
}
