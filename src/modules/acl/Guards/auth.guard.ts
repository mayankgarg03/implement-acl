import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
require('dotenv').config();

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(req);
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    let tokenDetails: any;
    try {
      tokenDetails = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
    } catch (error) {
      throw new UnauthorizedException({
        message: 'Missing Token',
      });
    }
    const hasAccess = roles.includes(tokenDetails.role);
    if (!hasAccess) {
      throw new UnauthorizedException({
        message: 'Not authorized to access endpoint',
      });
    }
    return hasAccess;
  }

  private extractTokenFromHeader(req: any): string | undefined {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
