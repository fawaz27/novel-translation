import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './routes'
import { loadFonts } from './plugins/webfontloader'
import store from './store'
import  VueCookies  from 'vue-cookies'
loadFonts()

createApp(App)
  .use(vuetify)
  .use(router)
  .use(VueCookies)
  .use(store)
  .mount('#app')
