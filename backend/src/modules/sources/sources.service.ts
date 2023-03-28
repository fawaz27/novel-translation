import Chapter from "../../interfaces/chapter.interface";
import Content from "../../interfaces/content.interface";
import { HttpLibrary } from "../../interfaces/httpLibrary.interface";
import Novel from "../../interfaces/novel.interface";


interface SourcesService{

    readonly baseUrl:String;
    readonly name:String;
    readonly http: HttpLibrary;
    
    
    getNovelsLatest(page:number): Promise<Novel[]>;
    getNovelsCompleted(page:number): Promise<Novel[]>;
    searchWithKeyword(keyword:string,page:number): Promise<Novel[]>;
    searchWithGenre(genre:string,page:number): Promise<Novel[]>;
    getNovel(novelUrl: string,page:number) : Promise<Novel>;
    // getListChapterNovel(novelUrl: string) : Promise<Chapter[]>;
    getContentChapter(chapterUrl: string) : Promise<Content>;

};

export default SourcesService;