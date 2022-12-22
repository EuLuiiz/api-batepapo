import { Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../guards/localAuth.guard';
import { AuthRequest } from '../models/AuthRequest';
import { AuthService } from '../services/auth.service';

@Controller()
export class AuthController {
    constructor(private readonly _authService: AuthService) { }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    login(@Request() data: AuthRequest) {
        return this._authService.login(data.user);
    }

}
