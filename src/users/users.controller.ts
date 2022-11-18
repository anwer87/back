import { UserDto, CrateUser } from './dto/user.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UsersService } from './users.service';
import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Body,
  UseGuards,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/users')
export class UserController {
  constructor(private UserService: UsersService) {}
  @UseGuards(AuthGuard('jwt'))
  @Get('/')
  async getAllUsers() {
    return await this.UserService.getAllUsers();
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('/user:name')
  async getSpecificUser(@Param('name') name: string): Promise<object> {
    return this.UserService.getSpecificUser(name);
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('/createUser')
  async create(@Body() dto: CrateUser): Promise<object> {
    return await this.UserService.crateUser(dto);
  }
  @UseGuards(AuthGuard('jwt'))
  @Patch('/update:name')
  async update(
    @Param('name') name: string,
    @Body() dto: UserDto,
  ): Promise<object> {
    return await this.UserService.updateUser(name, dto);
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete('/delete/:id')
  async delete(@Param() params): Promise<object> {
    return await this.UserService.deleteUser(+params.id);
  }
}
