export class Job {
    UUID: string
    title: string
    description: string
    monthlySalary: number
    exchange: 'MXN' | 'USD'
    benefits: Array<string>
}
