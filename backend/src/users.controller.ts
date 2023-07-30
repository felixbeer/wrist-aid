import { Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiProperty } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { UsersService } from './services/users.service';

export class UserRegisterDto {
  @ApiProperty({ type: String })
  role: string;
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Get()
  @ApiOkResponse({
    type: Array<User>,
  })
  async allUsers(): Promise<User[]> {
    return await this.usersService.getAllUsers();
  }

  @Post('register')
  @ApiBody({
    description: 'user specific data',
    type: UserRegisterDto,
  })
  async register(userRegisterDto: UserRegisterDto) {
    let user = new User();
    user.latitude = 0;
    user.longitude = 0;
    user = await this.usersService.storeUser(user);
    return { id: user.id };
  }
}