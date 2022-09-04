<template>
    <div class="content-home">
        <hr>

        <div class="container">

            <div class="row">
                <div class="card" v-for="(novel,index) in novels"  v-bind:key="index">
                    <div class="card-body">
                        <img :src="novel.img" :alt="novel.name"  width="150" height="200">
                    </div>
                    <div class="card-footer">
                        <div class="caption">
                            <h3>
                                <font style="vertical-align: inherit;">{{novel.name}}</font>
                            </h3>
                        </div>

                    </div>   
                </div>

                
            </div>
            

        </div>

        
    </div>
    
</template>

<script>

export default {
 
    // eslint-disable-next-line vue/multi-word-component-names
  name: 'content-home',
   data () {
    return {
      novels: [
        {img:"https://www.japanread.cc/media/cache/manga_medium/images/mangas/cover/002.png",name:"Tales of Demons and Gods"},
        {img:"https://www.japanread.cc/media/cache/manga_medium/images/mangas/cover/5f7bd82e659fa728498660.png",name:"Tale of a Scribe Who Retires to the Countryside"},
        {img:"https://www.japanread.cc/media/cache/manga_medium/images/mangas/cover/5f47280e9916c898155595.jpg",name:"Solo Leveling"},
        {img:"https://www.japanread.cc/media/cache/manga_medium/images/mangas/cover/627f7d7f103d9828056414.png",name:"Martial Peak"},
        {img:"https://www.japanread.cc/media/cache/manga_medium/images/mangas/cover/5f6b00c2840ed416048069.jpg",name:"I have a Dragon in My Body"},
        {img:"https://www.japanread.cc/media/cache/manga_medium/images/mangas/cover/60afb93735ffc292276252.png",name:"Martial Art Reigns"},
        {img:"https://www.japanread.cc/media/cache/manga_medium/images/mangas/cover/5f21807a6b7dc573137089.jpg",name:"Ao ashi"},
        {img:"https://www.japanread.cc/media/cache/manga_medium/images/mangas/cover/002.png",name:"Star Martial God Technique"},
        {img:"https://www.japanread.cc/media/cache/manga_medium/images/mangas/cover/612faeac081d2357004918.jpg",name:"Versatile Mage"},
        {img:"https://www.japanread.cc/media/cache/manga_medium/images/mangas/cover/5ce1901c1d4d1191397194.jpg",name:"Blue Lock"},
        {img:"https://www.japanread.cc/media/cache/manga_medium/images/mangas/cover/5fa7cd5c7cdf7568162979.jpg",name:"Mercenary Enrollement"},
    
    
    ],
    }
  },
  
}
</script>

<style scoped>
    .content-home{
        width: 100%;
        position: absolute;
        top: 200px;
    }
    .container{
        /* 
        margin: 50px auto; */
        width: 90%;
        padding-left: 10%;
        
        


        

    }
    .row{
        display: flex;
        justify-content:flex-start ;
        flex-flow: wrap;
    }
     .card{
        margin: 50px 0px 15px 15px ;
        background: #fff;
        
        transition: 0.3s;
        max-height: 200px;
        max-width: 150px;
    
    }

    .card-body{
        width: 100%;
        text-align: center;
        
    } 

    .caption{
        padding: 5px;
        text-align: center;
        line-height: 18px;
        font-family: 'Roboto Condensed',sans-serif;
    }
    /* .card-header{
        text-align: center;
        padding: 50px 10px;
        background: linear-gradient(to right,#ff416c,#ff4b2b);
        color: #fff;
    } */

    /* .card-body{
        padding: 30px 20px;
        text-align: center;
        font-size: 18px;
    } */ 

    /* .card-body .btn{
        display: block;
        color: #fff;
        text-align: center;
        background: linear-gradient(to right,#ff416c,#ff4b2b);
        margin-top: 30px;
        text-decoration: none;
        padding: 10px 5px;


    } */

    .card:hover{
        transform: scale(1.05);
        box-shadow: 0 0 40px -10px rgba(0,0,0,0.25);
    }


    @media screen and (max-width:1000px) {
        .card{
            max-width: 150px;
        }
        
    }
    

</style>