import { Job } from "src/modules/job/entities/job.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Apply {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.applies)
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => Job, job => job.applies)
    @JoinColumn({ name: 'jobId' })
    job: Job;
}
