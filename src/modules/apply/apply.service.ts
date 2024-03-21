import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateApplyDto } from './dto/update-apply.dto';
import { Repository } from 'typeorm';
import { Apply } from './entities/apply.entity';
import { PagerDto } from '../common/dto/pager.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ApplyService {
  constructor(
    @Inject('APPLY_REPOSITORY')
    private repository: Repository<Apply>,
  ) {}

  async create(dto: { jobId: number; userId: number }) {
    return this.repository.save({
      job: { id: dto.jobId },
      user: { id: dto.userId },
    });
  }

  async findAll(
    filters: {
      userId: number;
    },
    pager: PagerDto = {
      page: 1,
      perPage: 10,
    },
  ) {
    const { perPage, page } = pager;

    let query = this.repository.createQueryBuilder('apply');

    query = query.leftJoinAndSelect('apply.user', 'user');

    query = query.leftJoinAndSelect('apply.job', 'job');

    if (filters.userId) {
      const userId = filters.userId;
      query = query.andWhere('apply.userId = :userId', { userId });
    }

    const [applies, total] = await query
      .take(perPage)
      .skip((page - 1) * perPage)
      .getManyAndCount();

    // const applies = await this.repository.find({ relations: ['user', 'job'] });

    // return applies;

    return { applies, total };
  }

  async findOne(id: number) {
    return await this.repository.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdateApplyDto) {
    const apply = this.repository.exists({ where: { id } });

    if (!apply) throw new NotFoundException();

    return await this.repository.update(id, {
      job: { id: dto.jobId },
      user: { id: dto.userId },
    });
  }

  async remove(id: number) {
    const apply = this.repository.exists({ where: { id } });

    if (!apply) throw new NotFoundException();

    this.repository.delete(id);
  }
}
