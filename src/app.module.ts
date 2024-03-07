import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { JobModule } from './modules/job/job.module';
import { ResumeModule } from './modules/resume/resume.module';
import { ApplyModule } from './modules/apply/apply.module';
import { CompanyModule } from './modules/company/company.module';
import { ExchangeModule } from './modules/catalogs/exchange/exchange.module';
import { UserTypeModule } from './modules/catalogs/user-type/user-type.module';
import { JobBenefitsModule } from './modules/catalogs/job-benefits/job-benefits.module';

const token = process.env.TOKEN;

@Module({
  imports: [
    //modules
    UserModule,
    JobModule,
    ResumeModule,
    ApplyModule,
    CompanyModule,
    // catalogs
    ExchangeModule,
    UserTypeModule,
    JobBenefitsModule,
    //config
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
