import { Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../guards/localAuth.guard';
import { AuthService } from '../services/auth.service';

@Controller()
export class AuthController {
    constructor(private readonly _authService: AuthService) { }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    login() {
        // return this._authService.login();
    }

}
