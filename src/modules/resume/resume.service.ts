import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { Repository } from 'typeorm';
import { Resume } from './entities/resume.entity';

@Injectable()
export class ResumeService {
  constructor(
    @Inject('RESUME_REPOSITORY')
    private repository: Repository<Resume>,
  ) {}

  async create(dto: CreateResumeDto) {
    return this.repository.save(dto);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: number) {
    return await this.repository.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdateResumeDto) {
    const resume = this.repository.exists({ where: { id } });

    if (!resume) throw new NotFoundException();

    return await this.repository.update(id, dto);
  }

  async remove(id: number) {
    const resume = this.repository.exists({ where: { id } });

    if (!resume) throw new NotFoundException();

    this.repository.delete(id);
  }
}
