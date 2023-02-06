import axios, { Axios, AxiosHeaders } from "axios";
import { load } from "cheerio";


export class NovelFullService{

    public baseUrl:String;
    public headers:AxiosHeaders;;
   
    
    constructor(){
        this.baseUrl = 'https://novelfull.com';
        this.headers = new AxiosHeaders(); 
        this.headers.set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36');
        this.headers.set('Accept-Language', 'en-US,en;q=0.9,fr;q=0.8');
        this.headers.set('Accept-Encoding', 'gzip, deflate, br');
        this.headers.set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8');
        this.headers.set('Connection', 'keep-alive');
        
    }

    public async getNovelsLatest(number_page:number){
        const url = 'latest-release-novel';
        let headers = this.headers;
        const { data, status } = await axios.get(`${this.baseUrl}/${url}?page=${number_page}`, { headers  });
        if (status !== 200) {
            throw new Error(`Error while fetching the page : ${status}`);
        }
        const $ = load(data);
        const listPage = $('.col-xs-12.col-sm-12.col-md-9.col-truyen-main.archive');
        if (!listPage) {
            throw new Error(`Error while parsing the HTML : listPage not found`);
        }
        const rows = listPage.find('.row');
        
        
        let result: any[] = [];
        rows.each((i, row) =>  {
            const title = $(row).find('.col-xs-7 a').text();
            const link =  $(row).find('.col-xs-7 a').attr('href');
            const chapter = $(row).find('.col-xs-2.text-info span').text();
            result.push({title,link:link, chapter});
           
        });

       

        return result;

    }

    public async matchImg(data:any[]){

        let result: any [] = [];
        // for (const it of data) {
        //     const image  = await this.getImg(it.link);      
        //     console.log(image);
            
        //     result.push({title:it.title,link:it.link,chapter:it.chapter, image: `${this.baseUrl}${image}` });
        // }

        await Promise.all(data.map(async (it) => {
            const image  = await this.getImg(it.link);      
            console.log(image);
            
            result.push({title:it.title,link:it.link,chapter:it.chapter, image: `${this.baseUrl}${image}` });
          }));
        console.log(result[0]);

        return result;
    }

    public async getImg(link:string|undefined){
        let headers = this.headers;
        const { data, status } = await axios.get(`${this.baseUrl}${link}`, { headers  });
        if (status !== 200) {
            throw new Error(`Error while fetching the page : ${status}`);
        }
        
        const $ = load(data);
        const infos = $('.col-info-desc');    

        const img = infos.find('img').attr('src');
      
        
        return img;

    }

    public async getNovel(link:string){
        
        let headers = this.headers;
        const { data, status } = await axios.get(`${this.baseUrl}/${link}`, { headers  });
        if (status !== 200) {
            throw new Error(`Error while fetching the page : ${status}`);
        }
        
        
        const $ = load(data);
        const infos = $('.col-info-desc');    

        const img = infos.find('img').attr('src');
        const author = infos.find('.info a').first().text();
        const title = infos.find('.title').first().text();
        const di = (infos.find('.info')).find('div').eq(2);
        const genres = di.find('a').map((i, el) => $(el).text()).get();
        const des = infos.find('.desc-text p').text();
        const state = ((infos.find('.info')).find('div').eq(4)).find('a').text();

        return {
            image:`${this.baseUrl}${img}`,
            author,
            title,
            description :des,
            genres,
            status:state

        }
        
    }
   
    public async getListChapterNovel(link:string,page:number){
        let headers = this.headers;
        const { data, status } = await axios.get(`${this.baseUrl}/${link}?page=${page}`, { headers  });
        if (status !== 200) {
            throw new Error(`Error while fetching the page : ${status}`);
        }
        
        const $ = load(data);

        const listChapter = $('div#list-chapter.col-xs-12');
        const rows = listChapter.find('.row a');
        const result: any[] = [];
        rows.each((i, row) => {
            const link = $(row).attr('href');
            const title = $(row).text();
            result.push({ link, title });
        });
        // const low =
        const last_page = $('li.last a').attr('data-page');        
        return {chapters:result,last_page:Number(last_page)+1};
    }

    public async getChapterContent(link:string){
        let headers = this.headers;
        const { data, status } = await axios.get(`${this.baseUrl}${link}`, { headers });
        if (status !== 200) {
            throw new Error(`Error while fetching the page : ${status}`);
        }
        
        const $ = load(data);

        const Chapter = $('.row');
        const title_novel = Chapter.find('a.truyen-title').first().text();
        const title_chapter = Chapter.find('a.chapter-title').first().text();
        const next_chap = Chapter.find('a#next_chap').attr('href');
        const prev_chap = Chapter.find('a#prev_chap').attr('href');
        const paragraphs = Chapter.find('p');
        const content = paragraphs.map((i, el) => $(el).text()).get();;
        
        return {title_novel,title_chapter,next_chap,prev_chap,content};

        
    }
}

