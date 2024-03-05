import { Inject, Injectable } from '@nestjs/common';
import { CreateExchangeDto } from './dto/create-exchange.dto';
import { UpdateExchangeDto } from './dto/update-exchange.dto';
import { Repository } from 'typeorm';
import { Exchange } from './entities/exchange.entity';

@Injectable()
export class ExchangeService {
  constructor(
    @Inject('EXCHANGE_REPOSITORY')
    private repository: Repository<Exchange>,
  ) {}

  async create(dto: CreateExchangeDto) {
    return this.repository.save(dto);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: number) {
    return await this.repository.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdateExchangeDto) {
    const exchange = this.repository.exists({ where: { id } });

    if (!exchange) throw new Error('Exchange not found');

    return await this.repository.update(id, dto);
  }

  async remove(id: number) {
    const exchange = this.repository.exists({ where: { id } });

    if (!exchange) throw new Error('Exchange not found');

    this.repository.delete(id);
  }
}
