<template>
    
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="10" md="8" lg="6">
            <v-card class="elevation-12">
             
                
              <v-row>
                <v-col cols="12" >
                  <v-card-text class="mt-8">
                    <h1 
                      class="text-center "
                    >Sign in </h1>
                    <div class="text-center mt-4">
                      <v-btn class="mx-2" icon color="blue" outlined>
                        <v-icon size="45" >mdi-facebook</v-icon>
                      </v-btn>

                      <v-btn class="mx-2"  icon color="red">
                        <v-icon  size="45">mdi-google-plus</v-icon>
                      </v-btn>
                      <v-btn class="mx-2"  icon color="light-blue">
                        <v-icon  size="45">mdi-linkedin</v-icon>
                      </v-btn>
                    </div>
                    <h4 class="text-center my-4">Ensure your email for registration</h4>
					<v-alert
						class="mb-4"
						v-model="alert"
						border="start"
						variant="tonal"
						closable
						close-label="Close Alert"
						color="red"
						title="Wrong Credentials"
						
						
					>
					</v-alert>
					
                    <v-form>
                      
                      <v-text-field
                        label="Email"
                        name="Email"
                        append-inner-icon="mdi-email"
                        type="text"
                        color="light-blue"
                        v-model="body.login"
                      />

                      <v-text-field
                        id="password"
                        label="Password"
                        name="password"
                        append-inner-icon="mdi-lock"
                        type="password"
                        color="light-blue"
                        v-model="body.password"
                      />
                    </v-form>
                    <h3 class="text-center mt-4"> 
                      <a v-on:click="$router.push('/forgot-password')" class="custom-link">Forgot your password ?</a>   
                      | 
                      <a v-on:click="$router.push('/register')" class="custom-link">Don't have an account?</a> 
                      
                    </h3>
					<div class="text-center mt-4">
						<v-progress-circular v-if="loading" color="light-blue" indeterminate />
					</div>
                  </v-card-text>
                  <div class="text-center my-4">
                    <v-btn rounded color="light-blue" v-on:click="signIn" dark v-bind:disabled="!formIsValid">SIGN IN</v-btn>
                  </div>
                </v-col>
                
              </v-row>
               
                
              
            </v-card>
          </v-col>
        </v-row>
      </v-container>
 

</template>

<script>
import { mapState } from 'vuex';


export default {
	name: 'LogIn',

	components: {

	},

	data: () => ({
		body:{
			login:'',
			password:''
		},
		alert:false
	}),
	
	mounted : function() {
		if(this.$store.state.user.id!=-1){
			this.$router.push("/");
			
		}


	},
	methods :{
		async signIn(){
			try {
				await this.$store.dispatch('signIn',this.body);
				if(this.status == 'Success Login'){
					this.$cookies.set("user",this.user,3600);
					this.$router.push('/');
				}		
			} catch (error) {
				console.error(error);
			}
				

		}
	},
	computed:{
		formIsValid : function(){
			if (this.body.login!="" && this.body.password!=""){
				return true;
			} 
			else{
				return false;
			}
		},
		getCookies :function () {
			return this.$store.getters.getCookies
		},
		getUser :function () {
			return this.$store.getters.getUser
		},
		loading :function () {
			if(this.status=='loading')
				return true;
			else	
				return false;
		},
		...mapState(['status','user'])
	}

}
</script>

<style scoped>

	.custom-link:hover{
		cursor: pointer; 
		text-decoration: underline;
		color: purple;
	}
</style>
