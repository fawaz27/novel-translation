import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Novel } from "./novel.entity";

@Entity()
export class Source{

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: 'varchar', length: 200 })
    public name : string;

    @Column({ type: 'varchar', length: 200 })
    public link : string;

    @Column({ type: 'varchar', length: 200 })
    public type : string;

    @Column({ type: 'varchar', length: 200 })
    public lang : string;

    @OneToMany(()=>Novel,(novel)=>novel.source)
    public novels : Novel[];

}