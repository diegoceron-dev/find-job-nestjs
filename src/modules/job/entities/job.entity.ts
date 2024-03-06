import { Exchange } from "src/modules/catalogs/exchange/entities/exchange.entity"
import { JobBenefit } from "src/modules/catalogs/job-benefits/entities/job-benefit.entity"
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Job {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 150 })
    title: string
    
    @Column({ length: 150 })
    description: string

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    monthlySalary: number

    @ManyToOne(() => Exchange, exchange => exchange.jobs)
    exchange: Exchange;

    @ManyToMany(() => JobBenefit, jobBenefit => jobBenefit.jobs)
    @JoinTable()
    benefits: JobBenefit[];
}
