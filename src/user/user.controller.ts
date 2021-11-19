import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GlobalResponseSwagger } from "@/src/decorators/swagger.decorator";

import { UserService } from './user.service';
import { ListUserDto   } from './dto/list-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Post()
  @GlobalResponseSwagger()
  @ApiOperation({ summary: 'create a new user' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @GlobalResponseSwagger()
  @ApiOperation({ summary: 'get users by filter,or users' })
  findAll(@Query() listUserDto: ListUserDto) {
    return this.userService.findAll(listUserDto);
  }

  @Get(':id')
  @GlobalResponseSwagger()
  @ApiOperation({ summary: 'get user by id' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @GlobalResponseSwagger()
  @ApiOperation({ summary: 'update user by id' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @GlobalResponseSwagger()
  @ApiOperation({ summary: 'remove user by id' })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
