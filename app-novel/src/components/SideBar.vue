<template>
   
   <v-navigation-drawer :="drawer"  fixed temporary app>

        <v-divider></v-divider>
        <v-list
        :lines="false"
        density="compact"
        nav
        >
        <!-- <v-list-item
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

            <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item> -->
        </v-list>
    </v-navigation-drawer>
      
</template>
  
<script >
  
  export default {
    name: 'side-bar',
    
    props:{
        drawer: { 
            type: Boolean,
            default: false,
            required: true
        },
    },
    data: () => ({
    items: [
      { text: 'Genres' , path:'/genres', icon :'mdi-home'},
      { text: 'About', path :'/about', icon :'mdi-information-outline' },
      { text: 'Contact', path:'/contact', icon :'mdi-account-box' },
    ],
    }),
  }
  </script>
  