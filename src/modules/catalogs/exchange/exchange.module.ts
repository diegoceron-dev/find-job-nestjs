import { Module } from '@nestjs/common';
import { ExchangeService } from './exchange.service';
import { ExchangeController } from './exchange.controller';
import { DatabaseModule } from 'src/config/database.module';
import { exchangeProviders } from './exchange.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [ExchangeController],
  providers: [...exchangeProviders ,ExchangeService],
})
export class ExchangeModule {}
