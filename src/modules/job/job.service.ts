import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Repository } from 'typeorm';
import { Job } from './entities/job.entity';
import { PagerDto } from '../common/dto/pager.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class JobService {
  constructor(
    @Inject('JOB_REPOSITORY')
    private repository: Repository<Job>,
  ) {}

  async create(userId: number, dto: CreateJobDto) {
    const benefits = dto.benefits.map((benefitId) => {
      return {
        id: benefitId,
      };
    });

    const job = {
      title: dto.title,
      description: dto.description,
      monthlySalary: dto.monthlySalary,
      exchange: {
        id: dto.exchange,
      },
      benefits,
      user: {
        id: dto.userId,
      },
      company: {
        id: dto.companyId,
      },
    };

    return this.repository.save(job);
  }

  async findAll(
    filters: {
      companyId: number;
      userId: number;
      categoryId: number;
    },
    pager: PagerDto = {
      page: 1,
      perPage: 10,
    },
  ) {
    const { perPage, page } = pager;

    let query = this.repository.createQueryBuilder('job');

    query = query.leftJoinAndSelect('job.user', 'user');

    query = query.leftJoinAndSelect('job.company', 'company');

    if (filters.userId) {
      const userId = filters.userId;
      query = query.andWhere('job.userId = :userId', { userId });
    }

    if (filters.companyId) {
      const companyId = filters.companyId;
      query = query.andWhere('job.companyId = :companyId', { companyId });
    }

    const [jobs, total] = await query
      .take(perPage)
      .skip((page - 1) * perPage)
      .getManyAndCount();

    if (jobs) {
      jobs.forEach((job, index) => {
        job.user = jobs[index].user = { id: jobs[index].user.id } as User;
      });
    }

    return { jobs, total };
  }

  async findOne(id: number) {
    return await this.repository.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdateJobDto) {
    return `This action updates a #${id} job`;
  }

  async remove(id: number) {
    const job = this.repository.exists({ where: { id } });

    if (!job) throw new NotFoundException();

    this.repository.delete(id);
  }
}
