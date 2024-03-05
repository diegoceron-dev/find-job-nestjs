import { DataSource } from 'typeorm';
import { UserType } from './entities/user-type.entity';

export const userTypeProviders = [
  { 
    provide: 'USER_TYPE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(UserType),
    inject: ['DATA_SOURCE'],
  },
]; 