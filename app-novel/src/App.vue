<template>
   <v-app>
    
    <v-navigation-drawer v-model="drawer"  fixed temporary app>

      <v-sheet
        color=""
        class="pa-2"
      >
      <router-link to="/" exact> 
		<v-img
      class="logo"
      src="https://dewey.tailorbrands.com/production/brand_version_mockup_image/377/8049889377_3ba33b2d-fabe-480e-8958-3d07a6f5ef6f.png?cb=1673604580"
      max-height="50"
     
      ></v-img>
	</router-link>  
     
      
      </v-sheet>

      <v-divider></v-divider>
      <v-list
          :lines="false"
          density="compact"
          nav
        >
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :value="item"
            active-color="blue"
            :to="item.path"
            exact
          >
            <template v-slot:prepend>
              <v-icon  :icon="item.icon"></v-icon>
            </template>

            <v-list-item-title  v-text="item.text"></v-list-item-title>
          </v-list-item>
        </v-list>
    </v-navigation-drawer>

    <v-app-bar  app absolute>
       <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
       
          <v-img class="logo"
          src="https://dewey.tailorbrands.com/production/brand_version_mockup_image/377/8049889377_3ba33b2d-fabe-480e-8958-3d07a6f5ef6f.png?cb=1673604580"
          max-height="35"
          max-width="80"
          @click="pushToHome"
          ></v-img> 
      
    
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>

      <v-btn icon v-model="search" @click.stop="search = !search" v-if="!search">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon v-model="search" @click.stop="search = !search" v-else>
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
      <transition  name="fade"> 
          <v-text-field  
          v-model="searchText"
          v-if="search"
          outlined
          clearable
          @click:clear="clear"
          :value="searchText"
          label="Search"
          @keyup.enter="searchText = ''"
          ></v-text-field>
      </transition>

		<avatar-menu :user="user" ></avatar-menu>
    </v-app-bar>
    
    <v-main>
		<v-container>
			<router-view />
		</v-container>
      
    </v-main>
  </v-app>
</template>

<script>
import AvatarMenu from './components/AvatarMenu.vue';
export default {
  name: 'App',

  components: {
   AvatarMenu
  },

  data: () => ({
    drawer: false,
    search: false,
    searchText: '',
    items: [
      { text: 'Home' , path:'/', icon :'mdi-home'},
      { text: 'About', path :'/about', icon :'mdi-information-outline' },
      { text: 'Contact', path:'/contact', icon :'mdi-account-box' },
    ],
    user:{
      id : -1,
      username:"Jean27",
      firstName:"Jean",
      lastName:"Doe",
      email:"jean.doe@doe.com"
    },
    scrolled: false
  }),
  mounted() {
   
  },
  methods: {
    clear() {
      this.searchText = '';
    },
    pushToHome(){
      return this.$router.push('/');
    }
    
  }
}

</script>

<style scoped>
    
    .v-text-field{
		height: 55px;
		margin-right: 20px;
		max-width: 20%;
    }
   .logo{
		cursor: pointer;
   }
   .v-app-bar{
      padding: 8px 30px 8px 8px;
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
</style>
