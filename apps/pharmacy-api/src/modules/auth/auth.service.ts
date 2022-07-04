import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '../user/entities/user.entity'
import { UserService } from '../user/user.service'
import { UserToken } from './dto/user-jwt-token.dto'
import { UserPayload } from './types/UserPayload'

@Injectable()
export class AuthService {
  constructor (private readonly jwtService: JwtService,
            private readonly userService: UserService) {}

  async login (token: string): Promise<UserToken> {
    const user: User = await this.validateUser(token)

    const payload: UserPayload = {
      token: user.token,
      sub: user.id
    }

    return {
      accessToken: this.jwtService.sign(payload)
    }
  }

  async validateUser (token: string): Promise<User> {
    const user = await this.userService.findByToken(token)
    if (!user) {
      throw new UnauthorizedException('User not Found')
    }

    return user
  }
}
