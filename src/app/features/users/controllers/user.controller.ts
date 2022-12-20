import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() data: CreateUserDto) {
    return this.userService.create(data).catch((error) => {
      throw new NotFoundException(error.message)
    });
  }

  @Get()
  findAll() {
    return this.userService.findAll().catch((error) => {
      throw new NotFoundException(error.message)
    });
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id) {
    return this.userService.findOne(id).catch((error) => {
      throw new NotFoundException(error.message)
    });
  }

  @Put(':id')
  update(@Param('id',ParseIntPipe) id, @Body() data: UpdateUserDto) {
    return this.userService.update(id, data).catch((error) => {
      throw new NotFoundException(error.message)
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id) {
    return this.userService.remove(id).catch((error) => {
      throw new NotFoundException(error.message)
    });
  }
}