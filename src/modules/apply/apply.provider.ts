import { DataSource } from 'typeorm';
import { Apply } from './entities/apply.entity';

export const applyProvider = [
  { 
    provide: 'APPLY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Apply),
    inject: ['DATA_SOURCE'],
  },
];