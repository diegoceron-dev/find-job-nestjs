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
    try {
      const benefits = dto.benefits.map((benefitId) => {
        return {
          id: benefitId,
        };
      });

      const request = {
        active: true,
        benefits: benefits,
        company: { id: dto.companyId },
        description: dto.description,
        exchange: {
          id: dto.exchange,
        },
        monthlySalary: dto.monthlySalary,
        requirements: dto.requirements,
        responsibilities: dto.responsibilities,
        title: dto.title,
        user: {
          id: userId,
        },
        applies: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      console.log(request);

      const job = await this.repository.save(request);

      console.log(job);
      return job;
    } catch (error) {
      console.error('Error al crear el job:', error);
      throw new Error('Error al crear el job');
    }
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
    return `This action updates a #${id} job ${dto.active}`;
  }

  async remove(id: number) {
    const job = this.repository.exists({ where: { id } });

    if (!job) throw new NotFoundException();

    this.repository.delete(id);
  }
}
