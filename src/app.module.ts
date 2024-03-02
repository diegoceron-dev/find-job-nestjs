import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { JobModule } from './job/job.module';

@Module({
  imports: [UserModule, JobModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
