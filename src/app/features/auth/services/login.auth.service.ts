import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IService } from "../../../../app/core/interfaces/service.interface";
import { User } from '../../users/interfaces/user.entity';
import { UserPayload } from '../models/UserPayload';
import { UserToken } from '../models/UserToken';

@Injectable()
export class LoginAuthService implements IService {
    constructor(private readonly _jwtService: JwtService) { }

    async execute(data: User): Promise<UserToken> {
        try {
            const payload: UserPayload = {
                sub: data.id,
                nickname: data.nickname,
                email: data.email
            };

            const jwtoken = await this._jwtService.sign(payload)

            return {
                access_token: jwtoken
            }
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }
}