import { createStore } from "vuex";
import api from "./api";



let userStorage =  localStorage.getItem('user');
if (!userStorage) {
    userStorage = {
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
else{
    userStorage = JSON.parse( userStorage);
}
export default createStore({
    state:{
        status : '',
        user : userStorage,
        cookies:[],
        theme:'light',
        novels:[],
        page:1,
        currentNovel:{}
    },
    getters: {
        getCookie (state) {
          return state.cookies;
        },
        getUser (state) {
            return state.user;
        }
    },
    mutations:{
        setPage : function (state,page){
            state.page = page;
        },
        setcurrentNovel : function (state,currentnovel){
            state.currentNovel = currentnovel;
        },
        setNovels : function (state,novels){
            state.novels = novels;
        },
        setStatus : function (state,status){
            state.status = status;
        },
        setCookies : function (state,cookies) {
            state.cookies = cookies;
        },
        logUser : function (state,user){
            state.user = user;
            localStorage.setItem("user",JSON.stringify (user))
        },
        logOut : function (state){
            state.user = {
                "id":-1,
                "lastName":"",
                "firstName":"",
                "email":"",
                "username":"",
                "isEmailConfirmed":false,
                "password":"",
                "phone":"",
                "role":""
            } ;
            localStorage.removeItem('user');
        },
        switchTheme:function (state) {
			
			if(state.theme ==='light'){
				state.theme = 'dark';
			}
			else if(state.theme ==='dark'){
				state.theme = 'light';
			}
			else{
				state.theme = 'light';
			}
			
        },
        updateNovels:function(state,novels){
            state.novels = novels;
        }
    },
    actions:{
        signIn : async ({commit},userInfos)=>{
            commit('setStatus','loading');
            try {   
  
                let response = await api.post('auth/login',userInfos);
                if (response.status == 200) {
                    
                    commit('setStatus','Success Login')
                    commit('logUser',response.data);
                }
                else{
                    commit('setStatus','Failure')
                }
            } catch (error) {
              console.error(error);
            }            
        },
        signUp : async ({commit},userInfos)=>{
            commit('setStatus','loading');
            try {
                const response = await api.post('auth/register',userInfos);
                if (response.status == 201) {
                    commit('setStatus','Success Register');       
                }
                else {
                    commit('setStatus','Failure');
                }
              
            } catch (error) {
                console.error(error);
            }

        },
        updateUserCookie : async( {commit,getters})=>{
            commit;
            if(getters.getCookie!=[]){
                try {   
  
                    let response = await api.post('auth/infos');
                    if (response.status == 200) {
                        commit('logUser',response.data);
                    }
                    else{
                        commit('setStatus','Failure')
                    }
                } catch (error) {
                console.error(error);
                }  
            }
              
        },
        getNovelsLatest : async ({commit,state})=>{
           
            try {
                const response = await api.get(`novelfull/latest-novel?page=${state.page}`);
                if (response.status == 200) {
                    commit('setStatus','Success Get Novels Latest');
                    commit('updateNovels',response.data);

                }
                else {
                    commit('setStatus','Failure');
                }
              
            } catch (error) {
                console.error(error);
            }
        },
        updateCurrentPage : async ({commit,state})=>{
           
            try {
                const response = await api.get(`novelfull/latest-novel?page=${state.page}`);
                if (response.status == 200) {
                    commit('setStatus','Success Get Novels Latest');
                    commit('updateNovels',response.data);

                }
                else {
                    commit('setStatus','Failure');
                }
              
            } catch (error) {
                console.error(error);
            }
        }
    }
})