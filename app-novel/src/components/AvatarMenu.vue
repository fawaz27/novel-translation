<template>
    <v-menu
        min-width="200px"
        rounded
      >
        <template v-slot:activator="{ props }">
          <v-btn
            icon
            v-bind="props"
          >
            <v-avatar
				color="light-blue"
				size="45"
            >
              <span v-if="user.id>0" class="text-h5">{{getInitials()}}</span>
              <v-icon v-else icon="mdi-account-circle"></v-icon>
            </v-avatar>
          </v-btn>
        </template>
        <v-card :class="{ 'hidden': scrolled }">
          <v-card-text>
            <div class="mx-auto text-center">
              

              <div v-if="user.id>0">
                <v-avatar
                    color="light-blue"
                >
                    <span class="text-h5">{{getInitials()}}</span>
                </v-avatar>
                <h3>{{user.firstName}} {{ user.lastName }} </h3>
                <p class="text-caption mt-1">
                {{user.email}}
                </p>

                <v-divider class="my-3"></v-divider>
                <v-btn
                    rounded
                    variant="text"
                    to="/bookmarks"
                >
                    My Bookmarks
                </v-btn>
                <v-divider class="my-3"></v-divider>
                <v-btn
                    rounded
                    variant="text"
                    to="/edit-account"
                >
                    Edit Account
                </v-btn>
                <v-divider class="my-3"></v-divider>
                <v-btn
                    rounded
                    variant="text"
                    @click="LogOut"
                >
                    Disconnect
                </v-btn>
              </div>

              <div v-else>
                <v-btn
                    rounded
                    variant="text"
                    to="/login"
                >
                    Log In
                </v-btn>
                <v-divider class="my-3"></v-divider>
                <v-btn
                    rounded
                    variant="text"
                    to="/register"
                >
                    Register
                </v-btn>
              </div>

              <v-divider class="my-3"></v-divider>
              <v-btn
                    rounded
                    variant="text"
                    :prepend-icon="Theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
                    @click="switchTheme"
              >
                   {{ Theme }}
              </v-btn>
              
            </div>
          </v-card-text>
        </v-card>
      </v-menu>
</template>
  
  <script>
  
  export default {
    name: 'AvatarMenu',
  
    data: () => ({
        AvatarColors: [''],
        scrolled: false
    }),
    methods:{
        getInitials(){
            return 'JD';
        },
        LogOut(){
            this.$store.commit('logOut');
        },
        switchTheme(){
            this.$store.commit('switchTheme');
        }
    },
    props:{
        user: { 
            type: Object,
            required: false
        },
        Theme:{
            type:String,
            required:true
        }
    },
    
  }
  </script>


<style scoped>
  
</style>
  