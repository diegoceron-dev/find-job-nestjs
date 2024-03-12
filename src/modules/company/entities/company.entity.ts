import { Job } from 'src/modules/job/entities/job.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm';

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 150 })
    name: string

    @Column({ length: 500 })
    description: string

    @Column({ length: 500 })
    rfc: string

    @OneToMany(() => User, user => user.company)
    users: User[];

    @OneToMany(() => Job, job => job.company)
    job: Job;
}
