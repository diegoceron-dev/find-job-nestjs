import { Module } from '@nestjs/common';
import { ApplyService } from './apply.service';
import { ApplyController } from './apply.controller';
import { DatabaseModule } from 'src/config/database.module';
import { applyProvider } from './apply.provider';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from '../auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { JobService } from '../job/job.service';
import { companyProviders } from '../company/company.provider';
import { CompanyService } from '../company/company.service';
import { userTypeProviders } from '../catalogs/user-type/user-type.provider';
import { UserTypeService } from '../catalogs/user-type/user-type.service';
import { UserService } from '../user/user.service';
import { userProviders } from '../user/user.provider';
import { jobProvider } from '../job/job.provider';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [ApplyController],
  providers: [
    ...applyProvider,
    ApplyService,
    ...jobProvider,
    JobService,
    AuthService,
    JwtService,
    ...companyProviders,
    CompanyService,
    ...userTypeProviders,
    UserTypeService,
    ...userProviders,
    UserService,
  ],
})
export class ApplyModule {}
