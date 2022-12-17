<template>
    
        <nav class="navbar">
            <div class="left-side">
                <router-link to="/" class="logo" >TansNovel</router-link>
                <div class="nav-links"  v-bind:class="{mobile_menu : hamburger} ">
                         <div class="search-item">
                                <input type="search" class="icon-rtl" placeholder="Search">
                        </div >
                        <ul>
                            <li v-for="(menu,index) in menus" v-bind:key="index">
                                <router-link :to="menu.path" class="menu">{{menu.name}}</router-link>
                            </li>       
                        </ul>
        
                </div>
            </div> 
            <div class="right-side">

                <div class="search-icon">
                    <input type="search" placeholder="Search">
                    <label class="icon"> <span><font-awesome-icon icon="search" /></span> </label>               
                </div>
                <div v-if="!close" class="menu-hamburger" v-on:click="hamburger = !hamburger, close =!close">
                    <font-awesome-icon icon="bars" />
                </div>
                <div v-else class="menu-close" v-on:click="hamburger = !hamburger, close =!close ">
                    <font-awesome-icon icon="times" />
                </div>
            </div>
            

        </nav>
        
    
    
</template>

<script>

export default {
  data () {
    return {
        hamburger : false,
        close : false,
        menus : [
            {path:"/",name:"Home"},
            {path:"/bookmarks",name:"Bookmarks"},
            {path:"/about",name:"About"},
        ]
    }
  },
    // eslint-disable-next-line vue/multi-word-component-names
  name: 'nav-bar',
  
}
</script>

<style scoped>
    .search-icon{
        color: white;
        height:40px;
        display: flex;
        width: 240px;
        background: #f2f2f2;
        border-radius: 5px;
        
    }

    .search-icon input {
        height: 100%;
        width: 200px;
        border:none;
        border-radius: 5px 0 0 5px;
        outline: none;
        color: #000;
        font-size: 16px;
        padding: 0 10px;
    }
    /* .icon-rtl {
        padding-right: 25px;
        background: url("https://static.thenounproject.com/png/101791-200.png") no-repeat right;
        background-size: 20px;
    } */

    
    .nav-links .search-item{
        display: none;
        border-radius: 5px;
        width:100%;
        height:50px;
        margin:0 50px 0 50px;
    }
    .nav-links  .search-item input{
        width: 90%;
        margin:auto;
        border-radius: 25px;
        height: 100%;
        padding: 0 10px;
        background: #3c4753;
        outline: none;
        color: rgb(182, 182, 182);
        font-size: 16px;
    }
    .search-icon .icon{
        height: 100%;
        width: 40px;
        line-height: 40px ;
        text-align: center;
        background: #2c3e50;
        border-radius: 0 5px 5px 0;
        cursor: pointer;
        
    }

    

    .search-icon .icon:hover{
        background: #acacb2;
        color: #000;
    }
    .search-icon .icon span{
        font-size: 18px;
    }

    .navbar .nav-links  a:hover{
        background: #1b9bff;
        transform: .5s;
    }
    .navbar .nav-links .router-link-active {
        background: #1b9bff;
        transform: .5s;
        
    }

    .navbar{
        position:fixed;
        padding: 30px;
        display:flex ;
        justify-content: space-between;
        width: 100%;
        box-sizing: border-box;
        align-items: center;
        background: #0082e6;
        height: 40px;
        z-index: 10;
        }
    .navbar .left-side {
        display: flex;
    }
    .navbar .right-side {
        display: flex;
    }
    .navbar .left-side .nav-links {
        margin-top: 20px;
    }
    .navbar .logo{
        font-size:28px;
        color:white;
        line-height: 60px;
        padding: 0 50px;
        font-weight: bold;
        text-transform:uppercase;

    }

    .navbar .nav-links ul {
       float: right;
    }

    .navbar .nav-links ul li {
        margin: 0 15px;
        display: inline-block;
        
    }

    .navbar .nav-links li a {
       color: white;
       font-size: 14px;
       text-transform: uppercase;
       border-radius: 3px;
       padding: 7px 13px;
       
    }

    
    .navbar .menu-hamburger{
        /* position: fixed; */
        top:23px;
        right: 50px;
        width: 35px;
        font-size: 30px;
        align-items: center;
        justify-content: center;
        display: none;
        color: white;
        margin: 0 10px;
    }
    .navbar .menu-close{
        /* position: fixed; */
        top:23px;
        right: 50px;
        width: 35px;
        font-size: 30px;
        align-items: center;
        justify-content: center;
        display: none;
        color: white;
        margin: 0 10px;
    }

    .navbar .menu-hamburger:hover{
        cursor: pointer;
   
    }
    .navbar .menu-close:hover{
        cursor: pointer;
   
    }
    
    @media screen and (max-width:1270px) {
        .navbar .logo{
            padding:0;
        }
    
    
    }

    
    @media screen and (max-width:1050px) {
        .navbar{
            padding: 5;
            height: 70px;
            
        }
        
        .navbar .nav-links .router-link-active{
            background: none;
            color: #0082e6;
            transform: .5s;
        
        }
        

        .navbar .nav-links{
            top: 50px;
            left: 0;
            right: 0;
            position: fixed;       
            width: 100%;
            height: 50vh;
            background:#2c3e50;
            display: flex;
            flex-direction: column;           
            align-items: center;
            justify-content: center;
            margin-left:-100% ;
            transition: all 0.3s ease-in-out;
            z-index: 5;
        }
        .navbar .mobile_menu{
           margin-left: 0;
            
        }

        .navbar .nav-links ul{
            display: flex;
            flex-direction: column;
            align-items: center;
            
          
        }

        .navbar .nav-links ul li{
            padding: 30px;
        }
        .navbar .nav-links ul li a {
            font-size: 20px;
        }

        .navbar .menu-hamburger{
            display: flex;
        }
        .navbar .menu-close{
            display: flex;
        }
        
        
    }

    @media screen and (max-width:800px) {

        .right-side .search-icon{
            display: none;
        }

        .search-item{
            display: flex;
        }
    }
    



</style>