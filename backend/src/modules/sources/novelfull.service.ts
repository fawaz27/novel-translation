import { load } from "cheerio";
import Chapter from "../../interfaces/chapter.interface";
import Content from "../../interfaces/content.interface";
import { HttpLibrary } from "../../interfaces/httpLibrary.interface";
import Novel from "../../interfaces/novel.interface";
import SourcesService from "./sources.service";


export class NovelFullService implements SourcesService{

    name: String;
    baseUrl : String;
    http: HttpLibrary;

    constructor(namesource: string, url: string, http: HttpLibrary) {
        this.name = namesource;
        this.baseUrl = url; 
        this.http = http; 
             
    }
    private async matchImg(data:Novel[]) : Promise<Novel[]>{

            let result: Novel [] = [];
            // for (const it of data) {
            //     const image  = await this.getImg(it.link);      
            //     console.log(image);
                
            //     result.push({title:it.title,link:it.link,chapter:it.chapter, image: `${this.baseUrl}${image}` });
            // }

            await Promise.all(data.map(async (it) => {
                const image  = await this.getImg(it.url);      
                console.log(image);
                it.coverImageUrl = `${this.baseUrl}${image}`;
                // result.push({title:it.title,url:it.url, coverImageUrl: `${this.baseUrl}${image}` });
            }));
            console.log(data[0]);

            return data;
    }

    private async getImg(link:string|undefined) :Promise<string>{


        try {
        const response = await this.http.get(`${this.baseUrl}${link}`, this.http.headers);
            const $ = load(response.data);
            const infos = $('.col-info-desc');    
            const img = infos.find('img').attr('src') as string;
            return img; 
        } catch (error) {
            console.error(`Error scraping novel: ${error}`);
            return '';
        }
        

    }
    async getNovelsLatest(page:number): Promise<Novel[]>{

        let novels: Novel[]=[];
        try {
            const url = 'latest-release-novel';
            const response = await this.http.get(`${this.baseUrl}/${url}?page=${page}`, this.http.headers);

            const $ = load(response.data);
            const listPage = $('.col-xs-12.col-sm-12.col-md-9.col-truyen-main.archive');
            if (!listPage) {
                throw new Error(`Error while parsing the HTML : listPage not found`);
            }
            const rows = listPage.find('.row');
            
            rows.each((i, row) =>  {
                let novel :Novel= {title:"",author:"",url:""};
                novel.title = $(row).find('.col-xs-7 a').text();
                novel.url =  $(row).find('.col-xs-7 a').attr('href') as string;
                novels.push(novel);
            
            });
            novels = await this.matchImg(novels)
            return novels;
        } catch (error) {
            console.error(`Error scraping novel: ${error}`);
            return novels;
        }
        
    };

    

    async getNovelsCompleted(page:number): Promise<Novel[]>{
        let novels: Novel[]=[];
        try {
            const url = 'completed-novel';
            const response = await this.http.get(`${this.baseUrl}/${url}?page=${page}`, this.http.headers);

            const $ = load(response.data);
            const listPage = $('.col-xs-12.col-sm-12.col-md-9.col-truyen-main.archive');
            if (!listPage) {
                throw new Error(`Error while parsing the HTML : listPage not found`);
            }
            const rows = listPage.find('.row');
            
            rows.each((i, row) =>  {
                let novel :Novel= {title:"",url:""};
                novel.title = $(row).find('.col-xs-7 a').text();
                novel.url =  $(row).find('.col-xs-7 a').attr('href') as string;
                novels.push(novel);
            
            });
            novels = await this.matchImg(novels)
            return novels;
        } catch (error) {
            return novels;
        }
        
        
    };
    async searchWithKeyword(keyword:string,page:number): Promise<Novel[]>{
        let novels: Novel[]=[];
        try {
            const url = 'search?keyword=';
            const keywordPlus = keyword.replace(/\s+/g, "+");
            const response = await this.http.get(`${this.baseUrl}/${url}${keywordPlus}&page=${page}`, this.http.headers);
            console.log(`${this.baseUrl}/${url}?keyword=${keywordPlus}&page=${page}`);
            
            const $ = load(response.data);
            const listPage = $('.col-xs-12.col-sm-12.col-md-9.col-truyen-main.archive');
            if (!listPage) {
                throw new Error(`Error while parsing the HTML : listPage not found`);
            }
            const rows = listPage.find('.row');
            
            rows.each((i, row) =>  {
                let novel :Novel= {title:"",url:""};
                novel.title = $(row).find('.col-xs-7 a').text();
                novel.url =  $(row).find('.col-xs-7 a').attr('href') as string;
                novels.push(novel);
            
            });
            novels = await this.matchImg(novels)
            
            return novels;
        } catch (error) {
            return novels;
        }
    };

