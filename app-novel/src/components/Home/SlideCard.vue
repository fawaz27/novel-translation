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
		
		

		<v-sheet v-if="novels.length==0"
			class="mx-auto"
			max-width="100%"
		>
			<v-slide-group
			show-arrows
			>
				<v-slide-group-item
					v-for="n in 15"  :key="n"
					
				>
					
				<div align-center class="mx-2">
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
					<div 
					class="text-truncate font-weight-bold title text-capitalize" 
					>
					<v-sheet
					class="mt-1 ml-2"
					style="height: 10px; width: 150px;"  
					color="grey-lighten-3"
					></v-sheet> 
				</div>
				</div>
				
			
				
				</v-slide-group-item>
			</v-slide-group>
		</v-sheet>

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
  