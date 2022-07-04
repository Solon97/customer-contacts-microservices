import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common'
import { Admin } from '../auth/types/decorators/admin.decorator'
import { CustomerService } from './customer.service'
import { CreateCustomerDto } from './dto/create-customer.dto'
import { UpdateCustomerDto } from './dto/update-customer.dto'

@Controller('customer')
export class CustomerController {
  constructor (private readonly customerService: CustomerService) {}

  @Admin()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create (@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto)
  }

  @Admin()
  @Get()
  findAll () {
    return this.customerService.findAll()
  }

  @Admin()
  @Get(':id')
  findOne (@Param('id') id: string) {
    return this.customerService.findOne(+id)
  }

  @Admin()
  @Patch(':id')
  update (@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.update(+id, updateCustomerDto)
  }

  @Admin()
  @Delete(':id')
  remove (@Param('id') id: string) {
    return this.customerService.remove(+id)
  }
}
