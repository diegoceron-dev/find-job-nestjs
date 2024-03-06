import { Exchange } from "src/modules/catalogs/exchange/entities/exchange.entity"
import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

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

    @Column({ type: 'varchar', array: true })
    benefits: string[];
}
