import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserService } from '../services/create.user.service';
import { FindAllUserService } from '../services/findAll.user.service';
import { FindOneUserService } from '../services/findOne.user.service';
import { UpdateUserService } from '../services/update.user.service';
import { DeleteUserService } from '../services/delete.user.service';
import { DeletePhotoUserService } from '../services/deletePhoto.user.service';


@Controller('user')
export class UserController {
  constructor(
    private readonly _createUserService: CreateUserService,
    private readonly _findAllUserService: FindAllUserService,
    private readonly _findOneUserService: FindOneUserService,
    private readonly _updateUserService: UpdateUserService,
    private readonly _deleteUserService: DeleteUserService,
    private readonly _deletePhotoUserService: DeletePhotoUserService
  ) { }

  @Post()
  async create(@Body() data: CreateUserDto) {
    return this._createUserService.execute(data).catch((error) => {
      throw new NotFoundException(error.message)
    });
  }

  @Get()
  async findAll() {
    return this._findAllUserService.execute().catch((error) => {
      throw new NotFoundException(error.message)
    });
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this._findOneUserService.execute(id).catch((error) => {
      throw new NotFoundException(error.message)
    });
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateUserDto) {
    return this._updateUserService.execute(id, data).catch((error) => {
      throw new NotFoundException(error.message)
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this._deleteUserService.execute(id).catch((error) => {
      throw new NotFoundException(error.message)
    });
  }

  @Delete(':userId/photos/:photoId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteImage(@Param('userId', ParseIntPipe) userId: number, @Param('photoId', ParseIntPipe) photoId: number) {
    return this._deletePhotoUserService.execute(userId, photoId);
  }
}