    async searchWithGenre(genre:string,page:number): Promise<Novel[]>{
        let novels: Novel[]=[];
        try {
            const url = 'genre';
            const response = await this.http.get(`${this.baseUrl}/${url}/${genre}?page=${page}`, this.http.headers);
            console.log(`${this.baseUrl}/${url}/${genre}&page=${page}`);
            
            const $ = load(response.data);
            const listPage = $('.col-xs-12.col-sm-12.col-md-9.col-truyen-main.archive');
            if (!listPage) {
                throw new Error(`Error while parsing the HTML : listPage not found`);
            }
            const rows = listPage.find('.row');
            
            rows.each((i, row) =>  {
                let novel :Novel= {title:"",url:""};
                novel.title = $(row).find('.col-xs-7 a').text();
                novel.url =  $(row).find('.col-xs-7 a').attr('href') as string;
                novels.push(novel);
            
            });
            novels = await this.matchImg(novels)
            
            return novels;
        } catch (error) {
            return novels;
        }
    };
    async getNovel(novelUrl: string,page:number) : Promise<Novel>{

        let novel: Novel = {title:"",url:""}; 

        try {
            const response = await this.http.get(`${this.baseUrl}/${novelUrl}?page=${page}`, this.http.headers);
            const $ = load(response.data);
            const infos = $('.col-info-desc');    

            if(infos.find('img').attr('src'))
                novel.coverImageUrl = `${this.baseUrl}${infos.find('img').attr('src')}`;
            novel.author = infos.find('.info a').first().text();
            novel.title = infos.find('.title').first().text();
            const di = (infos.find('.info')).find('div').eq(2);
            novel.genres = di.find('a').map((i, el) => $(el).text()).get();
            novel.description = infos.find('.desc-text p').text();
            novel.status = ((infos.find('.info')).find('div').eq(4)).find('a').text();
            novel.last_page = Number($('li.last a').attr('data-page')) +1 ;
            
            const listChapter = $('div#list-chapter.col-xs-12');
            const rows = listChapter.find('.row a');
            const result: Chapter[] = [];
            rows.each((i, row) => {
                const url = $(row).attr('href') as string;
                const title = $(row).text();
                result.push({ url, title });
            });
            novel.chapters = result;
            
            return novel;
        } catch (error) {
            return novel;
        }
    };

    async getContentChapter(chapterUrl: string) : Promise<Content>{
        let content: Content = {title:"",titleNovel:"",content:[""],prevUrl:"",nextUrl:""};
        try {
            const response = await this.http.get(`${this.baseUrl}${chapterUrl}`, this.http.headers);

            const $ = load(response.data);
            const Chapter = $('.row');
            content.titleNovel = Chapter.find('a.truyen-title').first().text();
            content.title = Chapter.find('a.chapter-title').first().text();
            content.nextUrl = Chapter.find('a#next_chap').attr('href');
            content.prevUrl = Chapter.find('a#prev_chap').attr('href');
            const paragraphs = Chapter.find('p');
            content.content = paragraphs.map((i, el) => $(el).text()).get();
            return content;
        } catch (error) {
            return content;
        }
    };
}