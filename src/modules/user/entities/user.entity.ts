import { Apply } from 'src/modules/apply/entities/apply.entity';
import { UserType } from 'src/modules/catalogs/user-type/entities/user-type.entity';
import { Company } from 'src/modules/company/entities/company.entity';
import { Job } from 'src/modules/job/entities/job.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';

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

    @OneToMany(() => Apply, apply => apply.user)
    applies: Apply[];

    @ManyToOne(() => Job, job => job.id)
    job: Job;
}
