<template>
    <div>
        <div  class="novel-infos" :class="Theme ==='light' ? 'novel-infos-ligth' : 'novel-infos-dark'">

            <div class="g_wrap">
                <v-row class="row">
                    <v-col
                    cols="12"
                    sm="4"
                    >
                        <div class="d-flex justify-center">
                            <v-card class="card" >
                                <v-img
                                    :src="currentNovel.coverImageUrl"
                                    class="bg-white fill-height fill-width"
                                    lazy-src="https://picsum.photos/id/11/100/60"
                                    cover                               >
                                    <template v-slot:placeholder>
                                    <div class="d-flex align-center justify-center fill-height">
                                        <v-progress-circular
                                        color="grey-lighten-4"
                                        indeterminate
                                        ></v-progress-circular>
                                    </div>
                                    </template>
                                </v-img>
                            </v-card>
                            
                        </div>
                        <v-progress-linear
                                class="mt-4" 
                                v-model="progress"
                                height="25"
                                color="blue-darken-2"
                                v-if="showProgress"
                                
                            >
                                <strong>{{ Math.ceil(progress) }}%</strong>
                            </v-progress-linear>
                    </v-col>

                    <v-col
                    cols="12"
                    sm="8"
                    class="container"
                    >
                        <div class="mt-4  raiting-two text-center ">
                            <div class="d-flex justify-center flex-wrap ">
                                <v-rating
                                v-model="rating"
                                hover
                                half-increments
                                density="compact"
                                active-color="#ff8d29"
                                ></v-rating>
                                <pre class="ml-2">{{ rating }}</pre>
                            </div>
                            
                            <pre class="ml-2">({{ nbr_ratings }} ratings)</pre>
                            
                        </div>

                        <div class="text-infos">
                            <div class="text-uppercase text-h4">
                                {{ currentNovel.title }}
                            </div>
                            <div class="mt-4 ">
                            
                                <div class="d-flex align-center flex-wrap"> 
                                    <span class="font-weight-bold">
                                    Genre(s) :
                                    </span>
                                    <span class="item ml-2" v-for="(genre ,index) in currentNovel.genres" :key="index"
                                    @click="$router.push({ name: 'novel', params:{name: genre } })" 
                                    >
                                        {{ genre }}
                                    </span>
                                </div>
                                

                                
                            </div>

                            <div class="mt-4 d-flex align-center flex-wrap">
                                <span class="font-weight-bold">
                                    Author(s) :
                                </span>
                                <span class="item ml-2" 
                                    @click="$router.push({ name: 'novel', params:{name: currentNovel.author } })" 
                                    >
                                        {{ currentNovel.author }}
                                </span>
                                
                            </div>
                            
                            <div class="mt-4 d-flex align-center flex-wrap">
                                <span class="font-weight-bold">
                                    Status :
                                </span>

                                <span class="item ml-2" 
                                    @click="$router.push({ name: 'novel', params:{name: currentNovel.status } })" 
                                    >
                                        {{ currentNovel.status }}
                                </span>
                                
                            </div>

                            <div class="mt-4 d-flex align-center flex-wrap raiting-one ">
                            <v-rating
                                v-model="rating"
                                hover
                                half-increments
                                density="compact"
                                active-color="#ff8d29"
                                ></v-rating>
                            <pre class="ml-2">{{ rating }} ({{ nbr_ratings }} ratings)</pre>
                            
                            </div>
                        </div>
                        <div class="buttons">
                            <v-btn
                            class="btns-item text-capitalize text-h6"
                            rounded="pill"
                            color="blue-darken-2"
                            prepend-icon="mdi-eye"
                            @click="$router.push({ 
                                    name: 'chapter', 
                                    params:{
                                        name: this.$route.params.name, 
                                        chapter: chapters_one[0].title
                                    }})"
                            >
                            Read
                            </v-btn>

                            <v-btn
                            rounded="pill"
                            class="btns-item text-capitalize text-h6"
                            color="blue-darken-2"
                            prepend-icon="mdi-bookmark"
                            >
                            Follow
                            </v-btn>
                            
                            <v-btn
                            v-if="!multipleDownload"
                            ref="downloadBtn"
                            class="btns-item text-capitalize text-h6"
                            rounded="pill"
                            color="blue-darken-2"
                            prepend-icon="mdi-download"
                            @click="startDownload"
                            >
                            Download
                            </v-btn>

                            <v-btn
                            v-else
                            ref="downloadBtnMulti"
                            class="btns-item text-capitalize text-h6"
                            rounded="pill"
                            color="blue-darken-2"
                            prepend-icon="mdi-download-multiple"
                            @click="startDownload"
                            >
                            Download Selected
                            </v-btn>

                            
                        </div>

                        <div class="buttons-hidden">
                            <v-btn
                            class="btns-item text-capitalize text-h6"
                            rounded="pill"
                            color="blue-darken-2"
                            icon="mdi-eye"
                            @click="$router.push({ 
                                    name: 'chapter', 
                                    params:{
                                        name: this.$route.params.name, 
                                        chapter: chapters_one[0].title
                                    }})"
                            ></v-btn>

                            <v-btn
                            rounded="pill"
                            class="btns-item text-capitalize text-h6"
                            color="blue-darken-2"
                            icon="mdi-bookmark"
                            ></v-btn>
                            
                            <v-btn 
                            v-if="!multipleDownload"
                            ref="downloadBtn"
                            class="btns-item text-capitalize text-h6"
                            rounded="pill"
                            color="blue-darken-2"
                            icon="mdi-download"
                            @click="startDownload"
                            ></v-btn>

                            <v-btn
                            v-else
                            ref="downloadBtn"
                            class="btns-item text-capitalize text-h6"
                            rounded="pill"
                            color="blue-darken-2"
                            icon="mdi-download-multiple"
                            @click="startDownload"
                            ></v-btn>                  
                        </div>

                    </v-col>
                </v-row>
            </div>
        </div>

        
        <v-card>
            <div class="g_wrap">

           
                <v-tabs
                v-model="tab"
                align-tabs="center"
                >
                <v-tab :value="1">About</v-tab>
                <v-tab :value="2" @click="updateListChapters">Chapter List</v-tab>
            
                </v-tabs>
                <v-window v-model="tab">
                    <v-window-item :value="1">
                        <v-container fluid>
                                <div class="text-h4 my-5">Synopsis</div>
                                <div v-if="lengthDescription >400">
                                    <p style="font-size: 20px;" v-html="formattedText"></p>
                                    <v-row justify="center" class="my-4">
                                        <v-btn 
                                        v-if="!show"
                                        prepend-icon="mdi-plus" 
                                        @click="showMore"
                                        >Show More
                                        </v-btn>
                                        <v-btn 
                                        v-else
                                        prepend-icon="mdi-minus" 
                                        @click="showLess"
                                        >Show Less
                                        </v-btn>
                                    </v-row>
                                    
                                </div>
                                <div v-else>
                                    <p style="font-size: 20px;" v-html="formattedText"></p>
                                </div>
                                
                                <v-divider></v-divider>
                                <div class="text-h5 my-5">Comments ({{ comments.length }})</div>
                                
                                <v-card-title>Leave a comment</v-card-title>
                               
                                  
                                        <v-row>
                                            <v-col cols="1" class="d-flex align-center justify-center " >
                                            <v-avatar size="50">
                                                <v-img :src="avatar" ></v-img>
                                            </v-avatar>
                                            </v-col>
                                            <v-col cols="11">
                                            <v-textarea  rows="1" v-model="comment" variant="underlined" auto-grow  shaped row-height="10"></v-textarea>
                                            </v-col>
                                        </v-row>
                                        <div class="d-flex justify-end mb-4">
                                            <v-btn color="blue-darken-2" rounded="xl" @click="submitComment">Comment</v-btn>
                                        </div>
                                
                                <v-row v-for="(comment, index) in comments" :key="index">
                                            <v-col cols="1" class="d-flex align-center justify-center " >
                                                <v-avatar size="50">
                                                    <v-img :src="avatar" ></v-img>
                                                </v-avatar>
                                            </v-col>
                                            <v-col cols="11">
                                                <span class="mr-2"> {{ comment.author}}</span>
                                                <span> {{ comment.date }}</span>
                                                <p>{{ comment.content }}</p>
                                            </v-col>
                                </v-row>
                        </v-container>
                    </v-window-item>

                    <v-window-item :value="2" >
                        <v-container>
                            
                            <div >
                                <div v-if="chaptersCurrentNovel.length==0" class="text-center">
                                    <v-progress-circular
                                        :size="70"
                                        :width="7"
                                        color="blue-darken-2"
                                        indeterminate
                                    ></v-progress-circular>
                                </div>
                                <div v-else>
                                <div class="d-flex justify-start  ml-4" style="height: 40px;">
                                    <v-checkbox  v-model="selectedAll"  label="Check all" @change="toogleSelectedAll"  > </v-checkbox>
                                </div>
                                    
                                <v-row >
                                 
                                
                                <v-col
                                    cols="12"
                                    sm="10"
                                    md="6"
                                    class="col-custom-sm-6"
                                >            
                                    <v-table  >
                                                <tbody>
                                                <tr
                                                    v-for="(chapter, index) in chapters_one" :key="index"            
                                                >        
                                                <v-hover v-slot:default="{ isHovering, props }">
                                                    <td class="rowtable " @mouseover="chapter.isHovering = true" @mouseleave="chapter.isHovering = false"
                                                        v-bind="props"
                                                        :style="{ 'background-color': isHovering ? 'rgba(0, 0, 0, 0.17)' : 'transparent' }"
                                                    >
                                                        
                                                        <v-row no-gutters class="row"   >
                                                            <div style="width:10%" >
                                                                    <v-checkbox v-if="chapter.isHovering || chapter.selected "  v-model="chapter.selected"  ></v-checkbox>
                                                            </div>
                                                            <div class="truncate item"
                                                                @click="$router.push({ 
                                                                            name: 'chapter', 
                                                                            params:{
                                                                                name: this.$route.params.name, 
                                                                                chapter: chapter.title
                                                                            }})"
                                                            >    
                                                                    <span class="text-capitalize"  
                                                                        :title="chapter.title" 
                                                                        style="font-size: 19px;"
                                                                    >
                                                                    <v-icon icon="mdi-book" size="x-small" class="mr-2"></v-icon>
                                                                        {{ chapter.title.replaceAll('-',' ') }}
                                                                    </span>                                                                         
                                                            </div>
                                                           
                                                        </v-row>
                                                            
                                                        
                                                    </td>
                                                </v-hover>     
                                                </tr>
                                                </tbody>
                                    </v-table>               
                                </v-col>

                                <v-col
                                    cols="12"
                                    sm="10"
                                    md="6"
                                    class="col-custom-sm-6"
                                >
                                    <v-table  >
                                                <tbody>
                                                <tr
                                                    v-for="(chapter, index) in chapters_two" :key="index"            
                                                >        
                                                <v-hover v-slot:default="{ isHovering, props }">
                                                    <td class="rowtable " @mouseover="chapter.isHovering = true" @mouseleave="chapter.isHovering = false"
                                                        v-bind="props"
                                                        :style="{ 'background-color': isHovering ? 'rgba(0, 0, 0, 0.17)' : 'transparent' }"
                                                    >
                                                        
                                                        <v-row no-gutters class="row"   >
                                                            <div style="width:10%" >
                                                                    <v-checkbox v-if="chapter.isHovering || chapter.selected "  v-model="chapter.selected"  ></v-checkbox>
                                                            </div>
                                                            <div class="truncate item"
                                                                @click="$router.push({ 
                                                                            name: 'chapter', 
                                                                            params:{
                                                                                name: this.$route.params.name, 
                                                                                chapter: chapter.title
                                                                            }})"
                                                            >    
                                                                    <span class="text-capitalize"  
                                                                        :title="chapter.title" 
                                                                        style="font-size: 19px;"
                                                                    >
                                                                    <v-icon icon="mdi-book" size="x-small" class="mr-2"></v-icon>
                                                                        {{ chapter.title.replaceAll('-',' ') }}
                                                                    </span>                                                                         
                                                            </div>
                                                           
                                                        </v-row>
                                                            
                                                        
                                                    </td>
                                                </v-hover>     
                                                </tr>
                                                </tbody>
                                    </v-table>
                                </v-col>

                                </v-row>
                                </div>
                                

                                <div class="text-center">
                                    <v-container>
                                    <pagination :last_page="last_page" @update-page="UpdatePage" ></pagination>
                                    
                                    </v-container>
                                </div>
                            </div>
                            
                        </v-container>
                    
                    </v-window-item>
                </v-window>

        </div>
        </v-card>
        
    </div>
    
 

