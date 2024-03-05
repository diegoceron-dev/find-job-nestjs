import { DataSource } from 'typeorm';
import { Exchange } from './entities/exchange.entity';

export const exchangeProviders = [
  { 
    provide: 'EXCHANGE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Exchange),
    inject: ['DATA_SOURCE'],
  },
]; 