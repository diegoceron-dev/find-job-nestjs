import { UserType } from 'src/modules/catalogs/user-type/entities/user-type.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

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
}
