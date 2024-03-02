import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'tu_usuario',
      password: 'tu_contraseña',
      database: 'tu_basededatos',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true
    }),
  ],
})
export class DatabaseModule {}