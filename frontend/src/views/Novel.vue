<template>
    <div class="login">
        
    </div>
  </template>
  
  <script>
  import api from '../api'

  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'login',
	data(){
		return {
			body : {
				login :"",
				password :""
			}
		}
	},
	methods:{
		async signIn(){
			let result = await api.post('auth/login',{json: this.body}).json();
			console.log(result);
			
			if(result && result!=""){
				this.$router.push({name:'home'});
				localStorage.setItem('user', JSON.stringify(result) );
				
			}
				
		}
	},
    
  }
  </script>

  <style scoped>
 
   
  </style>
  