<template>
    <div class="cards">
       
        <div class="container">

            <div class="novels">
                <div class="content" v-for="(novel,index) in novels"  v-bind:key="index">
                    <card-component :link="novel.img" :novelname="novel.name"></card-component>
                </div>          
            </div>
            

        </div>

        
    </div>
    
</template>

<script>
import CardComponent from './Card.vue';

export default {
 
    // eslint-disable-next-line vue/multi-word-component-names
  name: 'content-home',
   data () {
    return {
      novels: [
        {img:"https://novelfull.com/uploads/thumbs/library-of-heavens-path-d6292facbc-2239c49aee6b961904acf173b7e4602a.jpg",name:"Library of Heaven’s Path"},
        {img:"https://novelfull.com/uploads/thumbs/keyboard-immortal-07e9c3a2c3-99d73ad4eaaa291fc4d7569dc8aae41b.jpg",name:"Keyboard Immortal"},
        {img:"https://novelfull.com/uploads/thumbs/god-emperor-f0302229e9-2239c49aee6b961904acf173b7e4602a.jpg",name:"God Emperor"},
        {img:"https://novelfull.com/uploads/thumbs/martial-peak-685987ce01-2239c49aee6b961904acf173b7e4602a.jpg",name:"Martial Peak"},
        {img:"https://novelfull.com/uploads/thumbs/versatile-mage-b17368e6b8-2239c49aee6b961904acf173b7e4602a.jpg",name:"Versatile Mage"},
        {img:"https://novelfull.com/uploads/thumbs/against-the-gods-f4e50e3f24-2239c49aee6b961904acf173b7e4602a.jpg",name:"Against the Gods"},
        {img:"https://novelfull.com/uploads/thumbs/martial-god-asura-4fbd99df7b-2239c49aee6b961904acf173b7e4602a.jpg",name:"Martial God Asura"},
        {img:"https://novelfull.com/uploads/thumbs/zhan-yue-22aa372bec-1f94e70a643b46dcbefa65dce618d3fd.jpg",name:"Zhan Yue"},
        {img:"https://novelfull.com/uploads/thumbs/chaotic-sword-god-713c12b5af-2239c49aee6b961904acf173b7e4602a.jpeg",name:"Chaotic Sword God"},
        {img:"https://novelfull.com/uploads/thumbs/reverend-insanity-82661d911a-2239c49aee6b961904acf173b7e4602a.jpg",name:"Reverend Insanity"},
        
    ],
    }
  },
  components :{
    CardComponent
  }
  
}
</script>

<style scoped>

    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .cards{
        position: absolute;
        width: 100%;
        text-align: center;
        margin-top:120px
       
    }

   .container{
        
        width: 90%;
        margin: 50px auto;

    }
    .novels{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        flex-flow: wrap;
    }
     .content{
        width: 20%;
        background: #fff;
        padding: 10px 10px;
    
    }

    .card-body{
        width: 100%;
        text-align: center;  
    }
    .image{
        transition: 0.3s;
    }

    .caption{
        padding: 5px;
        text-align: center;
        line-height: 18px;
        font-family: 'Roboto Condensed',sans-serif;
    }

    .image:hover{
        transform: scale(1.05);
        box-shadow: 0 0 40px -10px rgba(0,0,0,0.25);
    }
    
    @media screen and (max-width:1080px) {
        
        .content{
            width: 30%;
        }
        
    }

    @media screen and (max-width:900px) {
        .content{
            width: 40%;
        }
        
    }

    @media screen and (max-width:620px) {
        .container{
            width: 100%;

        }
        .content{
            width: 40%;
            
        }
        
    }

    @media screen and (max-width:450px) {
        .container{
            width: 100%;

        }
        .content{
            width: 80%;
           
        }
        
    }
    

</style>