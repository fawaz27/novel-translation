import express, { Router } from 'express';
import ConfirmEmailDto from '../dto/confirmEmail.dto';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import authMiddleware from '../middlewares/authMiddleware';
import validationMiddleware from '../middlewares/validationMiddleware';
import EmailConfirmationService from '../services/emailConfirmation.service';
import{Request,Response,NextFunction} from 'express';

export class EmailConfirmationController{

    public path:string = '/email-confirmation';
    public router:Router = express.Router();
    private emailConfirmationService:EmailConfirmationService;

    constructor(){      
        this.emailConfirmationService = new EmailConfirmationService();
        this.initializeRoutes();
    }

    private initializeRoutes(){

        this.router.post(`${this.path}/confirm`,validationMiddleware(ConfirmEmailDto),this.confirm);
            
        this.router
            .post(
                `${this.path}/resend-confirmation-link`,
                authMiddleware as unknown as (req:Request,res:Response,net:NextFunction)=>{},
                this.resendConfirmationLink as unknown as (req:Request,res:Response,net:NextFunction)=>{}
            );

    }

    public  confirm = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{
        
        const confirmationData: ConfirmEmailDto = request.body;

        try {
            const email = await this.emailConfirmationService.decodeConfirmationToken(confirmationData.token);
            const result = await this.emailConfirmationService.confirmEmail(email);
            response.status(200).send(result);
        } catch (error) {
            next(error);
        }
        

    }

    public  resendConfirmationLink = async(request: RequestWithUser, response: express.Response, next: express.NextFunction)=>{

        const userId = request.user.id;
        try {
            const result = await this.emailConfirmationService.resendConfirmationLink(userId);
            response.status(200).send(result);
        } catch (error) {
            next(error);
        }
        

    }


    
}