import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { JobModule } from './job/job.module';
import { ResumeModule } from './resume/resume.module';
import { ApplicationsModule } from './applications/applications.module';
import { ApplyModule } from './apply/apply.module';

@Module({
  imports: [UserModule, JobModule, ResumeModule, ApplicationsModule, ApplyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
