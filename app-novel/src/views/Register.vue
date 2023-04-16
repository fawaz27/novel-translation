<template>
    
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="10" md="8" lg="6" >
            <v-card class="elevation-16">
             
                
              <v-row>
                <v-col cols="12" >
                  <v-card-text class="mt-8">
                    <h1 
                      class="text-center "
                    >Create Account </h1>
                    <div class="text-center mt-4">
                      <v-btn class="mx-2" icon color="blue" outlined>
                        <v-icon size="45" >mdi-facebook</v-icon>
                      </v-btn>

                      <v-btn class="mx-2"  icon color="red">
                        <v-icon  size="45">mdi-google-plus</v-icon>
                      </v-btn>
                      <v-btn class="mx-2"  icon color="blue-darken-2">
                        <v-icon  size="45">mdi-linkedin</v-icon>
                      </v-btn>
                    </div>
                    <h4 class="text-center my-4">Ensure your email for registration</h4>
                    <v-form>
                      
                      
                      <v-text-field
                        label="Email"
                        name="Email"
                        append-inner-icon="mdi-email"
                        type="email"
                        color="blue-darken-2"
						v-model="body.email"
                      />
						<v-text-field
                        label="Username"
                        name="Username"
                        append-inner-icon="mdi-account"
                        type="text"
                        color="blue-darken-2"
						v-model="body.username"
                      />

                      <v-text-field
                        id="password"
                        label="Password"
                        name="password"
                        append-inner-icon="mdi-lock"
                        type="password"
                        color="blue-darken-2"
						v-model="body.password"
                      />
                      <v-text-field
                        id="Confirmpassword"
                        label="Confirm Password"
                        name="Confirmpassword"
                        append-inner-icon="mdi-lock"
                        type="password"
                        color="blue-darken-2"
						v-model="repassword"
                      />
                    </v-form>
					
					
                    <h3 class="text-center mt-4"> 
						<a v-on:click="$router.push('/login')" class="custom-link">Already have an account?</a> 	
					</h3>
                    <!-- <div class="text-center mt-4">
						<v-progress-circular v-if="loading" color="blue-darken-2" indeterminate />
					</div> -->
                  </v-card-text>
                  <div class="text-center my-4">
                    <v-btn rounded color="blue-darken-2" v-on:click="signUp" dark :disabled="!loading && !formIsValid" :loading="loading ">SIGN UP</v-btn>
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
}),
methods:{
	async signUp(){
		try {
			await this.$store.dispatch('signUp',this.body);
			if(this.status == 'Success Register'){
				this.body ={
					username :"",
					email:"",
					password :"",
					firstName:"",
					lastName:"",
					phone:"",
					role:"user"
				};
				this.repassword="";
			}
		} catch (error) {
			console.error(error);
		}
				
	}
},
computed:{

	formIsValid : function(){
		if (this.body.email!="" && this.body.password!="" && this.body.username!="" ){
					return true;
				} 
		else{
			return false;
		}
	},
	loading :function () {
		if(this.status=='loading')
			return true;
		else	
			return false;
	},
	...mapState(['status'])
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

