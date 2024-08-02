import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserRole } from '../types/generic.types';

@Injectable()
export class RolesGuard implements CanActivate {
   constructor(private reflector: Reflector) { }

   canActivate(context: ExecutionContext): boolean {
      const roles = this.reflector.get<UserRole[]>(ROLES_KEY, context.getHandler());
      if (!roles) {
         return true;
      }
      const request = context.switchToHttp().getRequest();
      const user = request.user;
      console.log('user', user)
      if (!user) {
         return false;
      }
      return roles.some((role) => user.userRole?.includes(role));
   }
}
