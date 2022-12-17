<template >
    <div class="">
        <router-link :to="path" ><button  class="btn-active-modale"> {{txt}}</button></router-link>
        

    </div>
</template>
<script>

export default{
    name:'button-modale',
    data(){
        return{
            
        }
    },
    props:{
        txt: { 
            type: String,
            default: "None",
            required: true
        },
        path: {
            type: String,
            required: false
        }
    }
    

}

</script>

<style>
.btn-active-modale{
    color: rgb(87, 69, 69);
    font-weight: 600;
    display: inline-block;
    padding: 5px 15px;
    border: 2px solid rgb(87, 69, 69);
    border-radius: 30px;
    transition: all .3s;
    font-size: 17px;
    margin: 0 5px 7px;
}

.btn-active-modale:hover{
    cursor: pointer;
    background-color: #0f0f0f;
    border-color: #0f0f0f;
    color: #fff
}

</style>