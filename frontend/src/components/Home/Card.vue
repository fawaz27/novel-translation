<template>
    <div class="card">     
        <div class="card-body">
            <router-link :to="link" v-on:click="essai" >
                <img class="image" :src="link" :alt="novelname"  width="160" height="200">
            </router-link>
        </div>
        <div class="card-footer">
            <div class="caption">
                <router-link :to="link" class="router-link">
                        <h3>
                            <font style="vertical-align: inherit;">{{novelname}}</font>
                        </h3>
                </router-link>
                
            </div>
        </div>   
    </div>          
    
</template>

<script>

export default {
    name: 'card-component',
    data () {
        return {
        
        }
    },
    props:{
        novelname: { 
            type: String,
            default: "",
            required: true
        },
        link: { 
            type: String,
            default: "",
            required: true
        },

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
        top:130px
       
    }
    h3{
        color: black;
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
            width: 50%;
        }
        
    }

    @media screen and (max-width:450px) {
        .container{
            width: 100%;

        }
        .content{
            width: 100%;
           
        }
        
    }
    

</style>