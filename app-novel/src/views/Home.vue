<template>
    
        
      <header-main></header-main>
      <novels-cards></novels-cards>
 </template>
 
 <script>
 import HeaderMain from '@/components/Home/HeaderMain.vue';
 import NovelsCards from '@/components/Home/NovelsCards.vue';
 export default {
   name: 'home-view',
 
   components: {
      HeaderMain,
      NovelsCards
   },
 
   data: () => ({
    
   }),
   
 }
 </script>
 
 <style scoped>
 
 </style>
 