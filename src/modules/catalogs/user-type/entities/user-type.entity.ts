import { User } from 'src/modules/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class UserType {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 50 })
    description: string

    @OneToMany(() => User, user => user.userType)
    users: User[];
}
