import express from 'express';
import validationMiddleware from '../../middlewares/validationMiddleware';
import CreateUserDto from '../user/user.dto';
import { NovelFullService } from './novelfull.service';


export class NovelFullController{

    public path = '/novelfull';
    public router = express.Router();
    private novelFullService:NovelFullService;
   

    constructor(){      
      this.novelFullService = new NovelFullService();
      this.initializeRoutes();
    }

    
    
    private initializeRoutes()
    {
        this.router.get(`${this.path}/latest-novel`,this.getNovelsLatest);
        this.router.get(`${this.path}/novel`,this.getNovel);
        this.router.get(`${this.path}/novel-list-chapter`,this.getListChapterNovel);
        this.router.get(`${this.path}/novel-chapter-content`,this.getChapterContent);
        
    }

    public  getNovelsLatest = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{

        const page:number = Number(request.query.page);
        //console.log(UserData);
        try {
            const novels = await this.novelFullService.getNovelsLatest(page);
            const result = await this.novelFullService.matchImg(novels);
            response.status(200).send(result);
   
        } catch (error) {
           
            next(error);
        }
    }

    public  getNovel= async(request: express.Request, response: express.Response, next: express.NextFunction)=>{

        const link:string = request.body.link;
        //console.log(UserData);
        try {
            const novel = await this.novelFullService.getNovel(link);
            response.status(200).send(novel);
   
        } catch (error) {
           
            next(error);
        }
    }

    public  getListChapterNovel= async(request: express.Request, response: express.Response, next: express.NextFunction)=>{

        const link:string = request.body.link;
        const page:number = request.body.page;
        //console.log(UserData);
        try {
            const list = await this.novelFullService.getListChapterNovel(link,page);
            response.status(200).send(list);
   
        } catch (error) {
           
            next(error);
        }
    }

    public  getChapterContent = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{

        const link:string = request.body.link;
        //console.log(UserData);
        try {
            const chapter = await this.novelFullService.getChapterContent(link);
            response.status(200).send(chapter);
   
        } catch (error) {
           
            next(error);
        }
    }

    public  saveChapter= async(request: express.Request, response: express.Response, next: express.NextFunction)=>{

        const link:string = request.body.link;
        
        try {
            // const list = await this.novelFullService.getListChapterNovel(link,pages);
            // response.status(200).send(list);
   
        } catch (error) {
           
            next(error);
        }
    }

}