</template>

<script>
import { mapMutations, mapState } from 'vuex'
import api from "../api";
import JSZip from 'jszip';
import Pagination from '../components/Pagination.vue';

export default {
    name: 'novel-view',
    props:{
        name: { 
            type: String
        },
    },
    components: {
        Pagination
    },
    mounted () {
        
    },

    data: () => ({
        hoveredIndex: null,
        isHovering: false,
        value:0,
        currentPage: 1,
        perPage: 8,
        page:1,
        tab: 1,
        rating: 4.5,
        nbr_ratings : 789,
        novel:{
            image:'https://novelfull.com/uploads/thumbs/keyboard-immortal-07e9c3a2c3-99d73ad4eaaa291fc4d7569dc8aae41b.jpg',
            title : 'Keyboard Immortal',
            genres: ["Action",
                    "Adventure",
                    "Drama",
                    "Fantasy",
                    "Harem",
                    "Historical",
                    "Mature",
                    "Romance"
            ],
            status:'Ongoing',
            author:'Moine des six illusions',
            description:"A lightning strike transmigrated Zu An into another world. In that world, he was known as the tr*sh of Brightmoon City, but for some reason, he was married to the gorgeous and highly talented daughter of the Chu clan? What? I’m a transmigrator but I don’t have any talent for cultivation? Why are there so many people out for my life? And most importantly of all, how in the world did I get on the bed of my sister-in-law on my wedding night?! It was a nightmarish starting point for Zu An, but fortunately, as a famed keyboard warrior in his previous life, the world gave him a keyboard in this life too so that he could turn things around. Through his trolling and flaming, he shall stand atop the corpses of his burned enemies and rise to the top of the world! "
        },
        showProgress: false,
        progress: 0,
        formattedText: '',
        show:false,
        selectedAll:false,
        chaptersConcat:[],
        avatar: "https://picsum.photos/40/40",
        comment: "",
        comments: [
            { author: "John", date: "2022-04-12", content: "Great book!" },
            { author: "Jane", date: "2022-04-10", content: "I loved it!" }
        ],
        multipleDownload:false
        
    }),
    async created(){
        try {
				await this.$store.dispatch('getNovel',{title:this.$route.params.name,page:this.page});
				if(this.status == 'Success Get Novel'){
					console.log('Success loading novel');
                    if(this.lengthDescription > 400)
                        this.formatText(this.truncatedtext(this.currentNovel.description));
                    else
                        this.formatText(this.currentNovel.description);
                    this.chapters_one.forEach(chapter => {
                        chapter.selected = false;
                        chapter.isHovering = false;
                    });
                    this.chapters_two.forEach(chapter => {
                        chapter.selected = false;
                        chapter.isHovering = false;
                    });
				}		
			} catch (error) {
				console.error(error);
			}
    },
    computed:{
        ...mapState(['currentNovel','chaptersCurrentNovel','chapters_one','chapters_two','last_page','status','Theme']),
        
        lengthDescription() {
            return this.currentNovel.description.length;
        },
        selectedChapters(){
            let tab1 =[];
            let tab2 =[];
            tab1 = this.chapters_one.filter(c=>c.selected == true);
            tab2 = this.chapters_two.filter(c=>c.selected == true);
            return tab1.concat(tab2);
        }
    },
    methods:{
        ...mapMutations(['setNovels','setchapterscurrentNovel']),

        async downloadChapter(link){
                try {
                    const response = await api.get(`novels/novelfull/chapter?url=${link}`);
                    if (response.status == 200) {
                    
                    const chapter  = response.data;
                    const html = `
                    <html>
                    <head>
                        <title>${chapter.titleNovel} - ${chapter.title}</title>
                    </head>
                    <body>
                        <h1>${chapter.titleNovel}</h1>
                        <h2>${chapter.title}</h2>
                        <p>
                        ${chapter.content.join("<br><br>")}
                        </p>
                    </body>
                    </html>
                    `;
                    // Créer un lien pour télécharger le fichier HTML
                    const link = document.createElement("a");
                    link.href = URL.createObjectURL(
                        new Blob([html], { type: "text/html" })
                    );
                    link.setAttribute("download", `${chapter.title}.html`);
                    document.body.appendChild(link);
                    link.click();
                    }   
                    else {
                        console.log('ERROR');
                    }
                } catch (error) {
                    console.error(error);
                }
        },	
		async UpdatePage(newPage) {
            console.log(newPage +' novel');
			this.page = newPage;
            this.setchapterscurrentNovel([]);
            await this.updateListChapters();

		},
        async updateListChapters(){
            try {
                    await this.$store.dispatch('getNovel',{title:this.$route.params.name,page:this.page});
                    if(this.status == 'Success Get Novel'){
                        console.log('Good loading list chapter novel');
                        this.chaptersConcat=this.chapters_one.concat(this.chapters_two);
            
                    }		
                } catch (error) {
                    console.error(error);
                }
        },




        async downloadSelectedChapters(chapters) {

            try {
                const zip = new JSZip();
                const totalChapters = chapters.length;
                let downloadedChapters = 0;
                for (const chapter of chapters) {
                    const response = await api.get(`novels/novelfull/chapter?url=${chapter.url}`);
                    
                    if (response.status === 200) {
                        const chapterContent = response.data;
                        const chapterHTML = `
                        <html>
                            <head>
                            <title>${chapterContent.titleNovel} - ${chapterContent.title}</title>
                            </head>
                            <body>
                            <h1>${chapterContent.titleNovel}</h1>
                            <h2>${chapterContent.title}</h2>
                            <p>${chapterContent.content.join('<br><br>')}</p>
                            </body>
                        </html>
                        `;
                        zip.file(`${chapter.title}.html`, chapterHTML);
                    } else {
                        console.error(`Error downloading chapter ${chapter.title}`);
                    }

                    downloadedChapters++;
                    this.progress = (downloadedChapters / totalChapters) * 100
                }

                const zipBlob = await zip.generateAsync({ type: 'blob' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(zipBlob);
                link.download = `${this.currentNovel.title}.zip`;
                document.body.appendChild(link);
                link.click();
            } catch (error) {
                console.error(error);
            }
        },
        async startDownload() {
        
            this.showProgress = true;
            this.progress = 0;
            await this.downloadSelectedChapters(this.selectedChapters);
            this.showProgress = false;
        },
        formatText(text) {
            const phrases = text.split('. ');
            this.formattedText = phrases.join('. <br>');  
        },
        truncatedtext(text) {
            return text.substring(0, 400)+'...';
        },
        showMore(){
            this.formatText(this.currentNovel.description);
            this.show = !this.show;
        },
        showLess(){
            this.formatText(this.truncatedtext(this.currentNovel.description));
            this.show = !this.show;
        },
        toggleAllCheckboxes() {
            const allSelected = this.chapters_one.every(chapter => chapter.selected)
            this.chapters_one.forEach(chapter => {
                chapter.selected = !allSelected
            })
        },
        toogleSelectedAll(){
            this.chapters_one.forEach((item) => {  
                item.selected = this.selectedAll;
            });
            this.chapters_two.forEach((item) => {  
                item.selected = this.selectedAll;
            });

        },
        submitComment(){
            if(this.comment){
                this.comments.unshift({
                    author: "Jean",
                    date:   this.formatDate(new Date()) ,
                    content: this.comment
                })
            }
        },
        formatDate(date){
            const year = date.getFullYear();
            const month = ('0' + (date.getMonth() + 1)).slice(-2);
            const day = ('0' + date.getDate()).slice(-2);

            return `${year}-${month}-${day}`;
        }
  },

  watch: {
    chaptersConcat: {
      handler() {
        this.selectedAll = this.chaptersConcat.every((item) => item.selected);
        if ( this.chaptersConcat.find(item => item.selected) ) {
            this.multipleDownload = true;
        } else {
            this.multipleDownload = false;
        }
      },
      deep: true,
    }
  }
      

}
</script>

<style scoped>

    .card {
    height: 412px;
    width: 280px;
    }
    .image{
        height: 412px;
    }

    .novel-infos-black{
        background-color: #17171c;
    }
    .novel-infos-ligth{
        background-color: #f5f6fc;
    }
    .novel-infos{
        
        height: 470px;
        margin-top: 26px;
        
    }
    .g_wrap{
        margin-left: auto;
        margin-right: auto;
        max-width: 980px;
    }
    
    .download:hover{
        cursor: pointer;
    }
    .item:hover{
        cursor: pointer;
    }

    .buttons{
        margin-top: 100px;
    }
    .raiting-two{
        display: none;
    }

    .v-flex + .v-flex {
        margin-left: 10px;
    }
    /* Fixez la taille des éléments de la liste à 200px */
    .v-list-item {
        width: 400px;
       
    }

    .rowtable{
        max-width: 372px; 
        white-space: nowrap; 
        overflow: hidden; 
        text-overflow: ellipsis;
    }

    .btns-item{
        margin: 10px;
    }

    .truncate{
        width: 90%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-top: 15px;
    }

    .row{
        /* max-width: 90%;  */
        max-height: 50px;
        
    }


    .buttons-hidden{
        display: none;
    }




    @media (max-width: 600px) {
        .d-flex {
        flex-wrap: wrap;
        }
    }
    @media (max-width: 1280px) {
        .g_wrap{
            max-width: 800px;
        }
        .card{
           width: 205px;
           height: 300px;
           margin-top: 20px;
        }
        .image{
            height: 300px;
        }
        .buttons{
            margin-top: 35px;
        }
        .novel-infos{   
            height: 400px;
        }
        .text-h4{

            font-size: 1.5rem !important;
            line-height: 2rem;
            margin-top: 20px;
        }

    }

    @media (min-width: 720px) and (max-width: 960px) {
        
       .center{
        display: flex;
        justify-content: center;
       }

       .g_wrap{
            max-width: 95%;
        }
        
    }

    @media (max-width: 720px) {

        .buttons{
            display: none;
        }

        .buttons-hidden{
            display: flex;
            justify-content: center;
        }

         .g_wrap{
            max-width: 90%;
        }
        /*.card{
          
           height: 200px;
           margin-top: 45px;
        }
        .image{
            height: 200px;
        } */

        .text-h4{

            font-size: 1.3rem !important;
            line-height: 1.5rem;
            margin-top: 40px;
        }
        /* .novel-infos{   
            height: 440px;
        } */
    }

    @media (max-width: 600px) {

        

        .card{
          
          width: 170px;
          height: 250px;
       }
       .image{
            height: 250px;
        }

        .novel-infos{   
            height: 700px;
        }

        .container{
            margin-left: auto;
            margin-right: auto;
            /* max-width: 350px; */
        }
        .raiting-two{
            display: block;
        }
        .raiting-one{
            visibility: hidden;
        }
        .buttons{
            margin-top: -20px;
        }

    }

    @media (max-width: 330px) {
        .text-infos{
            padding-left: 30px;
        }
    }   

</style>
