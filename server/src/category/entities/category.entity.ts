import { Transaction } from "src/transaction/entities/transaction.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn({ name: 'category_id' })
    id: number

    @Column()
    title: string

    @CreateDateColumn()
    createAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(() => User, (user) => user.categories)
    @JoinColumn({ name: 'user_id' })
    user: User

    @OneToMany(() => Transaction, (transaction) => transaction.category)
    transactions: Transaction[]
}