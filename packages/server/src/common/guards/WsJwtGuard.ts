import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Socket } from 'socket.io'
import { WsException } from '@nestjs/websockets'
import { AuthService } from '../../modules/auth/auth.service'

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private authService: AuthService) {

  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    let client: Socket
    try {
      client = context.switchToWs().getClient()
      const authToken = client.handshake?.query?.token
      const user = this.authService.verifyUser(authToken as string)
      return Boolean(user)
    }
    catch (e) {
      client.emit('unauthorized', '用户信息校验失败,请重新登录!')
      client.disconnect()
      throw new WsException(e.message)
    }
  }
}
