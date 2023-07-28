import './index.css'
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueTailwindDatepicker from 'vue-tailwind-datepicker'
import './assets/tailwind.css'
import 'animate.css'
import Tracker from './util/tracker'
import store from './store/index'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(VueTailwindDatepicker)

app.mount('#app')
