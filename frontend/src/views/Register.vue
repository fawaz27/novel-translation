<template>
    <div class="register">

	<div class="form">
		<h2>Sign Up</h2>
		<p>
			<label for="Email" class="floatLabel">Email</label>
			<input id="Email" name="Email" type="email" v-model="body.email">
		</p>
		
		<p>
			<label for="Username" class="floatLabel">Username</label>
			<input id="Username" name="Username" type="text" v-model="body.username">
		</p>
		<p>
			<label for="password" class="floatLabel">Password</label>
			<input id="password" name="password" type="password" v-model="body.password">
			
		</p>
		<p>
			<label for="confirm_password" class="floatLabel">Confirm Password</label>
			<input id="confirm_password" name="confirm_password" type="password" v-model="repassword">
		</p>

		<div class="submit-button">
				<button v-bind:disabled="!validateFields" @click="signUp">Create My Account</button>
		</div>
		
		<div class="sub-form">
				<label>Already have an account?</label>
				<div class="link" style=""><router-link to="/login">SignIn</router-link></div>		
			</div>
		</div>
    </div>
  </template>
  
  <script>
  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'register',
	data(){
		return {
			body : {
				username :"",
				email:"",
				password :"",
				firstName:"",
				lastName:"",
				phone:"",
				role:"user"
			},
			repassword:"",
			mode:'register'
		}
	},
	methods:{
		signUp(){	
			this.$store.dispatch('signUp',this.body);
		}
	},
	mounted:function(){
		
	},
	computed:{
		validateFields : function(){
			if(this.mode == "register"){
				if (this.body.email!="" && this.body.username!="" && this.body.password!=""){
					return true;
				} 
				else{
					return false;
				}
					
			}
			else 
				return false;
		}
	}
    
  }
  </script>
  <style scoped >

	.register{
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
	input {
		display: block;
		box-sizing: border-box;
		width: 100%;
		outline: none;
		margin:0;
		height: 40px;
	}
	button{
		display: block;
		box-sizing: border-box;
		width: 100%;
		outline: none;
		margin: 0;
		height: 40px;
	}
	label{
		
		color: #999;
		font-size: 16px;
		display: inline-block;
		font-weight: 400;
		background-color: rgba(255,255,255,0);
		
    
	}

	.submit-button{
		margin: 0 0 2em 0;
		position: relative;

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
  