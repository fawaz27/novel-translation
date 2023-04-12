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
        currentNovel:{
            'description':''
        },
        chaptersCurrentNovel:[],
        chapters_one:[],
        chapters_two:[],
        last_page:0,
        contentChapterCurrent:{}
    },
    getters: {
        getCookie (state) {
            return state.cookies;
        },
        getUser (state) {
            return state.user;
        },
        getNovels(state){
            return state.novels;
        },
        getCurrentNovel(state){
            return state.currentNovel;
        },
        getChaptersCurrentNovel(state){
            return state.chaptersCurrentNovel;
        }
    },
    mutations:{
        setPage : function (state,page){
            state.page = page;
        },
        setchapterscurrentNovel : function (state,chaptersCurrentNovel){
            state.chaptersCurrentNovel = chaptersCurrentNovel;
            state.chaptersCurrentNovel.forEach((it)=>{
                let parts = it.url.split('/');
                let result = parts[parts.length - 1];
                it.title = result.replace(/.html/g,'');
             });
            state.chapters_one = state.chaptersCurrentNovel.slice(0, 25);
            state.chapters_two = state.chaptersCurrentNovel.slice(25);
        },
        setcurrentNovel : function (state,currentnovel){
            state.currentNovel = currentnovel;
            
        },
        setLastPagecurrentNovel : function (state,last_page){
            state.last_page = last_page;
        },
        setcontentChapter : function (state,contentChapter){
            state.contentChapterCurrent = contentChapter;
            if(state.contentChapterCurrent.next_chap){
                let parts = state.contentChapterCurrent.next_chap.split('/');
                let result = parts[parts.length - 1];
                state.contentChapterCurrent.name_next_chap = result.replace(/.html/g,'');
            }
            if(state.contentChapterCurrent.prev_chap){
                let parts = state.contentChapterCurrent.prev_chap.split('/');
                let result = parts[parts.length - 1];
                state.contentChapterCurrent.name_prev_chap = result.replace(/.html/g,'');
            }
            
            console.log(state.contentChapterCurrent.name_next_chap);
            
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
            state.novels.forEach((it)=>{
               it.title = it.url.slice(1, -5).replace(/.html/g,'');
            });
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
                const response = await api.get(`novels/novelfull?page=${state.page}`);
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
        getNovel : async ({commit},params)=>{
           
            try {
                const response = await api.get(`novels/novelfull/novel?page=${params.page}&url=${params.title}.html`);
                if (response.status == 200) {
                    commit('setStatus','Success Get Novel');
                    commit('setcurrentNovel',response.data);
                    commit('setchapterscurrentNovel',response.data.chapters);
                    commit('setLastPagecurrentNovel',response.data.last_page);
                }
                else {
                    commit('setStatus','Failure');
                }
              
            } catch (error) {
                console.error(error);
            }
        },
        getListChapterNovel : async ({commit},params)=>{
           
            try {
                const response = await api.get(`novelfull/novel-list-chapter?link=${params.name}.html&page=${params.page}`);
                if (response.status == 200) {
                    commit('setStatus','Success Get List Chapter Novel');
                    console.log(response.data.chapters);
                    commit('setchapterscurrentNovel',response.data.chapters);
                    commit('setLastPagecurrentNovel',response.data.last_page);
                }
                else {
                    commit('setStatus','Failure');
                }
              
            } catch (error) {
                console.error(error);
            }
        },
        getChapterContent : async ({commit},params)=>{
           
            try {
                const response = await api.get(`novels/novelfull/chapter?url=/${params.name}/${params.chapter}.html`);
                if (response.status == 200) {
                    commit('setStatus','Success Get Chapter Content');
                    commit('setcontentChapter',response.data);
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
                const response = await api.get(`novels/novelfull?page=${state.page}`);
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
        nextChapter : async ({commit,state})=>{
            try {
                const response = await api.get(`novelfull/novel-chapter-content?link=${state.contentChapterCurrent.next_chap}`);
                if (response.status == 200) {
                    commit('setStatus','Success Get Next Chapter Content');
                    commit('setcontentChapter',response.data);
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