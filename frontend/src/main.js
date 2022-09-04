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
// insert into agenda.authorizations (idsrc, idsink, authorize) values ($1, $2, jsonb_build_object('type', jsonb_build_array($3::jsonb)) on conflict on constraint authorizations_pk do update set authorize = jsonb_insert((select authorize from agenda.authorizations where idsink=excluded.idsink and idsrc=excluded.idsrc),'{type, -1}', excluded.authorize);

createApp(App)
    .component("FontAwesomeIcon", FontAwesomeIcon)
    .use(router)
    .use(store)
    .mount('#app')
