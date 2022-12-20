import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { PrismaService } from '../../../app/core/database/prisma/prisma.service';

@Module({
  controllers: [UserController],
  providers: [UserService,PrismaService]
})
export class UserModule {}
