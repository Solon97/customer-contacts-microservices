import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { AuthRequest } from '../AuthRequest'

export const UserCustomer = createParamDecorator((data, context: ExecutionContext) => {
  const { principal } = context.switchToHttp().getRequest<AuthRequest>()

  return principal.customer
})
