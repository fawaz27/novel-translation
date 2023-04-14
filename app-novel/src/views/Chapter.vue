<template>
    <div>
        
        <div class="container">
        
        <div class="chapter-title text-center"> 
            
                <div class="text-h5 item" @click="$router.push({ 
                    name: 'novel', 
                    params:{name: this.$route.params.name } 
                    })"
                >{{ contentChapterCurrent.titleNovel }}</div>
                <div class="text-h7 item my-2">{{ contentChapterCurrent.titleNovel }} - {{  contentChapterCurrent.title }}</div>
        </div>
        <div class="chapter-buttons d-flex justify-center  my-4" style="gap: 1rem">

            <v-btn
            color="light-blue-accent-2 "
            prepend-icon = "mdi-arrow-left"
            @click="prevChapter"
            v-bind:disabled="!(contentChapterCurrent.prevUrl!=undefined)" 
            >
            <span 
                class="text-btn" 
            > 
                Prev Chapter
            </span> 
            </v-btn>

            <v-btn
            color="light-blue-accent-2 "
            prepend-icon = "mdi-home"
            @click="$router.push({ name: 'novel', params:{name: this.$route.params.name } })"
            >
            <span 
                class="text-btn"
            > 
                Index
            </span> 
            </v-btn>
            <v-btn
            color="light-blue-accent-2"
            append-icon ="mdi-arrow-right"
            @click="nextChapter"
            v-bind:disabled="!(contentChapterCurrent.nextUrl!=undefined)"
            >
            <span 
                class="text-btn"
            >
                Next Chapter
            </span>
            </v-btn>
            

        </div>

        <div  v-if="waiting" 
				class="d-flex align-center  justify-center" 
				style="width: 100%;height: 150px;" 
			>
				<div  >
					<v-progress-circular
						:size="100"
						:width="7"
						color="light-blue"
						indeterminate
					></v-progress-circular>
				</div>
				
		</div>
        <div v-else class="chapter-content" style="font-size: 20px;">
            <p class="my-4 font-weight-black" >{{ contentChapterCurrent.title }}</p>
            <p class="my-4 "  v-for = "(paragraph,index) in contentChapterCurrent.content" :key="index"> {{ paragraph }}</p>
        </div>

        <v-divider thickness="2"></v-divider>
        
        <div class="chapter-buttons d-flex justify-center  my-6" style="gap: 1rem">

            <v-btn
                color="light-blue-accent-2 "
                prepend-icon = "mdi-arrow-left"
                @click="prevChapter"
                v-bind:disabled="!(contentChapterCurrent.prevUrl!=undefined)" 
            >
            <span 
                class="text-btn" 
            > 
                Prev Chapter
            </span> 
            </v-btn>

            <v-btn
                color="light-blue-accent-2 "
                prepend-icon = "mdi-home"
                @click="$router.push({ name: 'novel', params:{name: this.$route.params.name } })"
            >
            <span 
                class="text-btn"
            > 
                Index
            </span> 
            </v-btn>
            <v-btn
                color="light-blue-accent-2"
                append-icon ="mdi-arrow-right"
                @click="nextChapter"
                v-bind:disabled="!(contentChapterCurrent.nextUrl!=undefined)"
            >
            <span 
                class="text-btn"
            >
                Next Chapter
            </span>
            </v-btn>


        </div>

        </div>
    
        <v-btn 
                v-show="showBackToTopBtn"
                color="light-blue-accent-4"
                icon="mdi-chevron-up"
                @click="scrollToTop"
                class="btn-top"

                >
                
        </v-btn>
    </div>
    

</template>

<script>
import { mapMutations, mapState } from 'vuex';


