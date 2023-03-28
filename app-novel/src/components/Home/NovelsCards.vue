<template>
  
    <v-container>

      <div v-if="novels.length==0" class="text-center">
          <v-progress-circular
            :size="70"
            :width="7"
            color="light-blue"
            indeterminate
          ></v-progress-circular>
      </div>
      <div v-else>
        <v-row  justify-end>
                <v-col
                  v-for="(novel,index) in novels"  :key="index"
                  xs="6" sm="4" md="3" lg="2" xl
                  align-start
                >
                <div class="d-flex justify-center">
                  <v-card height="250" width="170" class="card" 
                  :to="{name:'novel',params:{name:novel.title}}">
                      <v-img
                        :src="novel.coverImageUrl"
                        class="bg-white image"
                        height="250"
                        lazy-src="https://picsum.photos/id/11/100/60"
                        cover
                        
                      >
                        <template v-slot:placeholder>
                          <div class="d-flex align-center justify-center fill-height">
                            <v-progress-circular
                              color="grey-lighten-4"
                              indeterminate
                            ></v-progress-circular>
                          </div>
                        </template>
                      </v-img>
                    </v-card>
                </div>
                <div class="d-flex justify-center"  >
                    <div class="text-truncate font-weight-bold title" 
                      @click="$router.push({ name: 'novel', params:{name: novel.title } })" 
                      >
                      {{ novel.title }}
                    </div>
                </div >
          
                </v-col>
        </v-row>

        <div class="text-center">
          <v-container>
            <v-row justify="center">
              <v-col cols="8">
                <v-container class="max-width">
                  <v-pagination
                    v-model="page"
                    class="my-4"
                    :length="30"
                    @update:model-value="updateData"
                  ></v-pagination>
                </v-container>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </div>
      
  </v-container>
    
</template>
  
  <script>
import { mapMutations, mapState } from 'vuex';
  
  export default {
    name: 'NovelsCards',
  
    data: () => ({
      currentPage: 1,
      perPage: 8,
      page:1

    }),
    computed: {
      pages () {
        return Math.ceil(this.novels.length / this.perPage);
      },
      paginatedData () {
        const start = (this.currentPage - 1) * this.perPage
        return this.novels.slice(start, start + this.perPage);
      },
      formName(title){
        return title.replaceAll(' ', '-');
      },
      ...mapState(['novels','status'])
    },

    mounted : async function() {
      try {
				await this.$store.dispatch('getNovelsLatest');
				if(this.status == 'Success Get Novels Latest'){
					console.log('Good loading novels');
          
				}		
			} catch (error) {
				console.error(error);
			}
    },
    methods: {
      ...mapMutations(['setPage','setNovels']),
      async updateData(page) {
          this.setPage(page);
          this.setNovels([]);
          try {
            await this.$store.dispatch('updateCurrentPage');
            if(this.status == 'Success Get Novels Latest'){
              console.log('Good loading novels');
            }		
          } catch (error) {
            console.error(error);
            setTimeout(() => {
              this.updateData(page);
            }, 5000);
          }
      }
    }
  }
  </script>

  <style scoped> 
	
      .title{
        max-width: 180px;

      }
      .title:hover{
        text-decoration: underline;
        cursor: pointer;
      }
      .image{
        transition: 0.5s;
      }
      .image:hover{
        transform: scale(1.1);
        box-shadow: 0 0 40px -10px rgba(0,0,0,0.25);
      }

      .v-progress-circular {
        margin: 1rem;
      }



      
  </style>
  