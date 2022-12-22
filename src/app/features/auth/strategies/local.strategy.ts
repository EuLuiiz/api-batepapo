import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ValidateUserAuthService } from '../services/validateUser.auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private _validateUserService: ValidateUserAuthService) {
        super({ usernameField: 'email' });
    }

    validate(email: string, password: string) {
        return this._validateUserService.execute(email, password);
    }
}