<template>
   <v-app :theme="Theme">

    

    <v-app-bar  app >
		<v-row no-gutters v-if="!search">
			<v-col cols="4" md="6" class="d-flex justify-start">
				<v-img class="logo"
				src="https://dewey.tailorbrands.com/production/brand_version_mockup_image/377/8049889377_3ba33b2d-fabe-480e-8958-3d07a6f5ef6f.png?cb=1673604580"
				max-height="50"
				max-width="150"
				@click="pushToHome"
				></v-img>
				<div class="btn-menus">
					<v-menu :location="location"  >
					<template v-slot:activator="{ props }">
						<v-btn
						class="text-capitalize text-h6"
						dark
						v-bind="props"
						prepend-icon="mdi-view-list"
						append-icon="mdi-menu-down"
						>
						Novel List
						</v-btn>
					</template>

					<v-list>
						<v-list-item 
							v-for="(novel,index) in novelsList" 
							:key="index" :prepend-icon="novel.icon" 
							:title="novel.title"
							:value="novel.value" 
							style="font-size: 18px;"
							active-color="blue-darken-2"
							@click="getNovelsList(novel.value)"
						>
						</v-list-item>
					</v-list>
					</v-menu >
					<v-menu :location="location"  >
						<template v-slot:activator="{ props }">
							<v-btn
							class="text-capitalize text-h6"
							dark
							v-bind="props"
							prepend-icon="mdi-view-list"
							append-icon="mdi-menu-down"
							>
							Genres
							</v-btn>
						</template>

						<v-list>
							<v-list-item 
								v-for="(genre,index) in genresList" 
								:key="index" 
								:title="genre.title"
								:value="genre.value" 
								style="font-size: 18px;"
							>
							</v-list-item>
						</v-list>
					</v-menu> 
				</div>
				
			</v-col>
			<v-col cols="6" md="4" class="d-flex justify-center">
				<search :searchAction="searchAction" :searchText="searchText" :classe="'text-field-search'" ></search>
				<v-btn icon  class="search-icon" @click="search=!search" >
					<v-icon icon="mdi-magnify"></v-icon>
				</v-btn>
				
			</v-col>	
			<v-col cols="2"  class="d-flex justify-end" >
				
				<v-btn icon >

					<v-badge :content="4" class="mr-4" color="error">
						<v-icon icon="mdi-bell" size="x-large"></v-icon>
					</v-badge>
				</v-btn>
				<avatar-menu :user="user" :Theme="Theme"  ></avatar-menu>
				<v-app-bar-nav-icon @click="drawer = !drawer" class="icon-nav"></v-app-bar-nav-icon>
			</v-col>
		</v-row>
		<v-row no-gutters v-else>
			<v-col cols="12" class="d-flex justify-end">
					<search :searchAction="searchAction" :searchText="searchText" :classe="'searchfield'" ></search>
				
					<v-btn icon class="ml-2" @click="search=!search" >
						<v-icon icon="mdi-close"></v-icon>
					</v-btn>
			</v-col>
			
		</v-row>
		
		
		
    </v-app-bar>

	<v-navigation-drawer
		v-if="this.$vuetify.display.width <=961"
		v-model="drawer"
		fixed
		temporary
		style="font-size: 20px; width: 300px;"
    >
	
	<v-list nav class="mt-4" >

		<v-list-group  value="Novels">
			<template v-slot:activator="{ props }">
				<v-list-item
				v-bind="props"
				prepend-icon="mdi-view-list"
				title="Novel List"
				></v-list-item>
			</template>
			<v-list-item 
				v-for="(novel,index) in novelsList" 
				:key="index" :prepend-icon="novel.icon" 
				:title="novel.title"
				:value="novel.value" 
				style="font-size: 18px;"
				@click="getNovelsList(novel.value)"
				active-color="blue-darken-2"
			>
			</v-list-item>
			
			
		</v-list-group>  
        <v-list-group value="Genres">
			<template v-slot:activator="{ props }">
				<v-list-item
				v-bind="props"
				prepend-icon="mdi-view-list"
				title="Genres"
				></v-list-item>
			</template>
			<v-list-item 
				v-for="(genre,index) in genresList" 
				:key="index" :prepend-icon="genre.icon" 
				:title="genre.title"
				:value="genre.value" 
				style="font-size: 18px;"
			>
			</v-list-item>
		</v-list-group>   
    </v-list>
    
    </v-navigation-drawer>
	
	
    <v-main>
			<router-view />
    </v-main>

    <v-footer app style="border-top: 1px solid #ccc;" >
      <div>

    TransNovel.com | Lire des livres en ligne et des romans gratuits en ligne 
      </div>
    <v-spacer></v-spacer>
    <div>
      © Copyright TransNovel {{ new Date().getFullYear() }} .  
    </div>
  </v-footer>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import AvatarMenu from './components/AvatarMenu.vue';
