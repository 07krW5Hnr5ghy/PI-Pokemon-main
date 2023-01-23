import { Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn, Column } from "typeorm";
import { Origin } from "../declaration";


@Entity()
export class Pokemon {

    @PrimaryColumn()
    id!: string;

    @Column()
    name!: string;

    @Column('simple-array',{nullable:true})
    classes!: string[];

    @Column()
    attack!: number;

    @Column()
    defense!:number;

    @Column()
    specialAttack!:number;

    @Column()
    specialDefense!:number;

    @Column()
    speed!:number;

    @Column()
    health!: number;

    @Column()
    picture!:string;

    @Column({
        type:'enum',
        enum: ["api","custom"],
        default : "api",
    })
    origin!: Origin;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

}