import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
