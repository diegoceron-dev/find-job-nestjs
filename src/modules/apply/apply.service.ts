import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateApplyDto } from './dto/update-apply.dto';
import { Repository } from 'typeorm';
import { Apply } from './entities/apply.entity';

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

  async findAll() {
    const applies = await this.repository.find({ relations: ['user', 'job'] });
    return applies;
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
