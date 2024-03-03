import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
