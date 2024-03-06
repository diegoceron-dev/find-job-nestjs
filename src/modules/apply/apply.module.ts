import { Module } from '@nestjs/common';
import { ApplyService } from './apply.service';
import { ApplyController } from './apply.controller';
import { DatabaseModule } from 'src/config/database.module';
import { applyProvider } from './apply.provider';

@Module({
  imports: [DatabaseModule],  
  controllers: [ApplyController],
  providers: [...applyProvider, ApplyService],
})
export class ApplyModule {}
