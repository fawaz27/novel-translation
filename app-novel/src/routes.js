import Home from './views/Home.vue'
import About from './views/About.vue'
import Login from './views/Login.vue'
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
        path:'/login',
        name:'login',
        component:Login,
        exact: true
    }
]


const router = createRouter({ 
    history: createWebHistory(),
    routes,
}) ;

export default router;