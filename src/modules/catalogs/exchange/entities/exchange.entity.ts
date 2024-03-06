import { Job } from 'src/modules/job/entities/job.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Exchange {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 50 })
    name: string

    @Column({ length: 150 })
    description: string

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amountUSD: number

    @OneToMany(() => Job, job => job.exchange)
    jobs: Job[];
}
