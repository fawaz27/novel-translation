import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import store from './store'
import FontAwesomeIcon from './utils/fontawesone'   

createApp(App)
    .component("FontAwesomeIcon", FontAwesomeIcon)
    .use(router)
    .use(store)
    .mount('#app')
