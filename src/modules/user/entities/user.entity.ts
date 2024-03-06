import { UserType } from 'src/modules/catalogs/user-type/entities/user-type.entity';
import { Company } from 'src/modules/company/entities/company.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 150 })
    email: string

    @Column({ length: 500 })
    password: string
    
    @ManyToOne(() => UserType, userType => userType.users)
    userType: UserType;

    @ManyToOne(() => Company, company => company.users)
    company: Company;
}
