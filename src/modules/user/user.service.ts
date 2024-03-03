import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import Crypt from 'src/config/encrypt';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password, type } = createUserDto;

    // const passwordEncrypt = await Crypt.encryptItem('password');

    const typeUser = type ?? 1;

    return this.userRepository.save({
      email,
      password: password,
      type: typeUser,
    });
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (!user) throw new Error('User not found');

    return await this.userRepository.save(updateUserDto);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) throw new Error('User not found');

    this.userRepository.delete(id);
  }
}
