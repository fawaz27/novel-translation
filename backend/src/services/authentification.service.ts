import { AppDataSource } from '../database/AppDataSource';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import WrongCredentialsException from '../exceptions/WrongCredentialsException';
import TokenData from '../interfaces/tokenData.interface';
import DataStoredInToken from '../interfaces/dataStoredInToken.interface';
import InternalErrorException from '../exceptions/InternalErrorException';
import { User } from '../models/user.entity';
import logInDto from '../dto/login.dto';
import CreateUserDto from '../dto/user.dto';
import EmailOrUsernameAlreadyExistsException from '../exceptions/user/UserWithThatEmailAlreadyExistsException';
import UserWithThatEmailAlreadyExistsException from '../exceptions/user/UserWithThatEmailAlreadyExistsException';
import UserWithThatUsernameAlreadyExistsException from '../exceptions/user/UserWithThatUsernameAlreadyExistsException';

export class AuthentificationService{

    public userRepository = AppDataSource.getRepository(User);
    
    constructor(){
        
        this.userRepository = AppDataSource.getRepository(User);
        
    }


    public async register (user:CreateUserDto){
        
        
        const result1 = await this.userRepository.findOne( {where:{email:user.email}});
        const result2 = await this.userRepository.findOne( {where:{username:user.username}});

        if (result1) {
            throw new UserWithThatEmailAlreadyExistsException(user.email);
        } 
        else if(result2){
            throw new UserWithThatUsernameAlreadyExistsException(user.email);
        } 
        else {

            const hashedPassword = await bcrypt.hash(user.password, 10);

            user.password = hashedPassword;
            
            const newUser = this.userRepository.create(user);
            let created = await this.userRepository.save(newUser); 

            // //console.log(created);
            // return created;            
           
            if (created) {
                created.password = "";
                return created;
            }
            else{
                throw new InternalErrorException();
            }

            
    
        }
    }

    public async logIn(login:logInDto){
        //console.log(login);
        
        const result1 = await this.userRepository.findOne(({where:{email:`${login.login}`}}));
        const result2 = await this.userRepository.findOne(({where:{username:login.login}}));
        
        let  user = null;
        if(result1)
            user = result1;
        else
            user = result2;

        console.log(user);
        
        if (user) {
            const isPassword = await bcrypt.compare(login.password,user.password);
            
            if (isPassword) {
                user.password = "";
                const tokenData = this.createToken(user);
                const cookie = this.createCookie(tokenData);
                
                return {cookie,user};

            } 
            else {
                throw new WrongCredentialsException();
            }

            
        }
        else{
            throw new WrongCredentialsException();
        }


    }

    public async logOut(){
        return 'Authorization=;Max-age=0';
    }

    public createToken(user: User)
    {
        const expiresIn = 3600;
        const secret =  process.env.JWT_KEY;
        const dataStoredInToken:DataStoredInToken= {
            _id: String(user.id) ,
        };
        return {
            expiresIn,
            token: jwt.sign(dataStoredInToken,secret as string,{ expiresIn:`${expiresIn}s` }),
        };
    }

    public createCookie(tokenData: TokenData )
    {
        return `Authorization = ${tokenData.token}; HttpOnly; Max-Age = ${tokenData.expiresIn}`;
    }

}

