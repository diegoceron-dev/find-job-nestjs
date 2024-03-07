import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyService {
  constructor(
    @Inject('COMPANY_REPOSITORY')
    private repository: Repository<Company>,
  ) {}

  create(createCompanyDto: CreateCompanyDto) {
    this.repository.save(createCompanyDto)
    return 'This action adds a new company';
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: number) {
    return await this.repository.findOne({ where: { id } });
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
