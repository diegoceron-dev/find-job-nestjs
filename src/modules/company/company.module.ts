import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { DatabaseModule } from '../../config/database.module';
import { companyProviders } from './company.provider';

@Module({
  imports: [DatabaseModule],  
  controllers: [CompanyController],
  providers: [...companyProviders, CompanyService],
})
export class CompanyModule {}
  