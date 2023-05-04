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
        statusCompleted : '',
        statusPopular : '',
        user : userStorage,
        cookies:[],
        Theme:'light',
        novels:[],
        novelsPopular:[],
        novelsCompleted:[],
        page:1,
        sourceName:'novelfull',
        currentNovel:{
            'description':''
        },
        chaptersCurrentNovel:[],
        chapters_one:[],
        chapters_two:[],
        last_page:10,
        last_pageLatest:1,
        last_pageCompleted:1,
        last_pagePopular:1,
        pageLatest:1,
        pagePopular:1,
        pageCompleted:1,
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
        getNovelsCompleted(state){
            return state.novelsCompleted;
        },
        getNovelsPopular(state){
            return state.novelsPopular;
        },
        getCurrentNovel(state){
            return state.currentNovel;
        },
        getChaptersCurrentNovel(state){
            return state.chaptersCurrentNovel;
        }
    },
    mutations:{
        setLastPagePopular : function (state,page){
            state.last_pagePopular = page;
        },
        setLastPageCompleted : function (state,page){
            state.last_pageCompleted = page;
        },
        
        setLastPageLatest : function (state,page){
            state.last_pageLatest = page;
        },
        setLastPage : function (state,page){
            state.last_page = page;
        },
        setPage : function (state,page){
            state.page = page;
        },
        setPageLatest : function (state,page){
            state.pageLatest = page;
        },
        setPageCompleted : function (state,page){
            state.pageCompleted = page;
        },
        setPagePopular : function (state,page){
            state.pagePopular = page;
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
            if(state.contentChapterCurrent.nextUrl){
                state.contentChapterCurrent.name_next_chap = state.contentChapterCurrent.nextUrl.replace(/^\/+|\.html$/g, '').split('/').pop();
            }
            if(state.contentChapterCurrent.prevUrl){
                state.contentChapterCurrent.name_prev_chap = state.contentChapterCurrent.prevUrl.replace(/^\/+|\.html$/g, '').split('/').pop();
            }
            
            
        },
        setNovels : function (state,novels){
            state.novels = novels;
        },
        setNovelsCompleted : function (state,novels){
            state.novelsCompleted = novels;
        },
        setNovelsPopular : function (state,novels){
            state.novelsPopular = novels;
        },
        setStatus : function (state,status){
            state.status = status;
        },
        setStatusCompleted : function (state,status){
            state.statusCompleted = status;
        },
        setStatusPopular : function (state,status){
            state.statusPopular = status;
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
			
			if(state.Theme ==='light'){
				state.Theme = 'dark';
			}
			else if(state.Theme ==='dark'){
				state.Theme = 'light';
			}
			else{
				state.Theme = 'light';
			}
			
        },
        updateNovels:function(state,novels){
            state.novels = novels;
            state.novels.forEach((it)=>{
               it.title = it.url.slice(1, -5).replace(/.html/g,'');
            });
        }
        ,
        updateNovelsCompleted:function(state,novels){
            state.novelsCompleted = novels;
            state.novelsCompleted.forEach((it)=>{
               it.title = it.url.slice(1, -5).replace(/.html/g,'');
            });
        }
        ,
        updateNovelsPopular:function(state,novels){
            state.novelsPopular= novels;
            state.novelsPopular.forEach((it)=>{
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
                commit('setStatus','Failure')
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
                commit('setStatus','Failure')
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
                    commit('setStatus','Failure')
                }  
            }
              
        },
        getNovelsLatest : async ({commit,state},page)=>{
           
            try {
                const response = await api.get(`novels/${state.sourceName}/novel-list/latest?page=${page}`);
                if (response.status == 200) {
                    commit('setStatus','Success Get Novels Latest');
                    commit('updateNovels',response.data.novels);
                    commit('setLastPageLatest',response.data.last_page);

                }
                else {
                    commit('setStatus','Failure');
                }
              
            } catch (error) {
                console.error(error);
                commit('setStatus','Failure')
            }
        },
        getNovelsCompleted : async ({commit,state})=>{
           
            try {
                const response = await api.get(`novels/${state.sourceName}/novel-list/completed?page=${state.page}`);
                if (response.status == 200) {
                    commit('setStatusCompleted','Success Get Novels Completed');
                    commit('updateNovelsCompleted',response.data.novels);
                    commit('setLastPageCompleted',response.data.last_page);
                }
                else {
                    commit('setStatusCompleted','Failure');
                }
              
            } catch (error) {
                console.error(error);
                commit('setStatus','Failure')
            }
        },
        getNovelsPopular : async ({commit,state})=>{
           
            try {
                const response = await api.get(`novels/${state.sourceName}/novel-list/popular?page=${state.page}`);
                if (response.status == 200) {
                    commit('setStatusPopular','Success Get Novels Popular');
                    commit('updateNovelsPopular',response.data.novels);
                    commit('setLastPagePopular',response.data.last_page);
                }
                else {
                    commit('setStatusPopular','Failure');
                }
              
            } catch (error) {
                console.error(error);
                commit('setStatus','Failure')
            }
        },
        getNovelsList : async ({commit,state},params)=>{
           
            try {
                const response = await api.get(`novels/${state.sourceName}/novel-list/${params.listName}?page=${params.page}`);
                if (response.status == 200) {
                    commit('setStatusPopular','Success Get Novels List');
                    commit('updateNovels',response.data.novels);
                    commit('setLastPage',response.data.last_page);
                }
                else {
                    commit('setStatus','Failure');
                }
              
            } catch (error) {
                console.error(error);
                commit('setStatus','Failure')
            }
        },
        getNovelsGenre : async ({commit,state},params)=>{
           
            try {
                const response = await api.get(`novels/${state.sourceName}/genre-list?genre=${params.genreName}&page=${params.page}`);
                if (response.status == 200) {
                    commit('setStatusPopular','Success Get Novels Genre');
                    commit('updateNovels',response.data.novels);
                    commit('setLastPage',response.data.last_page);
                }
                else {
                    commit('setStatus','Failure');
                }
              
            } catch (error) {
                console.error(error);
                commit('setStatus','Failure')
            }
        },
        getNovel : async ({commit,state},params)=>{
           
            try {
                const response = await api.get(`novels/${state.sourceName}/novel?page=${params.page}&url=${params.title}.html`);
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
                commit('setStatus','Failure')
            }
        },
        getListChapterNovel : async ({commit,state},params)=>{
           
            try {
                const response = await api.get(`${state.sourceName}/novel-list-chapter?link=${params.name}.html&page=${params.page}`);
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
                commit('setStatus','Failure')
            }
        },
        getChapterContent : async ({commit,state},params)=>{
           
            try {
                const response = await api.get(`novels/${state.sourceName}/chapter?url=/${params.name}/${params.chapter}.html`);
                if (response.status == 200) {
                    commit('setStatus','Success Get Chapter Content');
                    commit('setcontentChapter',response.data);
                }   
                else {
                    commit('setStatus','Failure');
                }
            } catch (error) {
                console.error(error);
                commit('setStatus','Failure')
            }
        },
        updateCurrentPage : async ({commit,state})=>{
           
            try {
                const response = await api.get(`novels/${state.sourceName}?page=${state.page}`);
                if (response.status == 200) {
                    commit('setStatus','Success Get Novels Latest');
                    commit('updateNovels',response.data);

                }
                else {
                    commit('setStatus','Failure');
                }
              
            } catch (error) {
                console.error(error);
                commit('setStatus','Failure')
            }
        },
        nextChapter : async ({commit,state})=>{
            try {
                const response = await api.get(`${state.sourceName}/novel-chapter-content?link=${state.contentChapterCurrent.next_chap}`);
                if (response.status == 200) {
                    commit('setStatus','Success Get Next Chapter Content');
                    commit('setcontentChapter',response.data);
                }
                else {
                    commit('setStatus','Failure');
                }
              
            } catch (error) {
                console.error(error);
                commit('setStatus','Failure')
            }
        }
    }
})