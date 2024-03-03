import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 150 })
    email: string

    @Column({ length: 500 })
    password: string
    
    @Column()
    type: number
}
