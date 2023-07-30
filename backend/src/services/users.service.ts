import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {
  }

  async storeUser(user: User) {
    const newUser: User = new User();
    newUser.latitude = user.latitude;
    newUser.longitude = user.longitude;

    if (user.id != 0) {
      newUser.id = user.id;
    }

    await this.usersRepository.save(newUser);
  }

  getAllUsers() {
    return this.usersRepository.find();
  }
}