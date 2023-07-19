import './index.css'
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueTailwindDatepicker from 'vue-tailwind-datepicker'
import './assets/tailwind.css'
import 'animate.css'
import Tracker from './util/tracker'

const app = createApp(App)

app.use(Tracker, {
    APP_ID: import.meta.env.VITE_DIGITANALYTICS_APP_ID
})

app.use(router)
app.use(VueTailwindDatepicker)

app.mount('#app')
