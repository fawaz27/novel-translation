<template>
	
	
  <v-container>

	<list-novel :last_page="last_page" :novels="novels" :page="page"  @update-page="UpdatePage"></list-novel>
   
  </v-container>
 

</template>

<script>
import ListNovel from '@/components/ListNovel.vue';
import { mapMutations, mapState } from 'vuex';


export default {
	name: 'genre-novels-list',

	components: {
		ListNovel
	},

	data: () => ({
		page:1,
		genreName: '',
      pageNumber: '',
	}),

	async created(){
		
	},
	async mounted(){
		try {
			if(this.$route.params.number_page)
				this.page = Number(this.$route.params.number_page);
			await this.$store.dispatch('getNovelsGenre',{genreName:this.$route.params.genre_name,page:this.page});
			if(this.status == 'Success Get Novels Genre'){
				console.log(`Good loading genre list ${this.$route.params.genre_name} novel`);		
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
			this.setNovels([]);
            try {
				await this.$store.dispatch('getNovelsGenre',{genreName:this.$route.params.genre_name,page:page});
				if(this.status == 'Success Get Novels Genre'){
					console.log(`Good loading genre list ${this.$route.params.genre_name} novel`);		
				}		
            } catch (error) {
                console.error(error);
            }
        },	
		UpdatePage(newPage) {
			this.page = newPage;
			this.$router.push({ name: 'genreNovelsList', params:{genre_name:this.$route.params.genre_name,number_page:newPage } })
			//this.updateData(newPage);
		}
	},
	watch: {
		'$route.params.genre_name'() {
			this.updateData(1);
		},
		'$route.params.number_page'(newPageNumber) {
			this.updateData(newPageNumber);
		},
	},




}
</script>

<style scoped>

</style>
