<template>
    
    <div class="sub-navbar">

        <div v-if="!user" >
            <div class="auth">
                <span></span>
                <div class="sign-in">
                    <ButtonModaleComponent txt="Sign in" path="/login"></ButtonModaleComponent>
                </div>

                <div class="sign-up">
                    <ButtonModaleComponent txt="Sign up" path="/register"></ButtonModaleComponent>
                </div>
            </div>
           
        </div>
        <div v-else>
            <div class="user-icon">
                <user-item-vue-component username="Fawaz" :img="userimg"></user-item-vue-component>
            </div>
        </div>  
    </div>
        
    
    
    
</template>

<script>
import ButtonModaleComponent from './ButtonModale.vue';
import UserItemVueComponent from './UserItem.vue';
export default {

    name: 'sub-navbar',
    data() {
        return {
           user:false,
           userimg:"https://secure.gravatar.com/avatar/3a97752e1b7f803623c6a1b7742720b4?s=50&d=mm&r=g"
        }
    },
    components:{
        ButtonModaleComponent,
        UserItemVueComponent
          
    }

    
  
}
</script>

<style scoped>
    
    .sub-navbar{
        border-bottom:3px solid #ebebeb;
        display: flex;
        justify-content: flex-end ;
        width: 100%;
        position: absolute;
        padding: 0 20px 0 20px;
        margin-bottom: 20px ;
    }
    .auth{
        display: flex;
    }

    @media screen and (max-width:1050px) {
        .sub-navbar{
            margin-top:15px;
        }
    }
   

</style>