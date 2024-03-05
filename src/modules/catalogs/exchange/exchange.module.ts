import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/config/database.module';
import { exchangeProviders } from './exchange.provider';

@Module({
    imports: [DatabaseModule],
    providers: [...exchangeProviders],
})
export class ExchangeModule {}
