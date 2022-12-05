import { Response } from 'express';
import { User } from '../models/user.entity';


interface ResponseWithUser extends Response {
    user:User;
}
export default ResponseWithUser;