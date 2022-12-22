import { Injectable } from '@nestjs/common';
import { FindByEmailUserService } from '../../users/services/findByEmail.user.service';
import * as bcrypt from 'bcrypt';
import { User } from '../../users/interfaces/user.entity';
import { UserPayload } from '../models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from '../models/UserToken';

@Injectable()
export class AuthService {
    constructor(private readonly _findUserByEmailService: FindByEmailUserService, private readonly _jwtService: JwtService) { }

    async login(user: User): Promise<UserToken> { //Já vai receber do Guard o dado do usuário então a função dele é gerar o Token
        const payload: UserPayload = {
            sub: user.id,
            nickname: user.nickname,
            email: user.email
        };

        const jwtoken = await this._jwtService.sign(payload)

        return {
            access_token: jwtoken
        }
    }

    async validateUser(email: string, password: string) {
        const user = await this._findUserByEmailService.execute(email);
        if (user) {
            const isPassValid = bcrypt.compareSync(password, user.password)
            if (isPassValid) {
                return {
                    ...user,
                    //Transformar em um helper de convertor de dados
                    password: null
                }
            }
        }
        throw new Error('Email e/ou senha incorreto(s).')
    }
}
