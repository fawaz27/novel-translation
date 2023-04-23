import Home from './views/Home.vue'
import About from './views/About.vue'
import Contact from './views/Contact.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Novel from './views/Novel.vue'
import Chapter from './views/Chapter.vue'
import NovelsList from './views/NovelsList.vue'
import GenreNovelsList from './views/GenreNovelsList.vue'
import SearchNovelsList from './views/SearchNovelsList.vue'
import {createRouter,createWebHistory} from 'vue-router'
const routes = [
    {
        path:'/',
        name:'home',
        component:Home, 
        exact: true
    },
    {
        path:'/about',
        name:'about',
        component:About, 
        exact: true

    },
    {
        path:'/contact',
        name:'contact',
        component:Contact, 
        exact: true

    },
    {
        path:'/login',
        name:'login',
        component:Login,
        exact: true
    },
    {
        path:'/register',
        name:'register',
        component:Register,
        exact: true
    },
    {
        path:'/novels/:name',
        name:'novel',
        component:Novel,
        
    },
    {
        path:'/novels/:name/:chapter',
        name:'chapter',
        component:Chapter,
        exact: true
    },
    {
        path:'/genres/:genre_name/:number_page?',
        name:'genreNovelsList',
        component:GenreNovelsList,
        exact: true
    },
    {
        path:'/novel-list/:list_name/:number_page?',
        name:'novelsList',
        component:NovelsList,
        exact: true
    },
    {
        path:'/search/:number_page?',
        name:'searchNovelsList',
        component:SearchNovelsList,
        exact: true
    }
]


const router = createRouter({ 
    history: createWebHistory(),
    routes,
}) ;

export default router;