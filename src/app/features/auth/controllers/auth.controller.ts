import { Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { IsPublic } from '../decorators/isPublic.decorator';
import { LocalAuthGuard } from '../guards/localAuth.guard';
import { AuthRequest } from '../models/AuthRequest';
import { LoginAuthService } from '../services/login.auth.service';

@Controller()
export class AuthController {
    constructor(private readonly _loginAuthService: LoginAuthService) { }

    @IsPublic()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    login(@Request() data: AuthRequest) {
        return this._loginAuthService.execute(data.user);
    }

}
