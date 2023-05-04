<template>
  
    <v-container style="width: 100%;">

      
      <v-col
             
              class="mt-4 d-flex justify-space-between"
              cols="12"
				style="border-bottom: 1px solid #ccc;"           
			>
				<span class="text-h5 text-uppercase" >{{title}}</span >
				<span class="text-h5 title" style="color: #4179E2;" @click="getNovelsList(value)" >See More</span >
      </v-col>
  

			
		<v-row class="mt-4" v-if="novels.length==0">
          <v-col
            v-for="n in 16"  
            :key="n"
            cols="6" 
            sm = "4"
            md="3"
            lg="2"
            xl="1"
          
          >
				<div class="d-flex justify-center">
				<v-card height="250" width="170" class="card" 
					>
						<v-img
							
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
						>
						<v-sheet
						class="mt-1"
						style="height: 10px; width: 150px;"  
						color="grey-lighten-3"
						></v-sheet>
						</div>
				</div >
				
				
			</v-col>
      </v-row>

      <v-row class="mt-4">
          <v-col
            v-for="(novel,index) in novels.slice(0, 16)"  
            :key="index"
            cols="6" 
            sm = "4"
            md="3"
            lg="2"
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
						<span :title="novel.title.replaceAll('-', ' ')">{{  novel.title.replaceAll('-', ' ') }}</span> 
						</div>
				</div >
			</v-col>
      </v-row>
			
    </v-container>
    
</template>
  
  <script>
  export default {
    name: 'Novels-Cards',
  
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
      
      @media (min-width: 1920px){
		.v-col-xl-1 {
			flex: 0 0 12.333%;
			max-width: 12.3%;
		}
	}

  </style>
  