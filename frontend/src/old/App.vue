<template>
  <div>
    
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, user-scalable=no">
        
      </head>
      <body>
        <navbar></navbar>
        <div class="main-app">
          <router-view></router-view>
        </div>
      </body>
    </html>
    
    
    
  </div>
  
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
  .main-app{
    height: 100vh;
    width:100vh;
    margin-top: 70px;
  }

  *{
    margin: 0;
    padding: 0;
    text-decoration: none;
    list-style: none;
    box-sizing: border-box;
  }

  body{
    color: #495057;
    max-width: 100%;
    overflow-x: hidden;
    max-height: 100%;
   

  }

</style>
