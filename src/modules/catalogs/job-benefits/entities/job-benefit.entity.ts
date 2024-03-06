import { Job } from "src/modules/job/entities/job.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class JobBenefit {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 50 })
    name: string

    @Column({ length: 50 })
    icon: string

    @Column({ length: 150 })
    description: string

    @ManyToMany(() => Job, job => job.benefits)
    @JoinTable()
    jobs: Job[];
}
