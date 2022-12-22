import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable() //Uma ponte entre as autenticação
export class LocalAuthGuard extends AuthGuard('local') { //AuthGuard recebe o nome da estratégia que iremos usar
    canActivate(context: ExecutionContext) {
        return super.canActivate(context);
    }

    // tratamento de erro dentro do mecanismo que gera JWT
    handleRequest(err, user) {
        if (err || !user) {
            throw new UnauthorizedException(err?.message);
        }

        return user;
    }
}