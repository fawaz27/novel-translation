import { Repository } from "typeorm";
import { AppDataSource } from "../../database/AppDataSource";
import CreateSourceDto from "./source.dto";
import InternalErrorException from "../../exceptions/InternalErrorException";
import NotFoundException from "../../exceptions/NotFoundException";
import { Source } from "./source.entity";


export class SourceService{

    private sourceRepository:Repository<Source> ;

    constructor(){
        this.sourceRepository = AppDataSource.getRepository(Source);
    }

    public async addSource(source:CreateSourceDto){

        const newSource =  this.sourceRepository.create(source);
        const result = await this.sourceRepository.save(newSource);

        if(result)
            return result;
        else
            throw new InternalErrorException();

    }

    public async getAllSources(){

        const sources  = await this.sourceRepository.find();
        
        if(sources && sources.length!=0)
            return sources;
        else
            throw new NotFoundException('No Sources found.');
    }

    public async getSourceById(id:number){

        const source  = await this.sourceRepository.findOne({where:{id:id}});
        
        if(source)
            return source;
        else
            throw new NotFoundException('Source not found.');
    }

    public async updateSource(id:number,source:CreateSourceDto){

        const validId = await this.sourceRepository.findOne({where:{id:id}});

        if(validId){
            const updatedSource = await this.sourceRepository.update(id,source);

            if (updatedSource) 
                return updatedSource;
            else
                throw new InternalErrorException(); 
        }
        else    
            throw new NotFoundException('Source not found.')

    }

    public async deleteSource(id:number){

        const sourceToDelete  = await this.sourceRepository.findOne({where:{id:id}});

        if(sourceToDelete){
            const result = await this.sourceRepository.remove(sourceToDelete);
            
            if(result)
                return id;
            else
                throw new InternalErrorException();
        }
        else    
            throw new NotFoundException('Source not found.')
    }

}