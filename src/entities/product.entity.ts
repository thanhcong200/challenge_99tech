import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn("increment")
    id!: number;

    @Column({ nullable: false })
    name!: string;

    @Column({ type: "decimal", nullable: false })
    price!: number;

    @Column({type: "boolean", default: false})
    is_delete: boolean;

    @UpdateDateColumn()
    updated_at!: Date;

    @CreateDateColumn()
    created_at!: Date;


    transform() {
        return {
            id: this.id,
            name: this.name,
            price: this.price,
            updated_at: this.updated_at,
            created_at: this.created_at
        }
    }
}