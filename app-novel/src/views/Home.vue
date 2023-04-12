<template>
    <v-container>
       <div>
        <header-main></header-main>
        <!-- <novels-cards></novels-cards> -->
        <v-row>

			<v-col
				
				class="mt-1"
				cols="12"
				style="border-bottom: 1px solid #ccc; margin-bottom: 10px; "	
				>
				<span class="text-h4 text-decoration-underline title">Novel Popular</span >
			</v-col>
			<div  
				v-if="novels.length==0" 
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
			<v-sheet v-else
				class="mx-auto"
				max-width="100%"
			>
				<v-slide-group
				show-arrows
				>
					<v-slide-group-item
						v-for="(novel,index) in novels"  :key="index"
						
					>
						
					<div align-center class="mx-2">
						<v-card height="250" width="170" class="card" 
							:to="{name:'novel',params:{name:novel.title}}">
								<v-img
									:src="novel.coverImageUrl"
									class="bg-white image"
									height="250"
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
						<div 
							class="text-truncate font-weight-bold title text-capitalize" 
							@click="$router.push({ name: 'novel', params:{name: novel.title } })"
						
							>
							{{  novel.title.replaceAll('-', ' ') }}
						</div>
					</div>
				
					
					</v-slide-group-item>
				</v-slide-group>
			</v-sheet>	

			<v-col
             
              class="mt-1"
              cols="12"
				style="border-bottom: 1px solid #ccc; margin-bottom: 10px;"
            >
              <span class="text-h4 text-decoration-underline title">Novel Last </span >
            </v-col>
			<div  
				v-if="novels.length==0" 
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
			<v-sheet v-else
				class="mx-auto"
				max-width="100%"
			>
				<v-slide-group
				show-arrows
				>
					<v-slide-group-item
						v-for="(novel,index) in novels"  :key="index"
						
					>
						
					<div align-center class="mx-2">
						<v-card height="250" width="170" class="card" 
							:to="{name:'novel',params:{name:novel.title}}">
								<v-img
									:src="novel.coverImageUrl"
									class="bg-white image"
									height="250"
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
						<div 
							class="text-truncate font-weight-bold title text-capitalize" 
							@click="$router.push({ name: 'novel', params:{name: novel.title } })"
						
							>
							{{  novel.title.replaceAll('-', ' ') }}
						</div>
					</div>
				
					
					</v-slide-group-item>
				</v-slide-group>
			</v-sheet>

			<v-col
             
              class="mt-1"
              cols="12"
				style="border-bottom: 1px solid #ccc;"           
			>
              <span class="text-h4 text-decoration-underline title " >Novel Completed </span >
            </v-col>

			<div  
				v-if="novels.length==0" 
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

			<v-col
			v-for="(novel,index) in novels"  :key="index"
			cols="6" sm = "3"
			md="2"
			xl="1"
			
			>
				<div class="d-flex justify-center">
				<v-card height="250" width="170" class="card" 
					:to="{name:'novel',params:{name:novel.title}}">
						<v-img
							:src="novel.coverImageUrl"
							class="bg-white image"
							height="250"
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
				
				<div class="d-flex justify-center"  >
						<div 
						class="text-truncate font-weight-bold title text-capitalize" 
						@click="$router.push({ name: 'novel', params:{name: novel.title } })"
					
						>
						{{  novel.title.replaceAll('-', ' ') }}
						</div>
				</div >
			</v-col>
			
			
        </v-row>
       </div> 
    </v-container>  
 </template>
 
<script>
import HeaderMain from '@/components/Home/HeaderMain.vue';
import { mapMutations, mapState } from 'vuex';
//  import NovelsCards from '@/components/Home/NovelsCards.vue';
 export default {
   name: 'home-view',
 
   components: {
      HeaderMain,
      // NovelsCards
   },
 
   data: () => ({
    
   }),
   
  computed: {
      ...mapState(['novels','status']),
      formName(title){
        return title.replaceAll(' ', '-');
      },
  },

  mounted : async function() {
      try {
				await this.$store.dispatch('getNovelsLatest');
				if(this.status == 'Success Get Novels Latest'){
					console.log('Good loading novels');
          
				}		
			} catch (error) {
				console.error(error);
			}
    },
    methods: {
      ...mapMutations(['setPage','setNovels']),
      async updateData(page) {
          this.setPage(page);
          this.setNovels([]);
          try {
            await this.$store.dispatch('updateCurrentPage');
            if(this.status == 'Success Get Novels Latest'){
              console.log('Good loading novels');
            }		
          } catch (error) {
            console.error(error);
            setTimeout(() => {
              this.updateData(page);
            }, 5000);
          }
      }
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
 