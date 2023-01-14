import { createStore } from 'vuex'
import api from './api';
// import Cookies from 'universal-cookie';
let user = localStorage.getItem('user');
if (!user) {
    user = {
        "id":-1,
        "lastName":"",
        "firstName":"",
        "email":"",
        "username":"",
        "isEmailConfirmed":false,
        "password":"",
        "phone":"",
        "role":""
    } 
}
export default createStore({
    state:{
        status : '',
        user : user
    },
    mutations:{
        setStatus : function (state,status){
            state.status = status;
        },
        logUser : function (state,user){
            state.user = user;
        }
    },
    actions:{
        signIn : async ({commit},userInfos)=>{
            commit('setStatus','loading');    
            // const cookies = new Cookies();

            try {

                const response =  await api.post('auth/login',{json: userInfos});
                if (response.status == 200) {
                    const data = await response.json();
                    console.log(data);                  
                    commit('setStatus','');
                    commit('logUser',data);
                } 
                else {
                    commit('setStatus','error');
                    console.log("Error");
                } 
            } catch (error) {
                commit('setStatus','error');
                console.error(error);
            }            
        },
        signUp : async ({commit},userInfos)=>{
            
            try {
                commit('setStatus','loading');
                const response = await api.post('auth/register',{json: userInfos});
                if (response.status == 201) {
                    const data = await response.json();
                    data;
                    commit('setStatus','');
                }
                else {
                    commit('setStatus','error');
                    console.log('Error');
                }
              
            } catch (error) {
                console.error(error);
            }

        }
    }
})