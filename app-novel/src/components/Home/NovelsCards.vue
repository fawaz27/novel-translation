<template>
    <v-container>
    <v-row  justify-end>
      <v-col
        v-for="(novel,index) in paginatedData"  :key="index"
         xs="6" sm="4" md="3" lg="2" xl
         align-start
      >
      <div class="d-flex justify-center">
        <v-card height="250" width="170" class="card" 
         :to="{name:'novel',params:{id:novel.id}}">
            <v-img
              :src="novel.img"
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
            @click="$router.push({ name: 'novel', params:{id:novel.id} })" 
            >
            {{ novel.name }}
          </div>
      </div >
          
      
          
        </v-col>
    </v-row>

    <v-row justify-center>
      <v-pagination
        v-model="currentPage" 
        :length="pages" 
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
    ></v-pagination>
    </v-row>
  </v-container>
    
</template>
  
  <script>
  
  export default {
    name: 'NovelsCards',
  
    data: () => ({
      novels: [
        {id:1,img:"https://novelfull.com/uploads/thumbs/library-of-heavens-path-d6292facbc-2239c49aee6b961904acf173b7e4602a.jpg",name:"Library of Heaven’s Path fqsefqsdfdsssssssssssssssssssssssssssfsddddddddddddfsfdsqf"},
        {id:2,img:"https://novelfull.com/uploads/thumbs/keyboard-immortal-07e9c3a2c3-99d73ad4eaaa291fc4d7569dc8aae41b.jpg",name:"Keyboard Immortal"},
        {id:3,img:"https://novelfull.com/uploads/thumbs/god-emperor-f0302229e9-2239c49aee6b961904acf173b7e4602a.jpg",name:"God Emperor"},
        {id:4,img:"https://novelfull.com/uploads/thumbs/martial-peak-685987ce01-2239c49aee6b961904acf173b7e4602a.jpg",name:"Martial Peak"},
        {id:5,img:"https://novelfull.com/uploads/thumbs/versatile-mage-b17368e6b8-2239c49aee6b961904acf173b7e4602a.jpg",name:"Versatile Mage"},
        {id:6,img:"https://novelfull.com/uploads/thumbs/against-the-gods-f4e50e3f24-2239c49aee6b961904acf173b7e4602a.jpg",name:"Against the Gods"},
        {id:7,img:"https://novelfull.com/uploads/thumbs/martial-god-asura-4fbd99df7b-2239c49aee6b961904acf173b7e4602a.jpg",name:"Martial God Asura"},
        {id:8,img:"https://novelfull.com/uploads/thumbs/zhan-yue-22aa372bec-1f94e70a643b46dcbefa65dce618d3fd.jpg",name:"Zhan Yue"},
        {id:9,img:"https://novelfull.com/uploads/thumbs/chaotic-sword-god-713c12b5af-2239c49aee6b961904acf173b7e4602a.jpeg",name:"Chaotic Sword God"},
        {id:10,img:"https://novelfull.com/uploads/thumbs/reverend-insanity-82661d911a-2239c49aee6b961904acf173b7e4602a.jpg",name:"Reverend Insanity"},
        {id:11,img:"https://novelfull.com/uploads/thumbs/library-of-heavens-path-d6292facbc-2239c49aee6b961904acf173b7e4602a.jpg",name:"Library of Heaven’s Path fqsefqsdfdsssssssssssssssssssssssssssfsddddddddddddfsfdsqf"},
        {id:12,img:"https://novelfull.com/uploads/thumbs/keyboard-immortal-07e9c3a2c3-99d73ad4eaaa291fc4d7569dc8aae41b.jpg",name:"Keyboard Immortal"},
        {id:13,img:"https://novelfull.com/uploads/thumbs/god-emperor-f0302229e9-2239c49aee6b961904acf173b7e4602a.jpg",name:"God Emperor"},
        {id:14,img:"https://novelfull.com/uploads/thumbs/martial-peak-685987ce01-2239c49aee6b961904acf173b7e4602a.jpg",name:"Martial Peak"},
        {id:15,img:"https://novelfull.com/uploads/thumbs/versatile-mage-b17368e6b8-2239c49aee6b961904acf173b7e4602a.jpg",name:"Versatile Mage"},
        {id:16,img:"https://novelfull.com/uploads/thumbs/against-the-gods-f4e50e3f24-2239c49aee6b961904acf173b7e4602a.jpg",name:"Against the Gods"},
        {id:17,img:"https://novelfull.com/uploads/thumbs/martial-god-asura-4fbd99df7b-2239c49aee6b961904acf173b7e4602a.jpg",name:"Martial God Asura"},
        {id:18,img:"https://novelfull.com/uploads/thumbs/zhan-yue-22aa372bec-1f94e70a643b46dcbefa65dce618d3fd.jpg",name:"Zhan Yue"},
        {id:19,img:"https://novelfull.com/uploads/thumbs/chaotic-sword-god-713c12b5af-2239c49aee6b961904acf173b7e4602a.jpeg",name:"Chaotic Sword God"},
        {id:20,img:"https://novelfull.com/uploads/thumbs/reverend-insanity-82661d911a-2239c49aee6b961904acf173b7e4602a.jpg",name:"Reverend Insanity"},
        
      ],
      currentPage: 1,
      perPage: 8,

    }),
    computed: {
      pages () {
        return Math.ceil(this.novels.length / this.perPage)
      },
      paginatedData () {
        const start = (this.currentPage - 1) * this.perPage
        return this.novels.slice(start, start + this.perPage)
      }
    },
    methods: {
     
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


      
  </style>
  