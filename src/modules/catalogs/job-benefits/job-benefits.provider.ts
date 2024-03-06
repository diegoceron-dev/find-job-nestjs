import { DataSource } from 'typeorm';
import { JobBenefit } from './entities/job-benefit.entity';

export const jobBenefitsProviders = [
  { 
    provide: 'JOB_BENEFIT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(JobBenefit),
    inject: ['DATA_SOURCE'],
  },
]; 