import Search from './components/Search.vue';
export default {
  name: 'App',

  components: {
    AvatarMenu,
    Search
	},

	props: {
		location: Object
	},
  data: () => ({
    search: false,
	drawer:false,
    searchText: '',
	items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
	novelsList: [
	{ icon:"mdi-book-sync-outline" ,title: 'Latest Release', value:'latest' },
	{ icon:"mdi-book-check-outline" ,title: 'Completed' , value:'completed' },
	{ icon:"mdi-book-arrow-up-outline" ,title: 'Most popular', value:'popular' },
	],
	genresList :[
	{ title: 'Action', value:'action' },
	{ title: 'Romance' , value:'romance' },
	{ title: 'Wuxia', value:'wuxia' },
	],
    // scrolled: false
  }),
  mounted() {
  },
  methods: {
	searchAction(){
		
	},
    pushToHome(){
	return this.$router.push('/');
    },
    clear() {
        this.searchText = '';
    },
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
  },
  computed:{
    ...mapState(['user','Theme'])
  }
}

</script>

<style scoped>
    

	/* .v-list-item--nav .v-list-item-title{
		font-size: 1.2rem;
		font-weight: 400;
		line-height: 3rem;
	} */
	i{
		
		margin-inline-end: 12px;
	}
   .logo{
		cursor: pointer;
   }
   .v-btn{
		height: 100%;
   }
   .v-app-bar{
      padding: 8px 30px 8px 8px;
    }
	.icon-nav{
		display: none;
	}
	
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to {
      opacity: 0;
    }

    .v-list-item--nav .v-list-item-title{
      font-size: 1.5rem;
      line-height: 3rem;
    }
    .v-icon{
      font-size: 30px;
    }

	.search-icon{
		display: none;
	}

	.v-text-field{
		margin-left: 0px;
		max-width: 70%;
	}
	
	@media screen and (max-width:960px) {
        
        .v-text-field{
			margin-left: 0px;
			max-width: 60%;
		}

		.btn-menus{
			display: none;
		}
		.logo{
			margin-left: 35px ;
		}
		.icon-nav{
			display: block;
		}
		
    }

	@media screen and (max-width:800px) {
		.v-text-field{
			margin-left: 0px;
			max-width: 80%;
		}

    }

	@media screen and (max-width:710px) {
		.v-text-field{
			margin-left: -70px;
			max-width: 80%;
		}
		
    }

	@media screen and (max-width:560px) {
		.text-field-search{
			display: none;
		}
		.search-icon{
			display: block;
			margin-left: 50px;
		}
		
    }
	@media screen and (max-width:480px) {
		.search-icon{
			display: block;
			margin-left: 0px;
		}
		
    }
	@media screen and (max-width:480px) {
		.search-icon{
			display: block;
			margin-left: -70px;
		}
		
    }

	@media (min-width: 1920px){
		.v-container {
			max-width: 1500px;
		}
	}
		
</style>
