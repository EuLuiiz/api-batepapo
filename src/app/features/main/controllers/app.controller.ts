import { Controller, Get } from '@nestjs/common';
import { CurrentUser } from '../../auth/decorators/currentUser.decorator';
import { IsPublic } from '../../auth/decorators/isPublic.decorator';
import { User } from '../../users/interfaces/user.entity';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @IsPublic()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('me')
  getMe(@CurrentUser() user: User): string {
    return `O usuário retirado do Token JWT é: ${user.nickname} e seu ID é: '${user.id}'`
  }
}
