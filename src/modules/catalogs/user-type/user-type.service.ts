import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserTypeDto } from './dto/create-user-type.dto';
import { UpdateUserTypeDto } from './dto/update-user-type.dto';
import { Repository } from 'typeorm';
import { UserType } from './entities/user-type.entity';

@Injectable()
export class UserTypeService {
  constructor(
    @Inject('USER_TYPE_REPOSITORY')
    private repository: Repository<UserType>,
  ) {}

  async create(dto: CreateUserTypeDto) {
    return this.repository.save(dto);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: number) {
    return await this.repository.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdateUserTypeDto) {
    const userType = this.repository.exists({ where: { id } });

    if (!userType) throw new NotFoundException();

    return await this.repository.update(id, dto);
  }

  async remove(id: number) {
    const userType = this.repository.exists({ where: { id } });

    if (!userType) throw new NotFoundException();

    this.repository.delete(id);
  }
}
