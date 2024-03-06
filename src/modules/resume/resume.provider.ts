import { DataSource } from 'typeorm';
import { Resume } from './entities/resume.entity';

export const resumeProviders = [
  { 
    provide: 'RESUME_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Resume),
    inject: ['DATA_SOURCE'],
  },
]; 