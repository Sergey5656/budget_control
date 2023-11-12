import { Category } from 'src/category/entities/category.entity'
import { User } from 'src/users/entities/user.entity'
import { JoinColumn, Entity, PrimaryColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn({ name: 'transaction_id' })
    id: number

    @Column({ nullable: true })
    type: string

    @Column()
    title: string
    @Column()
    amount: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date


    @ManyToOne(() => User, (user) => user.transactions)
    @JoinColumn({ name: 'user_id' })
    user: User

    @ManyToOne(() => Category, (category) => category.transactions, {onDelete: 'SET NULL'})
    @JoinColumn({ name: 'category_id' })
    category: Category

}
