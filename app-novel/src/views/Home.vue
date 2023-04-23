<template>
    <v-container>
       <div>
        <header-main></header-main>
        <!-- <novels-cards></novels-cards> -->
        <v-row>

			<slide-card :novels="novelsPopular" title="Most Popular" value="popular"></slide-card>
			<slide-card :novels="novels" title="Latest Release" value="latest"></slide-card>
            <novels-cards :novels="novelsCompleted" title="Novel Completed" value="completed"></novels-cards>
			
			
			
        </v-row>
       </div> 
    </v-container>  
 </template>
 
<script>
import HeaderMain from '@/components/Home/HeaderMain.vue';
import SlideCard from '@/components/Home/SlideCard.vue';
import { mapState } from 'vuex';
import NovelsCards from '../components/Home/NovelsCards.vue';
//  import NovelsCards from '@/components/Home/NovelsCards.vue';
 export default {
   name: 'home-view',
 
   components: {
      HeaderMain,
      SlideCard,
      NovelsCards
   },
 
   data: () => ({
    
   }),
   
  computed: {
      ...mapState(['novels','novelsCompleted','novelsPopular','status','statusCompleted','statusPopular']),
      formName(title){
        return title.replaceAll(' ', '-');
      },
  },

  mounted : async function() {
      try {
			await Promise.all([
				this.$store.dispatch('getNovelsLatest'),
				this.$store.dispatch('getNovelsCompleted'),
				this.$store.dispatch('getNovelsPopular')
			]);

			if(this.status == 'Success Get Novels Latest'){
				console.log('Good loading novels');
			}

			if(this.statusCompleted == 'Success Get Novels Completed'){
				console.log('Good loading novels completed');
			}

			if(this.statusPopular == 'Success Get Novels Popular'){
				console.log('Good loading novels popular');
			}
				
			} catch (error) {
				console.error(error);
			}
    },
    methods: {
     
    }
   
 }
 </script>
 
 <style scoped>

	.title{
		max-width: 180px;

	}
	.title:hover{
		text-decoration: underline;
		cursor: pointer;
	}

	@media (min-width: 1920px){
		.v-col-xl-1 {
			flex: 0 0 12.333%;
			max-width: 12.3%;
		}
	}


	
 

 </style>
 