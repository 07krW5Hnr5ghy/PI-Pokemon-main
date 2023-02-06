import { Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn, Column } from "typeorm";
import { Origin } from "../declaration";


@Entity()
export class Pokemon {

    @PrimaryColumn({nullable:false})
    id!: string;

    @Column({nullable:false})
    name!: string;

    @Column({type:"text",array:true,nullable:false})
    classes!: string[];

    @Column({nullable:false})
    attack!: number;

    @Column({nullable:false})
    defense!:number;

    @Column({nullable:false})
    specialAttack!:number;

    @Column({nullable:false})
    specialDefense!:number;

    @Column({nullable:false})
    speed!:number;

    @Column({nullable:false})
    health!: number;

    @Column({nullable:true,default:"https://www.svgrepo.com/show/276264/pokeball-pokemon.svg"})
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