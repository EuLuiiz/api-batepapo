import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { PrismaService } from '../../../app/core/database/prisma/prisma.service';
import { CreateUserService } from './services/create.user.service';
import { FindAllUserService } from './services/findAll.user.service';
import { FindOneUserService } from './services/findOne.user.service';
import { UpdateUserService } from './services/update.user.service';
import { DeleteUserService } from './services/delete.user.service';
import { DeletePhotoUserService } from './services/deletePhoto.user.service';
import { FindByEmailUserService } from './services/findByEmail.user.service';

@Module({
  controllers: [UserController],
  providers: [PrismaService, CreateUserService, FindAllUserService, FindOneUserService, UpdateUserService, DeleteUserService, DeletePhotoUserService, FindByEmailUserService],
  exports: [FindByEmailUserService]
})
export class UserModule { }
