import { DataSourceOptions } from 'typeorm';
import { Chapter } from '../models/chapter.entity';
import { Novel } from '../models/novel.entity';
import { Source } from '../models/source.entity';
import { User } from '../models/user.entity';

const config: DataSourceOptions = {
    type: 'postgres',
    host: process.env.HOST,
    port: Number(process.env.PORT_DB),
    username: process.env.USERNAME_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.NAME_DB,
    entities: [
        User,
        Novel,
        Chapter,
        Source
    ],
    synchronize: true,
    
};
 
export default config;