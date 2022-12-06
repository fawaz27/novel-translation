import { Repository } from "typeorm";
import { AppDataSource } from "../../database/AppDataSource";
import CreateNovelDto from "./novel.dto";
import InternalErrorException from "../../exceptions/InternalErrorException";
import NotFoundException from "../../exceptions/NotFoundException";
import { Novel } from "../source/novel.entity";
import { LibraryService } from "../library/library.service";
import { SourceService } from "../source/source.service";


export class NovelService{

    private novelRepository:Repository<Novel> ;
    private sourceService : SourceService;
    private libraryService:LibraryService;

    constructor(){
        this.novelRepository = AppDataSource.getRepository(Novel);
        this.sourceService = new SourceService();
        this.libraryService = new LibraryService();
    }

    public async addNovelToLibrary(id_library:number, id_source:number,novel:CreateNovelDto){

        const library = await this.libraryService.getLibraryById(id_library);
        const source = await this.sourceService.getSourceById(id_source);

        let newNovel =  this.novelRepository.create(novel);
        newNovel.source = source;
        newNovel.library = library;
        const result = await this.novelRepository.save(newNovel);

        if(result)
            return result;
        else
            throw new InternalErrorException();
    }

//vérifier si il y exception pour id_source invalid

    public async getNovelbyId(id_library:number,id_source:number,id_novel:number){

        await this.sourceService.getSourceById(id_source);
        const novel = await this.novelRepository
                        .createQueryBuilder("novel")
                        .leftJoinAndSelect("novel.source","source")
                        .leftJoinAndSelect("novel.library","library")
                        .where("novel.id = :id_novel",{id_novel})
                        .andWhere("source.id = :id_source",{id_source})
                        .andWhere("library.id = :id_library",{id_library})
                        .getOne();
                        
        if(novel)
            return novel;
        else
            throw new NotFoundException('Novel not found.');   
            
    }

    public async updateNovel(id_library:number,id_source:number,id_novel:number,novel:CreateNovelDto){

        await this.sourceService.getSourceById(id_source);
        const validIds = await this.novelRepository
                            .createQueryBuilder("novel")
                            .leftJoinAndSelect("novel.source","source")
                            .leftJoinAndSelect("novel.library","library")
                            .where("novel.id = :id_novel",{id_novel})
                            .andWhere("source.id = :id_source",{id_source})
                            .andWhere("library.id = :id_library",{id_library})
                            .getOne();
        
        if(validIds){
            const updatedNovel = this.novelRepository.update(id_novel,novel);

            if (updatedNovel) 
                return updatedNovel;
            else
                throw new InternalErrorException();
        }
        else    
            throw new NotFoundException('Novel not found.');
        
    } 


    public async deleteNovel(id_library:number,id_source:number,id_novel:number){

        await this.sourceService.getSourceById(id_source);

        const validIds = await this.novelRepository
                            .createQueryBuilder("novel")
                            .leftJoinAndSelect("novel.source","source")
                            .leftJoinAndSelect("novel.library","library")
                            .where("novel.id = :id_novel",{id_novel})
                            .andWhere("source.id = :id_source",{id_source})
                            .andWhere("library.id = :id_library",{id_library})
                            .getOne();
        
        if(validIds){
            const novelToDelete  = await this.novelRepository.findOne({where:{id:id_source}});

            if(novelToDelete){
                const result = await this.novelRepository.remove(novelToDelete);
                
                if(result)
                    return id_novel;
                else
                    throw new InternalErrorException();
            }
            else    
                throw new NotFoundException('Novel not found.')
        }
        else    
            throw new NotFoundException('Novel not found.');

    }

}