<template >

    <div class="user-avatar">
        <span class="user-name" > Hi {{username}} </span>
        <div class="dropdown">
            <button v-on:click="dropdown" class="dropbtn" v-bind:style="{ 'background-image': `url(${img})` }">
            </button>
            <div id="myDropdown" class="dropdown-content">
                <a href="#">Profil</a>
                <a href="#">Settings</a>
                <a href="#">Notifications</a>
                <a href="#">Log Out</a>
            </div>
        </div> 
    </div>

</template>
<script>

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }

}

export default{
    // eslint-disable-next-line vue/multi-word-component-names
    name:'user-item',
    data(){
        return{
            
        }
    },
    methods:{
    dropdown () { 
        document.getElementById("myDropdown").classList.toggle("show");
    },
       
    },
    props:["username","img"]

}

</script>

<style>

    .user-name{
        
        margin: 5px 10px 0 0;
    }

    .user-avatar{
        
        display: flex;
        
    }

    .dropbtn {
        background-color: #04AA6D;
        color: white;
        padding: 0px;
        font-size: 16px;
        border: none;
        cursor: pointer;
        border-radius: 50%;
        width: 35px;
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-size: cover;
    }

    

    .dropbtn:hover, .dropbtn:focus {
        background-color: #3e8e41;
    }

    .dropdown {
        float: right;
        position: relative;
        display: inline-block;
    }

    .dropdown-content {
        display: none;
        position: absolute;
        background-color: #f1f1f1;
        min-width: 160px;
        overflow: auto;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        right: 0;
        z-index: 1;
    }

    .dropdown-content a {
        color: black;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
    }

    .dropdown a:hover {
        background-color: #ddd;
    }

    .show {
        display: block;
    }
    

</style>