export default {
    name: 'chapter-view',
    props:{
        name: { 
            type: String
        },
        chapter:{
            type: String
        }
    },

    components: {

    },

    data: () => ({
        waiting: true,
        chapter_test: {
        title_novel: "MMORPG: Rebirth as an Alchemist",
        title_chapter: "1 Ren",
        content: [
          "",
          "",
          "",
          "“Re . . . n . . .”",
          "“Ren!”",
          "Ren blinked, and his eyes zeroed on his father.",
          "“Did you hear what I said?”",
          "Ren was definitely dreaming. One moment, men were chasing him, and the next thing he knew, he was jumping off a building.",
        ]},
        showBackToTopBtn: false
    }),

    computed:{
        ...mapState(['contentChapterCurrent','currentNovel','status'])
    },
    mounted (){
        this.getChapterContent();
        window.addEventListener("scroll", this.handleScroll);
        window.addEventListener("keydown", this.onKeyDown);
    },
    beforeUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
        window.removeEventListener("keydown", this.onKeyDown);
    },
    methods:{
        ...mapMutations(['setcontentChapter']),
        async getChapterContent() {
            try {
				await this.$store.dispatch('getChapterContent',
                {
                    name:this.$route.params.name, 
                    chapter:this.$route.params.chapter
                });
				if(this.status == 'Success Get Chapter Content'){
					console.log('Success loading chapter');
                    this.waiting = false;
                    
				}		
			} catch (error) {
				console.error(error);
			}
        },
        async getNextPrevChapterContent(chapter) {
            console.log('chpater is : '+chapter);
            try {
				await this.$store.dispatch('getChapterContent',
                {
                    name:this.$route.params.name, 
                    chapter:chapter
                });
				if(this.status == 'Success Get Chapter Content'){
					console.log('Success loading chapter');
                    this.waiting = false;
				}		
			} catch (error) {
				console.error(error);
			}
        },
        nextChapter() {
            this.$router.push({
                name: 'chapter',
                params: {
                name: this.$route.params.name,
                chapter: this.contentChapterCurrent.name_next_chap
                }
            });
            this.waiting = true;
            this.getNextPrevChapterContent(this.contentChapterCurrent.name_next_chap);
        },
        prevChapter() {
            this.$router.push({
                name: 'chapter',
                params: {
                name: this.$route.params.name,
                chapter: this.contentChapterCurrent.name_prev_chap
                }
            });
            this.waiting = true;
            this.getNextPrevChapterContent(this.contentChapterCurrent.name_prev_chap);
        },
        downloadChapter() {
            // Construire le contenu du fichier HTML
            const html = `
                <html>
                <head>
                    <title>${this.contentChapterCurrent.title_novel} - ${this.contentChapterCurrent.title_chapter}</title>
                </head>
                <body>
                    <div style="margin-right: auto;margin-left: auto;padding-left: 20px;padding-right: 20px;">
                        <h1>${this.contentChapterCurrent.title_novel}</h1>
                        <h2>${this.contentChapterCurrent.title_chapter}</h2>
                        <p>
                        ${this.contentChapterCurrent.content.join("<br><br>")}
                        </p>
                    <div/>
                </body>
                </html>
            `;
            // Créer un lien pour télécharger le fichier HTML
            const link = document.createElement("a");
            link.href = URL.createObjectURL(
                new Blob([html], { type: "text/html" })
            );
            link.setAttribute("download", `${this.contentChapterCurrent.title_chapter}.html`);
            document.body.appendChild(link);
            link.click();
        },
        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        },
        handleScroll() {
        this.showBackToTopBtn = window.pageYOffset > 100;
        },
        onKeyDown(event) {
            if (event.keyCode === 37) {
                this.prevChapter();
            } else if (event.keyCode === 39) {
                this.nextChapter();
            }
        }
    }

}
</script>

<style scoped>

    
    .container{
       
        padding-left: 20px;
        padding-right: 20px;
        max-width: 1200px;
        margin: 30px auto;
    }
    .item:hover{
        text-decoration: underline;
        cursor: pointer;
    }

    .btn-top{
        display: block;
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 999;
        opacity: .6;
    }
    

    @media (max-width: 500px) {
        .text-btn{
            display: none;
        }
    }   

</style>
