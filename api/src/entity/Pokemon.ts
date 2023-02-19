import { Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn, Column,Check } from "typeorm";
import { Origin } from "../declaration";

// Pokemon model for database
@Entity('pokemon')
export class Pokemon {

    @PrimaryColumn({nullable:false})
    id!: string;

    @Column({nullable:false,unique:true})
    name!: string;

    @Column({type:"text",array:true,nullable:false})
    classes!: string[];

    @Column({nullable:false})
    @Check('"attack">0')
    attack!: number;

    @Column({nullable:false})
    @Check('"defense">0')
    defense!:number;

    @Column({nullable:false})
    @Check('"specialAttack">0')
    specialAttack!:number;

    @Column({nullable:false})
    @Check('"specialDefense">0')
    specialDefense!:number;

    @Column({nullable:false})
    @Check('"speed">0')
    speed!:number;

    @Column({nullable:false})
    @Check('"health">0')
    health!: number;

    @Column({nullable:false})
    picture!:string;

    @Column({
        type:'enum',
        enum: Origin,
    })
    origin!: Origin;

    @Column({default:true})
    active!: boolean;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

}