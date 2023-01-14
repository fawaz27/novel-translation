<template>
    <div class="login">
        <div class="form">
			<h2>Sign In</h2>
			<p>
				<label for="EmailUsername" class="floatLabel">Username/Email</label>
				<input id="EmailUsername" name="EmailUsername" type="text" v-model="body.login">
			</p>
			<p>
				<label for="password" class="floatLabel">Password</label>
				<input id="password" name="password" type="password" v-model="body.password">		
			</p>
			<p>
				<label for=""> <router-link to="/forgot-password">Lost your password?</router-link> </label>
			</p>
			<div class="submit-button">
				<button v-bind:disabled="!validateFields" @click="signIn">
					<span v-if="status=='loading'">Log In ... </span>
					<span v-else>Log In</span>		
				</button>
			</div>
			<div class="sub-form">
				<label>You do not have an account?</label>
				<div class="link" style=""><router-link to="/register">SignUp</router-link></div>		
			</div>
			<div class="sub-form" v-if="status=='error'">
				<label> Wrong Credentials</label>
			</div>
		</div>
    </div>
  </template>
  
  <script>
import { mapState } from 'vuex';


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
		signIn(){
			// const self = this;	
			this.$store.dispatch('signIn',this.body)
				.then( function(response){
					response;
					// self.$router.push('/');
				},function (error){
					console.log(error);
				});

		}
	},
	mounted:function(){
		
		if (this.$store.state.user.id != -1) {
			this.$router.push('/');
		}
	},
	computed:{
		validateFields : function(){
			
			if (this.body.login!="" && this.body.password!=""){
				return true;
			} 
			else{
				return false;
			}
			
		},
		...mapState(['status'])
	},
    props: {
      
    }
  }
  </script>

  <style scoped>
 
    .login{
		top:-10px;
		width: 100%;
		position: absolute;
		text-align: left;
		height: 122%;
		background: #d6d7d8;
		font-family: sans-serif;
		font-size: 10px;
		padding: 4em 4em 2em;
	}
	.form{
		background: #fff;
		padding: 40px;
		max-width: 400px;
		margin: 120px auto 0;
		box-shadow: 0 0 1em #222;
		border-radius: 2px;
		
	}
	h3{
		text-align: center;
	}

	h2 {
		margin:0 0 50px 0;
		padding:10px;
		text-align:center;
		font-size:30px;
		color:darken(#e5e5e5, 50%);
		border-bottom:solid 1px #e5e5e5;
	}

	p {
		margin: 0 0 2em 0;
		position: relative;
	}
	.submit-button{
		margin: 0 0 2em 0;
		position: relative;

	}
	button{
		display: block;
		box-sizing: border-box;
		width: 100%;
		outline: none;
		margin: 0;
		height: 40px;
	}
	input {
		display: block;
		box-sizing: border-box;
		width: 100%;
		outline: none;
		margin:0;
		padding: 0 5px 0 5px;
		height: 40px;
	}
	label{
		
		color: #999;
		font-size: 16px;
		display: inline-block;
		font-weight: 400;
		background-color: rgba(255,255,255,0);
		
    
	}
	.sub-form{
		display:flex; 
		justify-content: center;
	}

	.sub-form label{
		color: black;
		font-size:15px; 
	}
	.link{
		font-size:15px; 
		font-weight:700;
		margin-left: 5px ;
	}

  @media screen and (max-width:430px) {
	form{
	max-width: 300px;
	}
  }
  </style>
  