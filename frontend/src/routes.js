import Home from './views/Home.vue'
import Bookmarks from './views/Bookmarks.vue'
import Mylibrary from './views/Mylibrary.vue'
import About from './views/About.vue'
import Profile from './views/Profile.vue'

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
        path:'/mylibrary',
        name:'mylibrary',
        component:Mylibrary

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

    }
]