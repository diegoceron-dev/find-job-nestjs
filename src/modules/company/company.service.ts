import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';

@Injectable()
export class CompanyService {
  constructor(
    @Inject('COMPANY_REPOSITORY')
    private repository: Repository<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    this.repository.save(createCompanyDto);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id?: number, userId?: number) {
    let query = this.repository.createQueryBuilder('company');

    query = query.leftJoinAndSelect('company.users', 'users');

    if (id) query = query.where('company.id = :id', { id });

    if (userId) query = query.andWhere('users.id = :userId', { userId });

    const company = await query.getOne();

    const response = Object.assign({}, company);

    if (company && company.users) {
      response.users = company.users.map((user) => ({ id: user.id })) as User[];
    }

    return company;
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    const company = await this.findOne(id);

    if (!company) throw new NotFoundException();

    return await this.repository.save(updateCompanyDto);
  }

  async remove(id: number) {
    const company = await this.findOne(id);

    if (!company) throw new NotFoundException();

    this.repository.delete(id);
  }
}
