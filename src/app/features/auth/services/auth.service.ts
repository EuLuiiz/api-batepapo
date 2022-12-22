import { Injectable } from '@nestjs/common';
import { FindByEmailUserService } from '../../users/services/findByEmail.user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly _findUserByEmailService: FindByEmailUserService) { }

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
