<template >
   
   <div style="width: 100%;">
    <v-col 
				
				class="mt-1 d-flex justify-space-between "
				cols="12"
				style="border-bottom: 1px solid #ccc; margin-bottom: 10px; "	
				>
				<span class="text-h5 text-uppercase">{{title}}</span >
				<span class="text-h5 title" style="color: #4179E2;" @click="getNovelsList(value)" >See More</span >
			</v-col>
			<div v-if="novels.length==0" 
				class="d-flex align-center  justify-center" 
				style="width: 100%;height: 150px;" 
			>
				<div  >
					<v-progress-circular
						:size="100"
						:width="7"
						color="blue-darken-2"
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
							<span :title="novel.title.replaceAll('-', ' ')">{{  novel.title.replaceAll('-', ' ') }}</span> 
						</div>
					</div>
				
					
					</v-slide-group-item>
				</v-slide-group>
			</v-sheet>	
    </div>
    
</template>
  
  <script>
  
  export default {
    name: 'Slide-Card',
  
    data: () => ({
      
    }),
    props:{
        novels: { 
            type: Array,
            required: true
        },
        title:{
            type:String,
            required:true
        },
        value:{
            type:String,
            required:true
        }
    },
	methods:{
		async getNovelsList(listName){
			this.$router.push({
						name : 'novelsList',
						params:{list_name: listName} 
			});
			try {
				await this.$store.dispatch('getNovelsList',{listName:listName,page:1});
				if(this.status == 'Success Get Novels List'){
					console.log(`Good loading list ${this.$route.params.list_name} novel`);		
				}		
			} catch (error) {
				console.error(error);
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


  </style>
  