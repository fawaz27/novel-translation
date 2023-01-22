import Home from './views/Home.vue'
import About from './views/About.vue'
import Contact from './views/Contact.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Novel from './views/Novel.vue'
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
        path:'/novels/:id',
        name:'novel',
        component:Novel,
        exact: true
    }
]


const router = createRouter({ 
    history: createWebHistory(),
    routes,
}) ;

export default router;