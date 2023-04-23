<template>
    
    
    <v-row justify="center">
        <v-col cols="8">
        <v-container class="">
            <v-pagination
            v-model="currentPage"
            class="my-4"
            :length="last_page"
            ></v-pagination>
        </v-container>
        </v-col>
    </v-row>
    
</template>
  
  <script>
  
  export default {
    name: 'pagination-component',
    props:{
        last_page: { 
            type: Number,
            default: 1,
            required: true
        },
        page: { 
            type: Number,
            default: 1,
        },
    },
    methods:{
    },
    data() {
        return {
            currentPage: this.page
        }
    },
    watch: {
        currentPage(newValue) {
            this.$emit('update-page', newValue);
        }
    }
    
  }
</script>

<style scoped>

   
</style>
  