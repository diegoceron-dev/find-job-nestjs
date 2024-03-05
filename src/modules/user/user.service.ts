import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserType } from '../catalogs/user-type/entities/user-type.entity';
import { Crypt } from 'src/config/encrypt';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private repository: Repository<User>,
    @Inject('USER_TYPE_REPOSITORY')
    private userTypeRepository: Repository<UserType>,
  ) {}

  async create(dto: CreateUserDto) {
    const { email, password, userTypeId } = dto;
    const passwordToEncrypt = process.env.PASSWORD_ENCRYPT
    const passwordEncrypted = await Crypt.encryptItem( password, passwordToEncrypt);
    const typeId =
      userTypeId === null || userTypeId === undefined || userTypeId == 0
        ? 1
        : dto.userTypeId;
    const existUserType = await this.userTypeRepository.exists({
      where: { id: typeId },
    });

    if (!existUserType) throw new Error('User not found');

    return await this.repository.save({
      email,
      password: passwordEncrypted,
      userType: {
        id: typeId
      }
    });
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: number) {
    return await this.repository.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = this.repository.exists({ where: { id } });

    if (!user) throw new Error('User not found');

    return await this.repository.update(id, dto);
  }

  async remove(id: number) {
    const user = this.repository.exists({ where: { id } });

    if (!user) throw new Error('User not found');

    return await this.repository.delete(id);
  }
}
