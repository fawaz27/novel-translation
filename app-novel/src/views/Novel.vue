<template>
    <div>
        <div class="novel-infos">

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
                                    class="bg-white image"
                                    lazy-src="https://picsum.photos/id/11/100/60"
                                    cover
                                    
                                >
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
                                color="light-blue-accent-2"
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
                            <div class="d-flex align-center flex-wrap ml-16">
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
                            class="btns-item"
                            rounded="pill"
                            color="light-blue"
                            >
                            Read
                            </v-btn>

                            <v-btn
                            rounded="pill"
                            class="btns-item"
                            color="light-blue"
                            prepend-icon="mdi-plus"
                            >
                            Add To Library
                            </v-btn>
                            
                            <v-btn
                            ref="downloadBtn"
                            class="btns-item"
                            rounded="pill"
                            color="light-blue"
                            prepend-icon="mdi-download"
                            @click="startDownload"
                            >
                            Download
                            </v-btn>

                            
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
                                <div class="text-h5 my-5">Synopsis</div>
                                <!-- <p v-if="lengthDescription > 150"> {{ truncatedDescription }} 
                                    <v-btn @click="showMore = true">Show More</v-btn>
                                </p>
                                <p v-else>{{ currentNovel.description }}</p> -->
                                <p>{{ currentNovel.description }}</p>
                            
                        </v-container>
                    </v-window-item>

                    <v-window-item :value="2" >
                        <v-container>
                            <div v-if="chaptersCurrentNovel.length==0" class="text-center">
                                <v-progress-circular
                                    :size="70"
                                    :width="7"
                                    color="light-blue"
                                    indeterminate
                                ></v-progress-circular>
                            </div>
                            <div v-else>
                                <v-row >
 
                                <v-col
                                    cols="12"
                                    sm="10"
                                    md="6"
                                >
                                    
                                    <v-table  >
                                        <tbody>
                                        <tr
                                            v-for="(chapter, index) in chapters_one" :key="index"            
                                        >          
                                            <td >
                                                
                                                <v-row no-gutters style="max-width: 372px; max-height: 50px;">
                                                    <v-col cols="2" >
                                                            <v-checkbox v-model="chapter.selected"  ></v-checkbox>
                                                    </v-col>
                                                    <v-col style="margin-top: 15px;">
                                                        
                                                            <div class="d-flex justify-space-between">
                                                                <span class="item mr-2"  :title="chapter.title"
                                                                    @click="$router.push({ name: 'chapter', params:{name: this.$route.params.name, chapter: chapter.title} })" 
                                                                    >
                                                                    {{ chapter.title }}
                                                                </span> 
                                                                <v-icon :size="20" class="download" @click="downloadChapter(chapter.url)">mdi-download</v-icon>
                                                            </div>
                                                            
                                                        
                                                    </v-col>
                                                    
                                                </v-row>
                                                     
                                                
                                            </td>
                                        </tr>
                                        </tbody>
                                    </v-table>
                                
                                </v-col>

                                <v-col
                                    cols="12"
                                    sm="10"
                                    md="6"
                                >

                                <v-table>
                                    <!-- <thead>
                                    <tr>
                                        <th class="text-left">
                                        Name
                                        </th>
                                       
                                    </tr>
                                    </thead> -->
                                    <tbody>
                                    <tr
                                        v-for="(chapter, index) in chapters_two"
                                        :key="index"
                                    >
                                        <td>
                                            <v-row>
                                            
                                               <v-checkbox v-model="chapter.selected"></v-checkbox> 
                                            {{ chapter.title }} 
                                            </v-row>
                                            
                                        
                                        </td>
                                        
                                    </tr>
                                </tbody>
  </v-table>
                                    <!-- <v-table >
                                            <tbody>
                                            <tr
                                                v-for="(chapter, index) in chapters_two" :key="index"            
                                            >          
                                                <td >
                                                    
                                                    <v-row no-gutters style="max-width: 372px; max-height: 50px;">
                                                        <v-col cols="2" >
                                                                <v-checkbox v-model="chapter.selected"></v-checkbox>
                                                        </v-col>
                                                        <v-col style="margin-top: 15px;">
                                                            
                                                                <div class="d-flex justify-space-between">
                                                                    <span class="item mr-2 text-truncate"  :title="chapter.title" 
                                                                        @click="$router.push({ name: 'chapter', params:{name: this.$route.params.name, chapter: chapter.title} })" 
                                                                        >
                                                                        {{ chapter.title }}
                                                                    </span> 
                                                                    <v-icon :size="20" class="download" @click="downloadChapter(chapter.url)">mdi-download</v-icon>
                                                                </div>
                                                                
                                                            
                                                        </v-col>
                                                        
                                                    </v-row>
                                                        
                                                    
                                                </td>
                                            </tr>
                                            </tbody>
                                    </v-table> -->
                                    

                                </v-col>

                                </v-row>

                                <div class="text-center">
                                    <v-container>
                                    <v-row justify="center">
                                        <v-col cols="8">
                                        <v-container class="max-width">
                                            <v-pagination
                                            v-model="page"
                                            class="my-4"
                                            :length="last_page"
                                            @update:model-value="updateData"
                                            ></v-pagination>
                                        </v-container>
                                        </v-col>
                                    </v-row>
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
export default {
    name: 'novel-view',
    props:{
        name: { 
            type: String
        },
    },
    components: {

    },
    mounted () {
        // this.interval = setInterval(() => {
        // if (this.value === 100) {
        //     return (this.value = 0)
        // }
        // this.value += 10
        // }, 1000)
    },

    data: () => ({
        value:0,
        showMore: false,
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
        progress: 0
        
    }),
    async created(){
        try {
				await this.$store.dispatch('getNovel',{title:this.$route.params.name,page:this.page});
				if(this.status == 'Success Get Novel'){
					console.log('Success loading novel');
                    this.chapters_one.forEach(chapter => {
                        chapter.selected = false;
                    });
                    this.chapters_two.forEach(chapter => {
                        chapter.selected = false;
                    });
				}		
			} catch (error) {
				console.error(error);
			}
    },
    computed:{
        ...mapState(['currentNovel','chaptersCurrentNovel','chapters_one','chapters_two','last_page']),
        truncatedDescription() {
            return this.currentNovel.description.substring(0, 150);
        },
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
        ...mapMutations(['setPage','setNovels','setchapterscurrentNovel']),

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
        } ,
        async updateData(page) {
            this.setPage(page);
            this.setchapterscurrentNovel([]);
            try {
                await this.updateListChapters();		
            } catch (error) {
                console.error(error);
                setTimeout(() => {
                this.updateData(page);
                }, 5000);
            }
        },

        async updateListChapters(){
            try {
                    await this.$store.dispatch('getNovel',{title:this.$route.params.name,page:this.page});
                    if(this.status == 'Success Get Novel'){
                        console.log('Good loading list chapter novel');
                        console.log(this.chaptersCurrentNovel);
                        
            
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
        }
  },
      

}
</script>

<style scoped>

    .card {
    height: 412px;
    width: 308px;
    }
    .image{
        height: 412px;
    }
    .novel-infos{
        background-color: #f5f6fc;
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
        text-decoration: underline;
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

    table{
        overflow: hidden;
    }

    .btns-item{
        margin: 10px;
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
           width: 250px;
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

    @media (max-width: 880px) {
        .g_wrap{
            max-width: 500px;
        }
        .card{
          
           height: 200px;
           margin-top: 45px;
        }
        .image{
            height: 200px;
        }

        .text-h4{

            font-size: 1.3rem !important;
            line-height: 1.5rem;
            margin-top: 40px;
        }
        .novel-infos{   
            height: 440px;
        }
    }

    @media (max-width: 600px) {

        

        .card{
          
          width: 200px;
          height: 250px;
       }
       .image{
            height: 250px;
        }

        .novel-infos{   
            height: 800px;
        }

        .container{
            margin-left: auto;
            margin-right: auto;
            max-width: 350px;
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
