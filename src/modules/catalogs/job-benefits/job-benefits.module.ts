import { Module } from '@nestjs/common';
import { JobBenefitsService } from './job-benefits.service';
import { JobBenefitsController } from './job-benefits.controller';
import { jobBenefitsProviders } from './job-benefits.provider';
import { DatabaseModule } from 'src/config/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [JobBenefitsController],
  providers: [...jobBenefitsProviders ,JobBenefitsService],
})
export class JobBenefitsModule {}
