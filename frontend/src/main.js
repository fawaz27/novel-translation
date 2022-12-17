import { createApp } from 'vue'
import {createRouter,createWebHistory} from 'vue-router'

import App from './App.vue'
import routes from './routes'
import store from './store'
import FontAwesomeIcon from './utils/fontawesone'


const router = createRouter({ 
    history: createWebHistory(),
    routes,
})    

createApp(App)
    .component("FontAwesomeIcon", FontAwesomeIcon)
    .use(router)
    .use(store)
    .mount('#app')
