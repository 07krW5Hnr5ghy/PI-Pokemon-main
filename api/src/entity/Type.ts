import {Entity, PrimaryGeneratedColumn, CreateDateColumn,UpdateDateColumn,Column} from "typeorm";

// Type model for database
@Entity()
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