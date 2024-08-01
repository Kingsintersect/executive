import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
   canActivate(context: ExecutionContext): boolean {
      return super.canActivate(context) as boolean;
   }
   handleRequest(err: any, user: any, context: ExecutionContext) {
      context
      if (err || !user) {
         throw err || new UnauthorizedException();
      }
      return user;
   }
}