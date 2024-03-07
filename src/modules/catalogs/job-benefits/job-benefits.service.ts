import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobBenefitDto } from './dto/create-job-benefit.dto';
import { UpdateJobBenefitDto } from './dto/update-job-benefit.dto';
import { Repository } from 'typeorm';
import { JobBenefit } from './entities/job-benefit.entity';

@Injectable()
export class JobBenefitsService {
  constructor(
    @Inject('JOB_BENEFIT_REPOSITORY')
    private repository: Repository<JobBenefit>,
  ) {}


  async create(dto: CreateJobBenefitDto) {
    return this.repository.save(dto);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: number) {
    return await this.repository.find();
  }

  async update(id: number, dto: UpdateJobBenefitDto) {
    const jobBenefit = this.repository.exists({ where: { id } });

    if (!jobBenefit) throw new NotFoundException();

    return await this.repository.update(id, dto);
  }

  async remove(id: number) {
    const jobBenefit = this.repository.exists({ where: { id } });

    if (!jobBenefit) throw new NotFoundException();

    this.repository.delete(id);
  }
}
