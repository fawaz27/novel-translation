<template>
    <div>
        <nav class="navbar">
             
             
             <router-link to="/" class="logo" >TansNovel    </router-link>
            
            
            
            <div class="nav-links"  v-bind:class="{mobile_menu : hamburger}">
                <ul>

                    <li><router-link to="/">Home</router-link></li>
                    <li><router-link to="/bookmarks">Bookmarks</router-link></li>
                    <li><router-link to="/mylibrary">My library</router-link></li>
                    <li><router-link to="/about">About</router-link></li>
                    <li><router-link to="/profile">Profile</router-link></li>
                </ul>

                
                
            </div>
            <div class="menu-hamburger" v-on:click="hamburger = !hamburger">
                <font-awesome-icon icon="bars" />
            </div>

        </nav>
        
    </div>
    
</template>

<script>

export default {
  data () {
    return {
        hamburger : false,

    }
  },
    // eslint-disable-next-line vue/multi-word-component-names
  name: 'nav-bar',
  
}
</script>

<style scoped>

    .navbar .nav-links .router-link-active{
        background: #1b9bff;
        transform: .8s;
        
    }

    .navbar{
        position:relative;
        padding: 30px;
        display:flex ;
        justify-content: space-between;
        width: 100%;
        box-sizing: border-box;
        align-items: center;
        background: #0082e6;
        height: 40px;
        
            

        }

    .navbar .logo{
        font-size:25px;
        color:white;
        line-height: 60px;
        padding: 0 50px;
        font-weight: bold;
        text-transform: uppercase;    

    }

    .navbar .nav-links ul {
        display: flex;
    }

    .navbar .nav-links ul li {
        margin: 0 15px;
        
    }

    .navbar .nav-links li a {
       color: white;
       font-size: 14px;
       text-transform: uppercase;
       border-radius: 3px;
       padding: 7px 13px;
    }

    
    .navbar .menu-hamburger{
        position: absolute;
        top:20px;
        right: 50px;
        width: 35px;
        font-size: 25px;
        align-items: center;
        justify-content: center;
        display: none;
        
        
        
    }

    .navbar .menu-hamburger:hover{
        cursor: pointer;
   
    }
    
    @media screen and (max-width:1270px) {
        .navbar .logo{
        
            padding:0;
        }
    
    
    }

    
    @media screen and (max-width:900px) {
        .navbar{
            padding: 5;
            height: 60px;;
        }
        

        .navbar .nav-links{
            top: 0;
            left: 0;
            position: absolute;          
            width: 100%;
            height: 100vh;
            background-color:#2c3e509d;
            display: flex;           
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(7px);
            margin-left: -100%;
            transition: all 0.5s ease;

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
            font-size: 30px;
        }

        .navbar .menu-hamburger{
            display: flex;

        }
        .navbar .logo{
            position: absolute;
            

        }
        
    }


    



</style>