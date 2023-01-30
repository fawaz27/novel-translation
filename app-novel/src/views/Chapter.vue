<template>
    <div class="chapter container">
        <div class="chapter-title text-center">
                <div class="text-h5 item" @click="$router.push({ name: 'novel', params:{name: this.$route.params.name } })">{{ contentChapterCurrent.title_novel }}</div>
                <div class="text-h7 item my-2">{{ contentChapterCurrent.title_chapter }}</div>
        </div>
        <div class="chapter-buttons d-flex justify-center  my-4" style="gap: 1rem">

            <v-btn
            color="light-blue-accent-2 "
            prepend-icon = "mdi-arrow-left"
            @click="prevChapter"
            v-bind:disabled="!(contentChapterCurrent.prev_chap!=undefined)" 
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
            v-bind:disabled="!(contentChapterCurrent.next_chap!=undefined)"
            >
            <span 
                class="text-btn"
            >
                Next Chapter
            </span>
            </v-btn>
            

        </div>
        <div class="chapter-content">
            <p class="my-4" v-for = "(paragraph,index) in contentChapterCurrent.content" :key="index"> {{ paragraph }}</p>
        </div>

        <v-divider thickness="2"></v-divider>
        <div class="chapter-buttons d-flex justify-center  my-6" style="gap: 1rem">

            <v-btn
                color="light-blue-accent-2 "
                prepend-icon = "mdi-arrow-left"
                @click="prevChapter"
                v-bind:disabled="!(contentChapterCurrent.prev_chap!=undefined)" 
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
                v-bind:disabled="!(contentChapterCurrent.next_chap!=undefined)"
            >
            <span 
                class="text-btn"
            >
                Next Chapter
            </span>
            </v-btn>


        </div>

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
    }),

    computed:{
        ...mapState(['contentChapterCurrent'])
    },
    mounted (){
        this.getChapterContent()
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
                    
				}		
			} catch (error) {
				console.error(error);
			}
        },
        async getNextPrevChapterContent(chapter) {
            try {
				await this.$store.dispatch('getChapterContent',
                {
                    name:this.$route.params.name, 
                    chapter:chapter
                });
				if(this.status == 'Success Get Chapter Content'){
					console.log('Success loading chapter');
                    
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
            // this.setcontentChapter({});
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
            // this.setcontentChapter({});
            this.getNextPrevChapterContent(this.contentChapterCurrent.name_prev_chap);
        }
    }

}
</script>

<style scoped>

    .chapter{
        margin-top: 26px;
    }
    .container{
        margin-right: auto;
        margin-left: auto;
        padding-left: 20px;
        padding-right: 20px;
    }
    .item:hover{
        text-decoration: underline;
        cursor: pointer;
    }

    @media (max-width: 500px) {
        .text-btn{
            display: none;
        }
    }   

</style>
