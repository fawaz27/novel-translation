<template>
    
    
  <v-container>
    

    <list-novel :last_page="last_page" :novels="novels" :page="page"  @update-page="UpdatePage"></list-novel>
   
  </v-container>
 

</template>

<script>
import { mapMutations, mapState } from 'vuex';
import ListNovel from '../components/ListNovel.vue'

export default {
	name: 'novels-list',

	components: {
	ListNovel

	},
	

	data: () => ({
		page:1,
	}),

	async created(){
		
	},
	async mounted(){
		try {
			if(this.$route.params.number_page)
				this.page = Number(this.$route.params.number_page);
			await this.$store.dispatch('getNovelsList',{listName:this.$route.params.list_name,page:this.page});
			if(this.status == 'Success Get Novels List'){
				console.log(`Good loading list ${this.$route.params.list_name} novel`);		
			}	
		} catch (error) {
			console.error(error);
		}
	},

	computed:{
		...mapState(['novels','last_page','status']),
	},
	methods:{
		...mapMutations(['setPage','setNovels']),
		async updateData(page) {
            this.setPage(page);
            try {
				await this.$store.dispatch('getNovelsList',{listName:this.$route.params.list_name,page:page});
				if(this.status == 'Success Get Novels List'){
					console.log(`Good loading list ${this.$route.params.list_name} novel`);		
				}		
            } catch (error) {
                console.error(error);
            }
        },	
		UpdatePage(newPage) {
			this.page = newPage;
			this.$router.push({ name: 'novelsList', params:{listName:this.$route.params.list_name,number_page:newPage } })
			this.updateData(newPage);
		}
	}

}
</script>

<style scoped>

</style>
