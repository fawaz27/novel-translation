<template>
    
    
    <v-text-field
        
        :class="classe"
        color="light-blue"  
        prepend-inner-icon="mdi-magnify"
        clearable
        :="searchText"
        label="Search"
        density="compact"
        variant="outlined"
        single-line
        hide-details
        @click:prepend-inner="searchAction"
        @keyup.enter="searchAction"
        >
    </v-text-field>
    
</template>
  
  <script>
  
  export default {
    name: 'search-menu',
    props:{
        searchAction: { 
            type: Function,
            default: null,
            required: true
        },
        searchText: { 
            type: String,
            default: "",
            required: true
        },
        classe: { 
            type: String,
            default: "",
            required: true
        }
    },
    data: () => ({
     
    }),
    
  }
</script>

<style scoped>

    .text-field-search{
        
    }
    .v-text-field{
       
    }
   
</style>
  