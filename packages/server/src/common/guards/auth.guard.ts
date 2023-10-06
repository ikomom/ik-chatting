import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { AuthService } from '../../modules/auth/auth.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = request.get('Authorization')
    // TODO: token
    if (token)
      return true || Boolean(await this.authService.verifyUser(token))

    return false
  }
}
