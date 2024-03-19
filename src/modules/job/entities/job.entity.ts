import { Apply } from 'src/modules/apply/entities/apply.entity';
import { Exchange } from 'src/modules/catalogs/exchange/entities/exchange.entity';
import { JobBenefit } from 'src/modules/catalogs/job-benefits/entities/job-benefit.entity';
import { Company } from 'src/modules/company/entities/company.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  title: string;

  @Column({ length: 150 })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  monthlySalary: number;

  @Column({ type: 'boolean', default: false })
  active: boolean;

  @Column({ type: 'text' })
  responsibilities: string;

  @Column({ type: 'text' })
  requirements: string;

  @ManyToOne(() => Exchange, (exchange) => exchange.jobs)
  exchange: Exchange;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToMany(() => JobBenefit, (jobBenefit) => jobBenefit.jobs)
  @JoinTable()
  benefits: JobBenefit[];

  @OneToMany(() => Apply, (apply) => apply.user)
  applies: Apply[];

  @ManyToOne(() => Company, (company) => company.id)
  @JoinColumn()
  company: Company;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User;
}
