
import { Repository } from 'typeorm';
import { AppDataSource } from '../database/AppDataSource';
import UserWithThatEmailNotExistsException from '../exceptions/user/UserWithThatEmailNotExistsException';
import UserWithThatIDNotExistsException from '../exceptions/user/UserWithThatIDNotExistsException';
import { User } from '../models/user.entity';
import bcrypt from 'bcrypt';
import InternalErrorException from '../exceptions/InternalErrorException';
export class UserService{
   
    private userRepository:Repository<User> ;

    constructor(){
        this.userRepository = AppDataSource.getRepository(User);
    }

    public async getUserByEmail(email:string){
     
        const user = await this.userRepository.findOne(({where:{email:email}}));
        console.log(user);
        
        if(user)
            return user;
        else
            throw new UserWithThatEmailNotExistsException(email);       
    }

    public async getUserById(id:number){
        const user = await this.userRepository.findOne(({where:{id:id}}));

        if(user)
            return user;
        else
            throw new UserWithThatIDNotExistsException(id);
    }

    public async markEmailAsConfirmed(email: string) {
        
        const result = await this.userRepository.update({ email }, {
            isEmailConfirmed: true
        }); 
        
        return result;
    }

    public async updatePassword(email: string,password:string) {

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await this.userRepository.update({ email }, {
            password: hashedPassword
        }); 
        
        return result;

    }
}