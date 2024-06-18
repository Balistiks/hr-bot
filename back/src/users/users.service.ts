import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(where?: FindOptionsWhere<User>): Promise<User> {
    return await this.userRepository.findOne({
      where: where,
      relations: ['course', 'question'],
    });
  }

  async save(user: CreateUserDto | UpdateUserDto): Promise<User> {
    return await this.userRepository.save(user);
  }
}
