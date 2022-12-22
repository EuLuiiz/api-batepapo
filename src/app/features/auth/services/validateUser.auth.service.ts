import { Injectable } from '@nestjs/common';
import { IService } from "../../../../app/core/interfaces/service.interface";
import { FindByEmailUserService } from '../../users/services/findByEmail.user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ValidateUserAuthService implements IService {
    constructor(private readonly _findUserByEmailService: FindByEmailUserService) { }

    async execute(email: string, password: string) {
        try {
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
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }
}