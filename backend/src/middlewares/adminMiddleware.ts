
import {NextFunction, Response ,Request} from 'express';
import ForbiddenException from '../exceptions/ForbiddenException';
import RequestWithUser from '../interfaces/requestWithUser.interface';


async function adminMiddleware(request: RequestWithUser, response: Response, next: NextFunction)
{
   if(request.user?.role!="admin")
        throw new ForbiddenException('Sorry only the admin has sufficient rights to access this resource.');
    next();
}


export default adminMiddleware as unknown as (req:Request,res:Response,net:NextFunction)=>{};