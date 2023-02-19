import {Entity, PrimaryGeneratedColumn, CreateDateColumn,UpdateDateColumn,Column} from "typeorm";

// Type model for database
@Entity('type')
export class Type{
    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    type!:string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}