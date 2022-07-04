import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'
import { Public } from './types/decorators/public.decorator'

@Controller('auth')
export class AuthController {
  constructor (private readonly authService: AuthService) {}

    @Public()
    @Post()
    @HttpCode(HttpStatus.OK)
  login (@Body() { token }: AuthDto) {
    return this.authService.login(token)
  }
}
