import { DataSource } from 'typeorm';
import { Job } from './entities/job.entity';

export const jobProvider = [
  { 
    provide: 'JOB_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Job),
    inject: ['DATA_SOURCE'],
  },
];