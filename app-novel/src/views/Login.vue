<template>
    
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="6"  sm="8" md="8" lg="8" xl="6">
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
                    <v-form>
                      
                      <v-text-field
                        label="Email"
                        name="Email"
                        append-inner-icon="mdi-email"
                        type="text"
                        color="light-blue"
                      />

                      <v-text-field
                        id="password"
                        label="Password"
                        name="password"
                        append-inner-icon="mdi-lock"
                        type="password"
                        color="light-blue"
                      />
                    </v-form>
                    <h3 class="text-center mt-4">Forgot your password ?</h3>
                  </v-card-text>
                  <div class="text-center my-4">
                    <v-btn rounded color="light-blue" dark>SIGN IN</v-btn>
                  </div>
                </v-col>
                
              </v-row>
               
                
              
            </v-card>
          </v-col>
        </v-row>
      </v-container>
 

</template>

<script>

export default {
name: 'LogIn',

components: {

},

data: () => ({
  step: 1
}),

}
</script>

<style scoped>

</style>
