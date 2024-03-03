export class Job {
    id: number
    title: string
    description: string
    monthlySalary: number
    exchange: 'MXN' | 'USD'
    benefits: Array<string>
}
