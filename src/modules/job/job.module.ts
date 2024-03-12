import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { DatabaseModule } from 'src/config/database.module';
import { jobProvider } from './job.provider';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { userProviders } from '../user/user.provider';
import { UserTypeService } from '../catalogs/user-type/user-type.service';
import { companyProviders } from '../company/company.provider';
import { CompanyService } from '../company/company.service';
import { userTypeProviders } from '../catalogs/user-type/user-type.provider';
import { UserService } from '../user/user.service';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [JobController],
  providers: [
    ...jobProvider,
    JobService,
    AuthService,
    JwtService,
    ...companyProviders,
    CompanyService,
    ...userTypeProviders,
    UserTypeService,
    ...userProviders,
    UserService
  ]
})
export class JobModule {}
