import { Column ,Entity,JoinTable,ManyToMany,PrimaryGeneratedColumn } from 'typeorm'
import { Novel } from './novel.entity';

@Entity('users')
export  class User{
    @PrimaryGeneratedColumn()
    public id: number;
    
    @Column({ type: 'varchar', length: 300 })
    public lastName: string;

    @Column({ type: 'varchar', length: 300 })
    public firstName: string;

    @Column({ type: 'varchar', length: 300 ,nullable:false, unique: true})
    public email: string;

    @Column({ type: 'varchar', length: 40 ,nullable:false, unique: true})
    public username: string;

    @Column({ default: false })
    public isEmailConfirmed: boolean;

    @Column({ type: 'varchar', length: 300 , nullable: false })
    public password: string;

    @Column({ type: 'varchar', length: 300 })
    public phone: string;

    @Column({ type: 'varchar', length: 300 , nullable:false })
    public role: string;

    @ManyToMany(()=>Novel)
    @JoinTable()
    public novels:Novel[];


}
