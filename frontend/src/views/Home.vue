<template>
    <div> 
        <sub-bar></sub-bar>
        <header-home></header-home>
        <content-home></content-home>
    </div>
    
</template>

<script>
import HeaderHome from '@/components/Home/Header-Home.vue';
import ContentHome from '@/components/Home/Content-Home.vue';
import SubBar from '@/components/Home/SubBar.vue';
export default {
    // eslint-disable-next-line vue/multi-word-component-names
  name: 'home',
  components:{
    HeaderHome,
    ContentHome,
    SubBar
  }
}
</script>

<style scoped>

</style>