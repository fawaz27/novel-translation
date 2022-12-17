import Home from './views/Home.vue'
import Bookmarks from './views/Bookmarks.vue'
import About from './views/About.vue'
import Profile from './views/Profile.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import Forgot from './views/ForgotPassword.vue'
export default [
    {
        path:'/',
        name:'home',
        component:Home
    },
    {
        path:'/bookmarks',
        name:'Bookmarks',
        component:Bookmarks

    },
    {
        path:'/about',
        name:'about',
        component:About

    },
    {
        path:'/profile',
        name:'profile',
        component:Profile

    },
    {
        path:'/register',
        name:'register',
        component:Register
    },
    {
        path:'/login',
        name:'login',
        component:Login
    },
    {
        path:'/forgot-password',
        name:'forgot',
        component:Forgot
    }
]